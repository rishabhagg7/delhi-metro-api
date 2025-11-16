#!/usr/bin/env python3
"""
Platform Data Fixer for Partial and Failed Stations
Enhances platform data for stations that only have basic infobox data
or failed completely during initial extraction.
"""

import json
import os
import re
import requests
from bs4 import BeautifulSoup
from typing import Dict, List, Optional
from difflib import SequenceMatcher


class PlatformDataFixer:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Load station data for mapping
        self.stations_by_id = {}
        self.stations_by_name = {}
        self.load_station_data()
        
        # Results tracking
        self.improved = []
        self.still_partial = []
        self.still_failed = []
        
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
        if 'millennium city centre' in clean_name or 'millennium city center' in clean_name:
            clean_name = re.sub(r'millennium city cent(re|er)', 'huda city centre', clean_name)
            clean_name = re.sub(r'\s+(gurugram|gurgaon)$', '', clean_name).strip()
        
        # Direct lookup with variations
        lookup_variants = [
            clean_name,
            clean_name.replace(' ', '_'),
            clean_name.replace('-', ' '),
            clean_name.replace('metro station', '').strip(),
            clean_name.replace('station', '').strip(),
            re.sub(r'\s+(delhi|gurugram|gurgaon|noida|faridabad)$', '', clean_name).strip(),
        ]
        
        for variant in lookup_variants:
            if variant in self.stations_by_name:
                matches = self.stations_by_name[variant]
                if len(matches) == 1:
                    return matches[0]
                if current_station_id and current_station_id in self.stations_by_id:
                    current_lines = [line['name'] for line in self.stations_by_id[current_station_id].get('lines', [])]
                    for match_id in matches:
                        match_lines = [line['name'] for line in self.stations_by_id[match_id].get('lines', [])]
                        if any(line in match_lines for line in current_lines):
                            return match_id
                return matches[0]
        
        # Fuzzy matching
        best_match = None
        best_score = 0.6
        
        for station_id, station in self.stations_by_id.items():
            station_name = station['name'].lower()
            station_name_clean = re.sub(r'\(.*?\)', '', station_name).strip()
            
            score = max(
                self.similarity(clean_name, station_name),
                self.similarity(clean_name, station_name_clean),
                self.similarity(clean_name, station_id.replace('_', ' '))
            )
            
            if score > best_score:
                best_score = score
                best_match = station_id
        
        return best_match
    
    def extract_intelligent_infobox(self, soup: BeautifulSoup, station_id: str) -> Optional[Dict]:
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
                print(f"   📋 Found platform data in infobox")
                
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
                        # The data is clean: " →Millennium City Centre Gurugram" or " →Samaypur Badli"
                        terminal_match = re.search(r'[→←]\s*(.+)', platform_data)
                        if terminal_match:
                            terminal_name = terminal_match.group(1).strip()
                            # Clean up the terminal name
                            terminal_name = re.sub(r'\s+', ' ', terminal_name)
                            terminal_id = self.find_station_id(terminal_name, station_id)
                            print(f"      Platform {platform_num}: '{terminal_name}' → {terminal_id}")
                        
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
                            'next_station': None,  # Not available in infobox
                            'bound': bound
                        }
        
        return platforms if platforms else None
    
    def fix_station(self, station_id: str, wiki_url: str) -> Dict:
        """
        Attempt to extract better platform data for a station.
        Returns improved platform data or None if no improvement.
        """
        result = {
            "station_id": station_id,
            "url": wiki_url,
            "platforms": None,
            "status": "still_failed",
            "improvement": None
        }
        
        try:
            response = self.session.get(wiki_url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Try intelligent infobox extraction
            platforms = self.extract_intelligent_infobox(soup, station_id)
            
            if platforms:
                result["platforms"] = platforms
                result["status"] = "improved"
                result["improvement"] = "Extracted terminal data from infobox"
                self.improved.append(result)
                return result
            else:
                result["status"] = "still_partial"
                result["improvement"] = "No additional data available"
                self.still_partial.append(result)
                
        except Exception as e:
            result["status"] = "error"
            result["error"] = str(e)
            self.still_failed.append(result)
        
        return result
    
    def process_partial_and_failed(self):
        """Process all partial and failed stations from the extraction log."""
        
        print("🔧 Starting Platform Data Fixer")
        print("=" * 70)
        
        # Load extraction log
        with open('platform_extraction_log.json', 'r') as f:
            log = json.load(f)
        
        # Load URLs
        with open('station_wikipedia_urls.json', 'r') as f:
            urls = json.load(f)
        
        # Load current platform data
        with open('platform_data.json', 'r') as f:
            platform_data = json.load(f)
        
        # Get partial and failed stations
        partial_stations = [entry['station_id'] for entry in log['partial']]
        failed_stations = [entry['station_id'] for entry in log['failed']]
        
        print(f"\n📊 Stations to fix:")
        print(f"   • Partial: {len(partial_stations)}")
        print(f"   • Failed: {len(failed_stations)}")
        print()
        
        all_to_fix = partial_stations + failed_stations
        improvements = {}
        
        for i, station_id in enumerate(all_to_fix, 1):
            url = urls.get(station_id)
            if not url:
                continue
            
            station_name = self.stations_by_id.get(station_id, {}).get('name', station_id)
            print(f"[{i}/{len(all_to_fix)}] 🔍 {station_name} ({station_id})")
            
            result = self.fix_station(station_id, url)
            
            if result['status'] == 'improved':
                print(f"    ✅ IMPROVED: {result['improvement']}")
                improvements[station_id] = result['platforms']
                # Merge with existing data
                if station_id in platform_data:
                    # Update existing platforms with new data
                    for p_num, p_data in result['platforms'].items():
                        if p_num in platform_data[station_id]:
                            # Merge new data into existing
                            platform_data[station_id][p_num].update({
                                k: v for k, v in p_data.items() if v is not None
                            })
                        else:
                            platform_data[station_id][p_num] = p_data
                else:
                    platform_data[station_id] = result['platforms']
            else:
                print(f"    ⚠️  {result['status'].upper()}: {result.get('improvement', result.get('error', 'Unknown'))}")
        
        # Save updated platform data
        with open('platform_data.json', 'w', encoding='utf-8') as f:
            json.dump(platform_data, f, indent=2, ensure_ascii=False)
        
        # Save improvement log
        fix_log = {
            "summary": {
                "attempted": len(all_to_fix),
                "improved": len(self.improved),
                "still_partial": len(self.still_partial),
                "still_failed": len(self.still_failed)
            },
            "improved": self.improved,
            "still_partial": self.still_partial,
            "still_failed": self.still_failed
        }
        
        with open('platform_fix_log.json', 'w', encoding='utf-8') as f:
            json.dump(fix_log, f, indent=2, ensure_ascii=False)
        
        # Print summary
        print("\n" + "=" * 70)
        print("✨ FIXING COMPLETE!")
        print("=" * 70)
        print(f"📊 Results:")
        print(f"   • Attempted: {len(all_to_fix)}")
        print(f"   • ✅ Improved: {len(self.improved)} ({len(self.improved)/len(all_to_fix)*100:.1f}%)")
        print(f"   • ⚠️  Still partial: {len(self.still_partial)} ({len(self.still_partial)/len(all_to_fix)*100:.1f}%)")
        print(f"   • ❌ Still failed: {len(self.still_failed)} ({len(self.still_failed)/len(all_to_fix)*100:.1f}%)")
        print(f"\n📁 Files updated:")
        print(f"   • Platform data: platform_data.json")
        print(f"   • Fix log: platform_fix_log.json")
        print("=" * 70)


def main():
    """Main execution function."""
    fixer = PlatformDataFixer()
    fixer.process_partial_and_failed()


if __name__ == '__main__':
    main()
