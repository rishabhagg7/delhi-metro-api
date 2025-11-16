#!/usr/bin/env python3
"""
Test the intelligent platform scraper on sample stations
"""

from intelligent_platform_scraper import IntelligentPlatformScraper
import json

# Load URLs
with open('station_wikipedia_urls.json', 'r') as f:
    urls = json.load(f)

# Test on sample stations with different patterns
test_stations = [
    'rajiv_chowk',      # Multiple platforms, clear layout table
    'welcome',          # Island platform
    'kashmere_gate',    # Side platforms
    'dwarka_sector_-_21',  # Sector station
    'huda_city_centre', # Terminal station
]

print('='*80)
print('TESTING INTELLIGENT PLATFORM SCRAPER')
print('='*80)

scraper = IntelligentPlatformScraper()

for station_id in test_stations:
    url = urls.get(station_id)
    if not url:
        print(f'\n⚠️  No URL for {station_id}')
        continue
    
    print(f'\n📍 Testing: {station_id}')
    print(f'URL: {url}')
    print('-'*80)
    
    result = scraper.scrape_station_platform(station_id, url)
    
    print(f'Status: {result["status"]}')
    print(f'Method: {result["extraction_method"]}')
    
    if result['platforms']:
        print(f'Platforms found: {len(result["platforms"])}')
        for platform_num, platform_data in sorted(result['platforms'].items()):
            print(f'\n  Platform {platform_num}:')
            for key, value in platform_data.items():
                if key == 'terminal' and value:
                    # Show terminal station name
                    terminal_name = scraper.stations_by_id.get(value, {}).get('name', value)
                    print(f'    {key}: {value} ({terminal_name})')
                else:
                    print(f'    {key}: {value}')
    else:
        print(f'❌ Error: {result.get("error", "Unknown")}')
    
    print()

print('='*80)
print('Test complete!')
