"""
Complete Wikipedia Scraper for Delhi Metro + Aqua Line + Rapid Metro
Handles all three systems with platform data extraction
"""

import json
import requests
from bs4 import BeautifulSoup
import time
import re
from typing import Dict, Optional, List
from urllib.parse import quote, urljoin

class CompletePlatformScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.base_url = "https://en.wikipedia.org/wiki/"
        self.station_urls = {}
    
    # ========== MASTER LIST EXTRACTION ==========
    
    def extract_urls_from_master_list(self) -> Dict[str, str]:
        """
        Extract all station URLs from Wikipedia master lists
        Handles: Delhi Metro, Aqua Line, Rapid Metro
        """
        print("=" * 70)
        print("🚇 STEP 1: Extracting station URLs from master lists")
        print("=" * 70)
        
        urls = {}
        
        # Get Delhi Metro stations from master list
        delhi_urls = self._extract_delhi_metro_urls()
        urls.update(delhi_urls)
        
        # Get Aqua Line stations
        aqua_urls = self._extract_aqua_line_urls()
        urls.update(aqua_urls)
        
        # Get Rapid Metro stations
        rapid_urls = self._extract_rapid_metro_urls()
        urls.update(rapid_urls)
        
        print(f"\n✅ Total stations found: {len(urls)}")
        print(f"   Delhi Metro: {len(delhi_urls)}")
        print(f"   Aqua Line (Noida): {len(aqua_urls)}")
        print(f"   Rapid Metro (Gurgaon): {len(rapid_urls)}")
        
        # Save cache
        with open('station_urls_complete.json', 'w', encoding='utf-8') as f:
            json.dump(urls, f, ensure_ascii=False, indent=2)
        
        return urls
    
    def _extract_delhi_metro_urls(self) -> Dict[str, str]:
        """Extract Delhi Metro station URLs from master list"""
        url = "https://en.wikipedia.org/wiki/List_of_Delhi_Metro_stations"
        urls = {}
        
        try:
            print(f"\n📡 Fetching: Delhi Metro master list")
            response = self.session.get(url, timeout=10)
            
            if response.status_code != 200:
                print(f"   ❌ Status {response.status_code}")
                return urls
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all station links in tables
            tables = soup.find_all('table', {'class': 'wikitable'})
            
            for table in tables:
                rows = table.find_all('tr')
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    if len(cells) > 0:
                        # Look for station link (usually first cell)
                        for cell in cells:
                            link = cell.find('a')
                            if link and link.get('href') and 'metro' in link['href'].lower():
                                station_name = link.get_text(strip=True)
                                station_url = urljoin("https://en.wikipedia.org", link['href'])
                                urls[station_name] = station_url
            
            print(f"   ✅ Extracted {len(urls)} Delhi Metro stations")
            
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
        
        return urls
    
    def _extract_aqua_line_urls(self) -> Dict[str, str]:
        """Extract Aqua Line (Noida Metro) station URLs"""
        url = "https://en.wikipedia.org/wiki/Aqua_Line_(Noida_Metro)"
        urls = {}
        
        try:
            print(f"\n📡 Fetching: Aqua Line master list")
            response = self.session.get(url, timeout=10)
            
            if response.status_code != 200:
                print(f"   ❌ Status {response.status_code}")
                return urls
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find station table
            table = soup.find('table', {'class': 'wikitable'})
            
            if table:
                rows = table.find_all('tr')[1:]  # Skip header
                for row in rows:
                    cells = row.find_all('td')
                    if len(cells) > 1:
                        link = cells[1].find('a')
                        if link and link.get('href'):
                            station_name = link.get_text(strip=True)
                            station_url = urljoin("https://en.wikipedia.org", link['href'])
                            urls[station_name] = station_url
            
            print(f"   ✅ Extracted {len(urls)} Aqua Line stations")
            
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
        
        return urls
    
    def _extract_rapid_metro_urls(self) -> Dict[str, str]:
        """Extract Rapid Metro (Gurgaon) station URLs"""
        url = "https://en.wikipedia.org/wiki/Rapid_Metro_Gurgaon"
        urls = {}
        
        try:
            print(f"\n📡 Fetching: Rapid Metro master list")
            response = self.session.get(url, timeout=10)
            
            if response.status_code != 200:
                print(f"   ❌ Status {response.status_code}")
                return urls
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find station table
            table = soup.find('table', {'class': 'wikitable'})
            
            if table:
                rows = table.find_all('tr')[1:]  # Skip header
                for row in rows:
                    cells = row.find_all('td')
                    if len(cells) > 1:
                        link = cells[1].find('a')
                        if link and link.get('href'):
                            station_name = link.get_text(strip=True)
                            station_url = urljoin("https://en.wikipedia.org", link['href'])
                            urls[station_name] = station_url
            
            print(f"   ✅ Extracted {len(urls)} Rapid Metro stations")
            
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
        
        return urls
    
    # ========== PLATFORM DATA EXTRACTION ==========
    
    def scrape_station_layout(self, station_name: str, station_url: str) -> Optional[Dict]:
        """
        Scrape station layout from individual Wikipedia page
        Returns: {line: {platform_number: {direction, towards}}}
        """
        try:
            response = self.session.get(station_url, timeout=10)
            
            if response.status_code != 200:
                return None
            
            soup = BeautifulSoup(response.content, 'html.parser')
            platform_data = {}
            
            # Find all "Station layout" sections
            headers = soup.find_all(['h2', 'h3'])
            
            for header in headers:
                if 'Station layout' in header.get_text():
                    line_name = self._extract_line_from_context(header, station_url)
                    
                    # Find the next table
                    table = header.find_next('table')
                    if table:
                        platforms = self._parse_platform_table(table, line_name)
                        if platforms:
                            platform_data[line_name] = platforms
            
            return platform_data if platform_data else None
        
        except Exception as e:
            return None
    
    def _extract_line_from_context(self, header, url: str) -> str:
        """Extract line name from header or URL"""
        text = header.get_text()
        url_text = url.lower()
        
        lines = {
            'red': ['Red Line', 'RED', 'red'],
            'yellow': ['Yellow Line', 'YELLOW', 'yellow'],
            'blue': ['Blue Line', 'BLUE', 'blue'],
            'green': ['Green Line', 'GREEN', 'green'],
            'violet': ['Violet Line', 'VIOLET', 'violet'],
            'pink': ['Pink Line', 'PINK', 'pink'],
            'magenta': ['Magenta Line', 'MAGENTA', 'magenta'],
            'orange': ['Orange Line', 'ORANGE', 'orange'],
            'gray': ['Gray Line', 'GRAY', 'gray'],
            'aqua': ['Aqua Line', 'AQUA', 'aqua'],
            'rapid': ['Rapid Metro', 'RAPID', 'rapid']
        }
        
        for color, patterns in lines.items():
            for pattern in patterns:
                if pattern in text or pattern in url_text:
                    return color
        
        return 'unknown'
    
    def _parse_platform_table(self, table, line_name: str) -> Dict:
        """Parse platform table"""
        platforms = {}
        rows = table.find_all('tr')
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) < 2:
                continue
            
            row_text = ' '.join([cell.get_text(strip=True) for cell in cells])
            
            # Look for platform entries
            platform_match = re.search(r'Platform\s*(\d+)', row_text, re.IGNORECASE)
            
            if platform_match:
                platform_num = platform_match.group(1)
                direction = self._extract_direction(row_text)
                
                platforms[platform_num] = {
                    'direction': direction,
                    'towards': ''
                }
        
        return platforms
    
    def _extract_direction(self, text: str) -> Optional[str]:
        """Extract direction"""
        directions = [
            'Northbound', 'Southbound', 'Eastbound', 'Westbound',
            'Clockwise', 'Anticlockwise'
        ]
        
        for direction in directions:
            if direction.lower() in text.lower():
                return direction
        
        return None
    
    # ========== MAIN PROCESSING ==========
    
    def process_all_stations(self, 
                            stations_file: str,
                            output_file: str = 'delhi_metro_all_lines_enriched.json'):
        """Main processing function"""
        
        # Load stations
        try:
            with open(stations_file, 'r', encoding='utf-8') as f:
                stations = json.load(f)
        except FileNotFoundError:
            print(f"❌ File not found: {stations_file}")
            return
        
        # Step 1: Extract all station URLs from master lists
        station_urls = self.extract_urls_from_master_list()
        
        # Step 2: Scrape platform data
        print("\n" + "=" * 70)
        print("🚇 STEP 2: Scraping platform data from individual stations")
        print("=" * 70)
        
        platform_database = {}
        total_stations = len(stations)
        
        # Separate stations by system
        delhi_metro = [s for s in stations if s.get('lines', [{}])[0].get('name') not in ['aqua', 'rapid']]
        aqua_stations = [s for s in stations if any(l.get('name') == 'aqua' for l in s.get('lines', []))]
        rapid_stations = [s for s in stations if any(l.get('name') == 'rapid' for l in s.get('lines', []))]
        
        # Process Delhi Metro
        self._process_station_list(delhi_metro, station_urls, platform_database, "Delhi Metro", 0)
        
        # Process Aqua Line
        self._process_station_list(aqua_stations, station_urls, platform_database, "Aqua Line", len(delhi_metro))
        
        # Process Rapid Metro
        self._process_station_list(rapid_stations, station_urls, platform_database, "Rapid Metro", len(delhi_metro) + len(aqua_stations))
        
        print(f"\n✅ Total stations with platform data: {len(platform_database)}")
        
        # Save and finish
        with open('platform_database_complete.json', 'w', encoding='utf-8') as f:
            json.dump(platform_database, f, ensure_ascii=False, indent=2)
        
        print(f"💾 Saved to: platform_database_complete.json")
        
        print("\n" + "=" * 70)
        print("✨ ENRICHMENT COMPLETE!")
        print("=" * 70)
        print(f"📊 Summary:")
        print(f"   • Delhi Metro: {len(delhi_metro)} stations")
        print(f"   • Aqua Line: {len(aqua_stations)} stations")
        print(f"   • Rapid Metro: {len(rapid_stations)} stations")
        print(f"   • Total: {total_stations} stations")
    
    def _process_station_list(self, stations, urls, platform_db, system_name, start_idx):
        """Process a list of stations"""
        print(f"\n📍 Processing {system_name}:")
        success = 0
        
        for idx, station in enumerate(stations, 1):
            station_name = station.get('name', '')
            station_id = station.get('id', '')
            
            # Find matching URL
            station_url = urls.get(station_name)
            
            if not station_url:
                # Try search API as fallback
                station_url = self._search_wikipedia(station_name)
            
            if station_url:
                platform_data = self.scrape_station_layout(station_name, station_url)
                if platform_data:
                    platform_db[station_id] = platform_data
                    success += 1
            
            if idx % 10 == 0:
                print(f"   [{idx}/{len(stations)}] Processed...")
            
            time.sleep(0.5)  # Rate limiting
        
        print(f"   ✅ {success}/{len(stations)} stations enriched")
    
    def _search_wikipedia(self, station_name: str) -> Optional[str]:
        """Use Wikipedia search API as fallback"""
        try:
            url = "https://en.wikipedia.org/w/api.php"
            params = {
                'action': 'query',
                'list': 'search',
                'srsearch': f'{station_name} metro station',
                'format': 'json',
                'srlimit': 1
            }
            response = self.session.get(url, params=params, timeout=10)
            results = response.json()['query']['search']
            
            if results:
                wiki_title = results[0]['title']
                return f"https://en.wikipedia.org/wiki/{wiki_title.replace(' ', '_')}"
        except:
            pass
        
        return None


def main():
    """Main execution"""
    print("=" * 70)
    print("🚇 Complete Delhi Metro + Aqua Line + Rapid Metro Scraper")
    print("   Extracts platform data for all three systems")
    print("=" * 70 + "\n")
    
    scraper = CompletePlatformScraper()
    
    scraper.process_all_stations(
        stations_file='delhi_metro_stations.json',
        output_file='delhi_metro_all_lines_enriched.json'
    )


if __name__ == "__main__":
    main()
