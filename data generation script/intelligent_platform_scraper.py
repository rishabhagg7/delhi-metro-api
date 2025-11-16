#!/usr/bin/env python3
"""
Intelligent Platform Data Scraper for Delhi Metro
Extracts platform layout information from Wikipedia pages and maps destinations to station IDs
Uses multiple strategies:
1. Station layout tables (primary)
2. Infobox tables (fallback)
3. LLM-assisted name matching for destination mapping
"""

import json
import os
import re
import requests
import time
from bs4 import BeautifulSoup
from typing import Dict, List, Optional, Tuple
from difflib import SequenceMatcher


class IntelligentPlatformScraper:
    def __init__(self, groq_api_key: Optional[str] = None):
        self.groq_api_key = groq_api_key or os.getenv('GROQ_API_KEY')
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Load station data for mapping
        self.stations_by_id = {}
        self.stations_by_name = {}
        self.load_station_data()
        
        # Results tracking
        self.success_log = []
        self.failure_log = []
        self.partial_log = []
        self.missing_data_log = []  # Track missing terminal/next_station data
        
    def load_station_data(self):
        """Load station data and create lookup dictionaries."""
        with open('delhi_metro_stations.json', 'r', encoding='utf-8') as f:
            stations = json.load(f)
        
        for station in stations:
            station_id = station['id']
            station_name = station['name']
            
            self.stations_by_id[station_id] = station
            
            # Create multiple name variations for fuzzy matching
            name_variations = [
                station_name.lower(),
                station_name.lower().replace('-', ' '),
                station_name.lower().replace('_', ' '),
                station_id.lower().replace('_', ' '),
            ]
            
            for variant in name_variations:
                if variant not in self.stations_by_name:
                    self.stations_by_name[variant] = []
                self.stations_by_name[variant].append(station_id)
        
        print(f"✅ Loaded {len(self.stations_by_id)} stations for mapping")
    
    def similarity(self, a: str, b: str) -> float:
        """Calculate string similarity ratio."""
        return SequenceMatcher(None, a.lower(), b.lower()).ratio()
    
    def find_station_id(self, destination_name: str, current_station_id: str = None) -> Optional[str]:
        """
        Intelligently map destination name to station ID.
        Uses fuzzy matching and context-aware logic.
        """
        if not destination_name:
            return None
        
        # Clean the destination name
        clean_name = destination_name.lower().strip()
        clean_name = re.sub(r'\(.*?\)', '', clean_name)  # Remove parentheses
        clean_name = re.sub(r'\s+', ' ', clean_name).strip()
        
        # Handle special cases - renamed stations
        # "Millennium City Centre Gurugram" is the new name for "Huda City Centre"
        if 'millennium city centre' in clean_name or 'millennium city center' in clean_name:
            clean_name = re.sub(r'millennium city cent(re|er)', 'huda city centre', clean_name)
            clean_name = re.sub(r'\s+(gurugram|gurgaon)$', '', clean_name).strip()
        
        # Handle special cases
        terminal_keywords = ['terminal', 'depot', 'yard']
        if any(kw in clean_name for kw in terminal_keywords):
            # Look for stations with similar names
            for station_id, station in self.stations_by_id.items():
                if any(kw in station['name'].lower() for kw in terminal_keywords):
                    if self.similarity(clean_name, station['name']) > 0.6:
                        return station_id
        
        # Direct lookup with variations
        lookup_variants = [
            clean_name,
            clean_name.replace(' ', '_'),
            clean_name.replace('-', ' '),
            clean_name.replace('metro station', '').strip(),
            clean_name.replace('station', '').strip(),
            # Also try removing city names at the end
            re.sub(r'\s+(delhi|gurugram|gurgaon|noida|faridabad)$', '', clean_name).strip(),
        ]
        
        for variant in lookup_variants:
            if variant in self.stations_by_name:
                matches = self.stations_by_name[variant]
                if len(matches) == 1:
                    return matches[0]
                # If multiple matches, prefer the one on the same line as current station
                if current_station_id and current_station_id in self.stations_by_id:
                    current_lines = [line['name'] for line in self.stations_by_id[current_station_id].get('lines', [])]
                    for match_id in matches:
                        match_lines = [line['name'] for line in self.stations_by_id[match_id].get('lines', [])]
                        if any(line in match_lines for line in current_lines):
                            return match_id
                return matches[0]
        
        # Fuzzy matching - find best match
        best_match = None
        best_score = 0.6  # Lowered threshold from 0.7 to handle variations
        
        for station_id, station in self.stations_by_id.items():
            station_name = station['name'].lower()
            # Also try station name WITHOUT parentheses for better matching
            station_name_clean = re.sub(r'\(.*?\)', '', station_name).strip()
            
            # Calculate similarity with both versions
            score = self.similarity(clean_name, station_name)
            score_clean = self.similarity(clean_name, station_name_clean)
            score = max(score, score_clean)
            
            # Also check against ID
            id_score = self.similarity(clean_name, station_id.replace('_', ' '))
            score = max(score, id_score)
            
            if score > best_score:
                best_score = score
                best_match = station_id
        
        return best_match
    
    def extract_platform_from_layout_table(self, soup: BeautifulSoup, station_id: str) -> Optional[Dict]:
        """
        Extract platform data from 'Station layout' tables.
        Extracts: platform number, terminal destination, next station, direction
        Returns: {platform_number: {terminal: id, next_station: id, bound: direction}}
        """
        platforms = {}
        
        # Find "Station layout" or "Platform layout" section
        layout_headers = soup.find_all(['h2', 'h3'], string=lambda x: x and 'layout' in x.lower())
        
        if not layout_headers:
            return None
        
        for header in layout_headers:
            # Find ALL tables after this header until the next major header
            # Many interchange stations have multiple tables (one per line)
            current_element = header.find_next()
            tables_to_process = []
            
            while current_element:
                # Stop if we hit another major header (h2, h3)
                if current_element.name in ['h2', 'h3']:
                    break
                if current_element.name == 'table':
                    tables_to_process.append(current_element)
                current_element = current_element.find_next()
            
            if not tables_to_process:
                continue
            
            # Process each table
            for table in tables_to_process:
                rows = table.find_all('tr')
                if len(rows) < 2:  # Need at least 2 rows
                    continue
                
                # Parse all rows looking for platform info
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    if not cells:
                        continue
                    
                    # Look for the platform cell and its destination cell
                    for cell_idx, cell in enumerate(cells):
                        cell_text = cell.get_text(strip=True)
                        
                        # Pattern: "Platform 3Eastbound", "Platform 1 Westbound", "Platform 1South East bound"
                        # Also handles circular routes: "Platform 3 Anticlockwise", "Platform 4 Clockwise"
                        # Note: Sometimes there's no space between number and direction (e.g., "1South")
                        # Also handles multiple direction words (e.g., "South East", "North West")
                        platform_match = re.search(
                            r'Platform\s*(\d+)\s*(?:(Clockwise|Anticlockwise)|((?:(?:North|South|East|West)\s*)+)bound)',
                            cell_text, re.I
                        )
                        if not platform_match:
                            continue
                        
                        platform_num = platform_match.group(1)
                        # Group 2: Clockwise/Anticlockwise (circular routes)
                        # Group 3: North/South/East/West (linear routes with "bound")
                        circular_dir = platform_match.group(2)
                        linear_dir = platform_match.group(3)
                        
                        if circular_dir:
                            direction = circular_dir.lower()  # "clockwise" or "anticlockwise"
                        elif linear_dir:
                            # Normalize direction: "South East" → "south_east"
                            direction = linear_dir.strip().lower().replace(' ', '_')
                        else:
                            direction = 'Unknown'
                        
                        terminal_id = None
                        next_station_id = None
                        
                        # Extract from other cells in this row
                        for other_idx, other_cell in enumerate(cells):
                            if other_idx == cell_idx:  # Skip the platform cell itself
                                continue
                            
                            other_text = other_cell.get_text(strip=True)
                            links = other_cell.find_all('a', href=re.compile(r'/wiki/'))
                            
                            # Extract TERMINAL (from "Towards →...")
                            if 'towards' in other_text.lower() and ('→' in other_text or '←' in other_text):
                                # The first link after "Towards →" is always the terminal station
                                # Text format: "Towards →Terminal StationNext Station:Next" (often concatenated)
                                if links:
                                    terminal_name = links[0].get_text(strip=True)
                                    terminal_id = self.find_station_id(terminal_name, station_id)
                            
                            # Extract NEXT STATION (from "Next Station:...")
                            if 'next station' in other_text.lower():
                                # Pattern: "Next Station:Jhilmil" or "Next Station:Shaheed Nagar"
                                next_match = re.search(r'Next\s+Station\s*[:\s]+([^\n(]+)', other_text, re.I)
                                if next_match:
                                    # Find the link that appears AFTER "Next Station"
                                    next_station_pos = other_text.lower().find('next station')
                                    for link in links:
                                        link_text = link.get_text(strip=True)
                                        link_pos = other_text.lower().find(link_text.lower())
                                        if link_pos > next_station_pos:
                                            next_station_id = self.find_station_id(link_text, station_id)
                                            break
                                    
                                    # Fallback: use regex text
                                    if not next_station_id:
                                        next_name = next_match.group(1).strip()
                                        next_name = re.sub(r'\([^)]+\)', '', next_name).strip()
                                        next_station_id = self.find_station_id(next_name, station_id)
                        
                        # Store platform data (even if terminal/next is None - we'll log it)
                        if platform_num not in platforms:
                            platforms[platform_num] = {
                                'terminal': terminal_id,
                                'next_station': next_station_id,
                                'bound': direction.lower() if direction != 'Unknown' else None
                            }
        
        return platforms if platforms else None
    
    def extract_platform_from_infobox(self, soup: BeautifulSoup, station_id: str) -> Optional[Dict]:
        """
        Fallback: Extract platform info from infobox table.
        Look for 'infobox vcard ib-station' class - contains platform count and line info.
        This gives us basic info but not detailed platform layout.
        """
        platforms = {}
        
        # Find infobox - it has multiple classes: ['infobox', 'vcard', 'ib-station']
        infobox = soup.find('table', class_=lambda x: x and 'infobox' in x and 'ib-station' in x)
        if not infobox:
            # Try more general search
            infobox = soup.find('table', class_=lambda x: x and 'infobox' in x)
        
        if not infobox:
            return None
        
        # Look for platform-related rows
        rows = infobox.find_all('tr')
        platform_count = None
        lines_info = []
        
        for row in rows:
            header = row.find('th')
            value = row.find('td')
            
            if not header or not value:
                continue
            
            header_text = header.get_text(strip=True).lower()
            value_text = value.get_text(strip=True)
            
            # Extract platform count
            if 'platform' in header_text:
                count_match = re.search(r'(\d+)', value_text)
                if count_match:
                    platform_count = int(count_match.group(1))
            
            # Extract line information (helps identify terminals)
            if 'line' in header_text:
                # Get linked lines
                line_links = value.find_all('a')
                for link in line_links:
                    lines_info.append(link.get_text(strip=True))
        
        # If we found platform count, create basic structure
        if platform_count:
            for i in range(1, platform_count + 1):
                platforms[str(i)] = {
                    'terminal': None,  # Unknown from infobox
                    'next_station': None,  # Unknown from infobox
                    'bound': None,
                    'source': 'infobox_fallback',
                    'lines': lines_info
                }
        
        return platforms if platforms else None
    
    def scrape_station_platform(self, station_id: str, wiki_url: str) -> Dict:
        """
        Main scraping function for a single station.
        Returns platform data with metadata about extraction method.
        """
        result = {
            "station_id": station_id,
            "url": wiki_url,
            "platforms": None,
            "extraction_method": None,
            "status": "failed",
            "error": None
        }
        
        try:
            response = self.session.get(wiki_url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Strategy 1: Try layout table (preferred)
            platforms = self.extract_platform_from_layout_table(soup, station_id)
            if platforms:
                result["platforms"] = platforms
                result["extraction_method"] = "layout_table"
                result["status"] = "success"
                self.success_log.append(result)
                return result
            
            # Strategy 2: Try infobox (fallback)
            platforms = self.extract_platform_from_infobox(soup, station_id)
            if platforms:
                result["platforms"] = platforms
                result["extraction_method"] = "infobox_fallback"
                result["status"] = "partial"
                self.partial_log.append(result)
                return result
            
            # No platform data found
            result["status"] = "no_data"
            result["error"] = "No platform layout or infobox data found"
            self.failure_log.append(result)
            
        except Exception as e:
            result["status"] = "error"
            result["error"] = str(e)
            self.failure_log.append(result)
        
        return result
    
    def process_all_stations(self, urls_file: str, output_file: str, log_file: str):
        """Process all stations and generate platform data."""
        
        print("🚀 Starting Intelligent Platform Scraper")
        print("=" * 70)
        
        # Load Wikipedia URLs
        with open(urls_file, 'r') as f:
            urls = json.load(f)
        
        all_results = []
        total = len([url for url in urls.values() if url])
        processed = 0
        
        print(f"\n📊 Processing {total} stations with Wikipedia URLs\n")
        
        for station_id, wiki_url in urls.items():
            if not wiki_url:
                continue
            
            processed += 1
            station_name = self.stations_by_id.get(station_id, {}).get('name', station_id)
            
            print(f"[{processed}/{total}] 🔍 {station_name} ({station_id})")
            
            result = self.scrape_station_platform(station_id, wiki_url)
            all_results.append(result)
            
            # Track missing data
            if result['platforms']:
                for platform_num, platform_data in result['platforms'].items():
                    if platform_data.get('terminal') is None:
                        self.missing_data_log.append({
                            'station_id': station_id,
                            'station_name': station_name,
                            'platform': platform_num,
                            'missing': 'terminal',
                            'bound': platform_data.get('bound')
                        })
                    if platform_data.get('next_station') is None:
                        self.missing_data_log.append({
                            'station_id': station_id,
                            'station_name': station_name,
                            'platform': platform_num,
                            'missing': 'next_station',
                            'bound': platform_data.get('bound')
                        })
            
            # Show status
            if result['status'] == 'success':
                platform_count = len(result['platforms'])
                print(f"    ✅ SUCCESS: {platform_count} platforms extracted via {result['extraction_method']}")
            elif result['status'] == 'partial':
                print(f"    ⚠️  PARTIAL: Data from {result['extraction_method']}")
            else:
                print(f"    ❌ FAILED: {result['error']}")
            
            # Progress checkpoint every 20 stations
            if processed % 20 == 0:
                self.save_results(all_results, output_file, log_file)
                print(f"\n  💾 Progress saved: {len(self.success_log)} success, {len(self.partial_log)} partial, {len(self.failure_log)} failed\n")
            
            # Rate limiting
            time.sleep(0.5)
        
        # Final save
        self.save_results(all_results, output_file, log_file)
        
        # Print summary
        print("\n" + "=" * 70)
        print("✨ SCRAPING COMPLETE!")
        print("=" * 70)
        print(f"📊 Results:")
        print(f"   • Total processed: {processed}")
        print(f"   • ✅ Full success: {len(self.success_log)} ({len(self.success_log)/processed*100:.1f}%)")
        print(f"   • ⚠️  Partial data: {len(self.partial_log)} ({len(self.partial_log)/processed*100:.1f}%)")
        print(f"   • ❌ Failed/No data: {len(self.failure_log)} ({len(self.failure_log)/processed*100:.1f}%)")
        print(f"\n📁 Files saved:")
        print(f"   • Platform data: {output_file}")
        print(f"   • Detailed log: {log_file}")
        print("=" * 70)
    
    def save_results(self, all_results: List[Dict], output_file: str, log_file: str):
        """Save results and logs to files."""
        
        # Create platform data in final format
        platform_data = {}
        for result in all_results:
            if result['platforms']:
                platform_data[result['station_id']] = result['platforms']
        
        # Save platform data
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(platform_data, f, indent=2, ensure_ascii=False)
        
        # Save detailed log
        log = {
            "summary": {
                "total_processed": len(all_results),
                "success": len(self.success_log),
                "partial": len(self.partial_log),
                "failed": len(self.failure_log),
                "missing_terminal_count": len([m for m in self.missing_data_log if m['missing'] == 'terminal']),
                "missing_next_station_count": len([m for m in self.missing_data_log if m['missing'] == 'next_station'])
            },
            "success": self.success_log,
            "partial": self.partial_log,
            "failed": self.failure_log,
            "missing_data": self.missing_data_log
        }
        
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(log, f, indent=2, ensure_ascii=False)


def main():
    """Main execution function."""
    
    # Check for Groq API key (optional, for future LLM enhancements)
    groq_key = os.getenv('GROQ_API_KEY')
    
    scraper = IntelligentPlatformScraper(groq_api_key=groq_key)
    
    # Process all stations
    scraper.process_all_stations(
        urls_file='station_wikipedia_urls.json',
        output_file='platform_data.json',
        log_file='platform_extraction_log.json'
    )


if __name__ == '__main__':
    main()
