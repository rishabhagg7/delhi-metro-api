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
        
        # Remove "Jaypee Greens" prefix specifically (used in some station names on Wikipedia)
        clean_name = re.sub(r'\bjaypee\s+greens?\b', '', clean_name, flags=re.IGNORECASE)
        clean_name = re.sub(r'\s+', ' ', clean_name).strip()
        
        # Handle special cases - renamed stations
        # "Millennium City Centre Gurugram" is the new name for "Huda City Centre"
        if 'millennium city centre' in clean_name or 'millennium city center' in clean_name:
            clean_name = re.sub(r'millennium city cent(re|er)', 'huda city centre', clean_name)
            clean_name = re.sub(r'\s+(gurugram|gurgaon)$', '', clean_name).strip()
        
        # "Rainbow" is the new name for "Noida Sector 50"
        if 'rainbow' in clean_name and 'garden' not in clean_name:
            return 'noida_sector_50'
        
        # Handle special cases
        terminal_keywords = ['terminal', 'depot', 'yard']
        if any(kw in clean_name for kw in terminal_keywords):
            # Look for stations with similar names
            for station_id, station in self.stations_by_id.items():
                if any(kw in station['name'].lower() for kw in terminal_keywords):
                    if self.similarity(clean_name, station['name']) > 0.55:
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
        best_score = 0.6  # Default threshold - prevents false positives
        
        # Lower threshold for specific patterns we know are problematic
        if any(kw in clean_name for kw in ['depot', 'pari', 'chowk']):
            best_score = 0.55  # Allow slightly lower threshold for these cases
        
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
                            
                            # Extract NEXT STATION (from "Next Station:..." label or links after reference)
                            if 'next station' in other_text.lower() or 'next' in other_text.lower():
                                # Pattern 1 (HIGHEST PRIORITY): "Next Station:" with colon - explicit label
                                # Use case-insensitive search and look for the colon specifically
                                next_match = re.search(r'Next\s+Station\s*:', other_text, re.I)
                                if next_match:
                                    # Find the link that appears immediately AFTER "Next Station:"
                                    next_label_end_pos = next_match.end()
                                    for link in links:
                                        link_text = link.get_text(strip=True)
                                        link_pos = other_text.find(link_text)
                                        if link_pos >= next_label_end_pos:
                                            next_station_id = self.find_station_id(link_text, station_id)
                                            if next_station_id:  # Successfully mapped
                                                break
                                    
                                    # Fallback: extract text immediately after colon
                                    if not next_station_id:
                                        after_colon = other_text[next_label_end_pos:].strip()
                                        # Take text up to next newline or parenthesis
                                        next_name = re.split(r'[\n(]', after_colon)[0].strip()
                                        if next_name:
                                            next_station_id = self.find_station_id(next_name, station_id)
                                
                                # Pattern 2: "next station is XYZ" - common alternative format
                                # Only use if Pattern 1 didn't find anything
                                if not next_station_id:
                                    # Make the space after "is" optional to handle concatenated text
                                    next_is_match = re.search(r'next\s+station\s+is\s*', other_text, re.I)
                                    if next_is_match:
                                        # Find the link that appears immediately AFTER "next station is"
                                        next_is_end_pos = next_is_match.end()
                                        for link in links:
                                            link_text = link.get_text(strip=True)
                                            link_pos = other_text.find(link_text)
                                            if link_pos >= next_is_end_pos:
                                                next_station_id = self.find_station_id(link_text, station_id)
                                                if next_station_id:  # Successfully mapped
                                                    break
                                
                                # Pattern 3 (fallback): "Change at the next station for..." - infer from context
                                # Only use this if Pattern 1 and 2 didn't find anything
                                if not next_station_id and 'change at the next station' in other_text.lower():
                                    # Links appear in order: [Terminal, Line, OtherTerminal, NextStation]
                                    # We want the LAST station link that appears after "change at the next station"
                                    change_pos = other_text.lower().find('change at the next station')
                                    # Find "Towards" that comes AFTER "change at the next station"
                                    towards_matches = [(m.start(), m.group()) for m in re.finditer(r'Towards', other_text, re.I)]
                                    second_towards_pos = None
                                    for pos, _ in towards_matches:
                                        if pos > change_pos:
                                            second_towards_pos = pos
                                            break
                                    
                                    # Get the last station link (not line name) after "change" and before second "Towards"
                                    last_valid_link = None
                                    for link in links:
                                        link_text = link.get_text(strip=True)
                                        link_pos = other_text.find(link_text)
                                        if link_pos > change_pos:
                                            if second_towards_pos is None or link_pos < second_towards_pos:
                                                # Make sure it's not a line name (lines contain "Line" keyword)
                                                if 'line' not in link_text.lower():
                                                    last_valid_link = link_text
                                    
                                    if last_valid_link:
                                        next_station_id = self.find_station_id(last_valid_link, station_id)
                        
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
            
            # Strategy 2: Try intelligent infobox parsing (fallback)
            platforms = self.extract_platform_from_infobox_intelligent(soup, station_id)
            if platforms:
                result["platforms"] = platforms
                result["extraction_method"] = "infobox_intelligent"
                result["status"] = "success"  # Changed from partial since intelligent method extracts terminals
                self.success_log.append(result)
                return result
            
            # Strategy 3: Try basic infobox (last resort - just counts)
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
    
    def fix_penultimate_stations(self, platform_data: Dict) -> Dict:
        """
        Fix penultimate stations where next_station is null but should be the terminal.
        A penultimate station is the second-to-last station where the next station IS the terminal.
        """
        print("\n🔧 Fixing penultimate stations (next_station = terminal)...")
        
        # Load GTFS data to find station sequences
        try:
            # Load stops.txt
            stops_map = {}
            with open('stops.txt', 'r') as f:
                lines = f.readlines()
            for line in lines[1:]:
                parts = line.strip().split(',')
                if len(parts) >= 3:
                    stop_id = parts[0].strip()
                    stop_name = parts[2].strip()
                    stops_map[stop_id] = stop_name
            
            # Load stop_times.txt
            from collections import defaultdict
            trips = defaultdict(list)
            with open('stop_times.txt', 'r') as f:
                lines = f.readlines()
            for line in lines[1:]:
                parts = line.strip().split(',')
                if len(parts) >= 5:
                    trip_id = parts[0].strip()
                    stop_id = parts[3].strip()
                    stop_sequence = int(parts[4].strip()) if parts[4].strip().isdigit() else 0
                    trips[trip_id].append((stop_sequence, stop_id))
            
            # Sort trips
            for trip_id in trips:
                trips[trip_id].sort()
            
        except FileNotFoundError:
            print("  ⚠️  GTFS files not found, skipping penultimate fix")
            return platform_data
        
        # Process each platform
        fixed_count = 0
        for station_id, platforms in platform_data.items():
            station_name = self.stations_by_id.get(station_id, {}).get('name', station_id)
            
            for platform_num, platform_info in platforms.items():
                terminal = platform_info.get('terminal')
                next_station = platform_info.get('next_station')
                
                # Only fix if terminal exists but next_station is null
                if terminal and not next_station:
                    terminal_name = self.stations_by_id.get(terminal, {}).get('name', terminal)
                    
                    # Find if this is penultimate by checking route data
                    current_norm = station_name.lower().strip()
                    terminal_norm = terminal_name.lower().strip()
                    
                    is_penultimate = False
                    for trip_id, stops in trips.items():
                        stop_ids = [s[1] for s in stops]
                        stop_names = [stops_map.get(sid, '').lower().strip() for sid in stop_ids]
                        
                        # Find current and terminal in this trip
                        current_indices = [i for i, name in enumerate(stop_names) if current_norm in name or name in current_norm]
                        terminal_indices = [i for i, name in enumerate(stop_names) if terminal_norm in name or name in terminal_norm]
                        
                        if current_indices and terminal_indices:
                            current_idx = current_indices[0]
                            terminal_idx = terminal_indices[0]
                            
                            # Check if terminal is exactly 1 stop after current (same direction)
                            if terminal_idx == current_idx + 1:
                                # Penultimate! Set next_station = terminal
                                platform_info['next_station'] = terminal
                                is_penultimate = True
                                fixed_count += 1
                                break
        
        print(f"  ✅ Fixed {fixed_count} penultimate stations")
        return platform_data
    
    def infer_next_station_from_connections(self, platform_data: Dict) -> Dict:
        """
        Infer next_station from connections for platforms that have terminal but no next_station.
        Uses the connections in delhi_metro_stations.json to match terminal → next_station.
        """
        print("\n🔧 Inferring next_station from connections...")
        fixed_count = 0
        
        for station_id, platforms in platform_data.items():
            station = self.stations_by_id.get(station_id)
            if not station:
                continue
            
            connections = station.get('connections', [])
            if not connections:
                continue
            
            for platform_num, platform_info in platforms.items():
                terminal = platform_info.get('terminal')
                next_station = platform_info.get('next_station')
                
                # Only process if terminal exists but next_station is null
                if terminal and not next_station:
                    # Find the connection that matches this terminal
                    for conn in connections:
                        if conn['terminal_station_id'] == terminal:
                            # This connection goes toward the same terminal
                            # So the next station is the 'to_station_id'
                            platform_info['next_station'] = conn['to_station_id']
                            fixed_count += 1
                            print(f"  Inferred {station_id} Platform {platform_num}: next_station={conn['to_station_id']}")
                            break
        
        print(f"  ✅ Inferred {fixed_count} next_stations from connections")
        return platform_data
    
    def save_results(self, all_results: List[Dict], output_file: str, log_file: str):
        """Save results and logs to files."""
        
        # Create platform data in final format
        platform_data = {}
        for result in all_results:
            if result['platforms']:
                platform_data[result['station_id']] = result['platforms']
        
        # Fix penultimate stations
        platform_data = self.fix_penultimate_stations(platform_data)
        
        # Infer next_station from connections (for platforms with terminal but no next_station)
        platform_data = self.infer_next_station_from_connections(platform_data)
        
        # Filter out platforms with both terminal and next_station as NULL
        # (these are incomplete terminal station platforms that shouldn't be included)
        print("\n🔧 Filtering out platforms with both terminal and next_station NULL...")
        removed_count = 0
        filtered_platform_data = {}
        
        for station_id, platforms in platform_data.items():
            filtered_platforms = {}
            for platform_num, platform_info in platforms.items():
                terminal = platform_info.get('terminal')
                next_station = platform_info.get('next_station')
                
                # Keep platform only if at least one of terminal or next_station has data
                if terminal is not None or next_station is not None:
                    filtered_platforms[platform_num] = platform_info
                else:
                    removed_count += 1
                    print(f"  Removed {station_id} Platform {platform_num} (both NULL)")
            
            # Only include station if it has at least one valid platform
            if filtered_platforms:
                filtered_platform_data[station_id] = filtered_platforms
        
        platform_data = filtered_platform_data
        print(f"  ✅ Removed {removed_count} platforms with both NULL")
        
        # Rebuild missing_data_log AFTER the fix to reflect actual missing data
        updated_missing_data_log = []
        actual_missing_terminal = 0
        actual_missing_next_station = 0
        
        for station_id, platforms in platform_data.items():
            station_name = self.stations_by_id.get(station_id, {}).get('name', station_id)
            for platform_num, platform_info in platforms.items():
                if not platform_info.get('terminal'):
                    actual_missing_terminal += 1
                    updated_missing_data_log.append({
                        'station_id': station_id,
                        'station_name': station_name,
                        'platform': platform_num,
                        'missing': 'terminal',
                        'bound': platform_info.get('bound')
                    })
                if not platform_info.get('next_station'):
                    actual_missing_next_station += 1
                    updated_missing_data_log.append({
                        'station_id': station_id,
                        'station_name': station_name,
                        'platform': platform_num,
                        'missing': 'next_station',
                        'bound': platform_info.get('bound')
                    })
        
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
                "missing_terminal_count": actual_missing_terminal,
                "missing_next_station_count": actual_missing_next_station
            },
            "success": self.success_log,
            "partial": self.partial_log,
            "failed": self.failure_log,
            "missing_data": updated_missing_data_log
        }
        
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(log, f, indent=2, ensure_ascii=False)

    # ----- Additional fixer utilities (merged from standalone fixer) -----
    def extract_platform_from_infobox_intelligent(self, soup: BeautifulSoup, station_id: str) -> Optional[Dict]:
        """
        Intelligently extract platform data from infobox.
        Parses concatenated platform text like:
        "Platform-1 →Terminal1Platform-2 →Terminal2..."
        """
        platforms = {}

        # Find infobox
        infobox = soup.find('table', class_=lambda x: x and 'infobox' in x)
        if not infobox:
            return None

        rows = infobox.find_all('tr')

        for row in rows:
            header = row.find('th')
            value = row.find('td')

            if not header or not value:
                continue

            header_text = header.get_text(strip=True).lower()
            value_text = value.get_text(strip=True)

            # Extract detailed platform information from "Platforms" row
            # Format: "Side platformPlatform-1 →Terminal1Platform-2 →Terminal2..."
            if 'platform' in header_text and 'Platform-' in value_text:
                # Split by "Platform-" to get individual platform entries
                platform_entries = re.split(r'Platform-(\d+)', value_text)

                # Process pairs: [prefix, num, data, num, data, ...]
                for i in range(1, len(platform_entries), 2):
                    if i + 1 < len(platform_entries):
                        platform_num = platform_entries[i]
                        platform_data = platform_entries[i + 1]

                        terminal_id = None
                        bound = None

                        # Look for terminal after → or ←
                        # The data after arrow goes until the next Platform- marker or end
                        terminal_match = re.search(r'[→←]\s*(.+?)(?=Platform-|$)', platform_data)
                        if terminal_match:
                            terminal_name = terminal_match.group(1).strip()
                            # Clean up the terminal name
                            terminal_name = re.sub(r'\s+', ' ', terminal_name)
                            terminal_id = self.find_station_id(terminal_name, station_id)

                        # Infer direction
                        platform_data_lower = platform_data.lower()
                        if 'northbound' in platform_data_lower or 'north bound' in platform_data_lower:
                            bound = 'north'
                        elif 'southbound' in platform_data_lower or 'south bound' in platform_data_lower:
                            bound = 'south'
                        elif 'eastbound' in platform_data_lower or 'east bound' in platform_data_lower:
                            bound = 'east'
                        elif 'westbound' in platform_data_lower or 'west bound' in platform_data_lower:
                            bound = 'west'
                        elif 'clockwise' in platform_data_lower:
                            bound = 'clockwise'
                        elif 'anticlockwise' in platform_data_lower:
                            bound = 'anticlockwise'

                        platforms[platform_num] = {
                            'terminal': terminal_id,
                            'next_station': None,
                            'bound': bound,
                            'source': 'infobox_intelligent'
                        }

        return platforms if platforms else None

    def fix_partial_and_failed(self, log_file: str = 'platform_extraction_log.json',
                               urls_file: str = 'station_wikipedia_urls.json',
                               output_file: str = 'platform_data.json',
                               fix_log: str = 'platform_fix_log.json') -> None:
        """
        Process partial and failed stations recorded in an extraction log and
        attempt to improve platform data by parsing the infobox intelligently.
        Updates `platform_data.json` and writes `platform_fix_log.json`.
        """
        print("🔧 Starting integrated Platform Data Fixer")

        # Load extraction log
        with open(log_file, 'r') as f:
            log = json.load(f)

        # Load URLs
        with open(urls_file, 'r') as f:
            urls = json.load(f)

        # Load current platform data
        with open(output_file, 'r') as f:
            platform_data = json.load(f)

        partial_stations = [entry['station_id'] for entry in log.get('partial', [])]
        failed_stations = [entry['station_id'] for entry in log.get('failed', [])]
        all_to_fix = partial_stations + failed_stations

        improved = []
        still_partial = []
        still_failed = []

        for i, station_id in enumerate(all_to_fix, 1):
            url = urls.get(station_id)
            if not url:
                still_partial.append({'station_id': station_id, 'reason': 'no_url'})
                continue

            station_name = self.stations_by_id.get(station_id, {}).get('name', station_id)
            print(f"[{i}/{len(all_to_fix)}] 🔍 {station_name} ({station_id})")

            try:
                response = self.session.get(url, timeout=15)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')

                platforms = self.extract_platform_from_infobox_intelligent(soup, station_id)
                if platforms:
                    improved.append({'station_id': station_id, 'platforms': platforms})
                    # Merge into existing platform_data
                    if station_id in platform_data:
                        for pnum, pdata in platforms.items():
                            if pnum in platform_data[station_id]:
                                platform_data[station_id][pnum].update({k: v for k, v in pdata.items() if v is not None})
                            else:
                                platform_data[station_id][pnum] = pdata
                    else:
                        platform_data[station_id] = platforms
                    print("    ✅ IMPROVED: extracted from infobox")
                else:
                    still_partial.append({'station_id': station_id, 'reason': 'no_infobox_data'})
                    print("    ⚠️  STILL_PARTIAL: no additional infobox data")

            except Exception as e:
                still_failed.append({'station_id': station_id, 'error': str(e)})
                print(f"    ❌ ERROR: {e}")

        # Save merged platform data
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(platform_data, f, indent=2, ensure_ascii=False)
        
        # Fix penultimate stations in the merged data
        print("\n🔧 Applying penultimate station fix to merged data...")
        platform_data = self.fix_penultimate_stations(platform_data)
        
        # Save again with penultimate fixes
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(platform_data, f, indent=2, ensure_ascii=False)

        # Save fix log
        fix_summary = {
            'summary': {
                'attempted': len(all_to_fix),
                'improved': len(improved),
                'still_partial': len(still_partial),
                'still_failed': len(still_failed)
            },
            'improved': improved,
            'still_partial': still_partial,
            'still_failed': still_failed
        }
        with open(fix_log, 'w', encoding='utf-8') as f:
            json.dump(fix_summary, f, indent=2, ensure_ascii=False)

        print('\n✨ Integrated fixing complete')
        print(f"   • Attempted: {len(all_to_fix)}")
        print(f"   • Improved: {len(improved)}")
        print(f"   • Still partial: {len(still_partial)}")
        print(f"   • Still failed: {len(still_failed)}")


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
