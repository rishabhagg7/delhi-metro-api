#!/usr/bin/env python3
"""
Retry failed stations (null values) with enhanced LLM prompts
Specifically designed to handle:
- Spelling errors (mansrover -> Mansarovar, seelam -> Seelampur)
- Name variations (netaji_subash -> Netaji Subhash)
- Missing stations
"""

import json
import os
import requests
import time
from typing import Dict, Optional


class RetryFailedStations:
    def __init__(self, groq_api_key: str):
        self.groq_api_key = groq_api_key
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def verify_url(self, url: str) -> bool:
        """Verify if URL is valid and contains metro station content."""
        try:
            response = self.session.get(url, timeout=10)
            if response.status_code != 200:
                return False
            
            content_lower = response.text.lower()
            has_metro = 'delhi metro' in content_lower or 'dmrc' in content_lower
            has_station = 'station' in content_lower
            is_list = 'list of' in content_lower[:1000]
            
            return has_metro and has_station and not is_list
        except:
            return False
    
    def try_groq_with_context(self, station_id: str, station_name: str, station_data: Dict) -> Optional[str]:
        """Use Groq with enhanced context to find Wikipedia URL."""
        
        # Build context from station data
        lines = station_data.get('lines', [])
        line_names = [line.get('name', '') for line in lines]
        
        # Line-aware prompt with prioritized reference pages
        prompt = f'''You are a Wikipedia URL finder for Delhi Metro stations. Find the EXACT Wikipedia URL for this station.

Station Information:
- ID: {station_id}
- Name: {station_name}
- Metro Lines: {', '.join(line_names) if line_names else 'unknown'}

Priority references (check these first when applicable):
- Rapid Metro (Gurgaon): https://en.wikipedia.org/wiki/Rapid_Metro_Gurgaon
- Aqua Line (Noida Metro): https://en.wikipedia.org/wiki/Aqua_Line_(Noida_Metro)
- List of Delhi Metro stations: https://en.wikipedia.org/wiki/List_of_Delhi_Metro_stations

IMPORTANT - Common spelling corrections for Delhi Metro:
- "mansrover" → "Mansarovar" 
- "seelam" → "Seelampur"
- "netaji subash" → "Netaji Subhash"
- "paschim vihar" → might have separate pages for West/East
- "rohini sector" → might be "Rohini Sector 18" or "Rohini Sector 19"

Task: Find the Wikipedia URL for the Delhi Metro station based on the information above.

Instructions:
1. Correct any spelling errors in the station name
2. Try common variations (with/without "metro station", with/without "Delhi Metro")
3. If the station is on Rapid Metro or Aqua Line, prefer the respective article's linked pages
4. Return ONLY the full URL starting with https://en.wikipedia.org/wiki/
5. If you absolutely cannot find it, return "NOT_FOUND"

Examples:
- "mansrover_park" → https://en.wikipedia.org/wiki/Mansarovar_Park_metro_station
- "seelam_pur" → https://en.wikipedia.org/wiki/Seelampur_metro_station
- "netaji_subash_place" → https://en.wikipedia.org/wiki/Netaji_Subhash_Place_metro_station

Wikipedia URL:'''
        
        try:
            headers = {
                'Authorization': f'Bearer {self.groq_api_key}',
                'Content-Type': 'application/json'
            }
            
            # Use llama-3.3-70b-versatile which is available and returns content reliably
            data = {
                'model': 'llama-3.3-70b-versatile',
                'messages': [
                    {'role': 'system', 'content': 'You are a Wikipedia URL finder specializing in Delhi Metro stations. You correct spelling errors and return only the exact Wikipedia URL.'},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.1,
                'max_tokens': 200
            }
            
            response = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                text = result['choices'][0]['message']['content'].strip()
                
                # Extract URL from response
                if 'wikipedia.org/wiki/' in text:
                    import re
                    url_match = re.search(r'https://en\.wikipedia\.org/wiki/[^\s\)]+', text)
                    if url_match:
                        found_url = url_match.group(0)
                        # Clean up any trailing punctuation
                        found_url = found_url.rstrip('.,;)')
                        
                        # Verify the URL
                        if self.verify_url(found_url):
                            return found_url
                        else:
                            print(f"    ⚠️  URL found but verification failed: {found_url}")
                
                elif 'NOT_FOUND' in text:
                    return None
            
            elif response.status_code == 429:
                print(f"    ⚠️  Rate limit hit, waiting 60 seconds...")
                time.sleep(60)
                return self.try_groq_with_context(station_id, station_name, station_data)
            
            else:
                print(f"    ⚠️  Groq API error: {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"    📄 Error: {error_detail}")
                except:
                    print(f"    📄 Response: {response.text[:300]}")
        
        except Exception as e:
            print(f"    ⚠️  Error: {e}")
        
        return None
    
    def retry_null_stations(self, urls_file: str, stations_file: str, output_file: str):
        """Retry all stations that have null values."""
        
        print("🔄 Retrying Failed Stations with Enhanced LLM")
        print("=" * 60)
        
        # Load existing URLs
        with open(urls_file, 'r') as f:
            urls = json.load(f)
        
        # Load station data
        with open(stations_file, 'r') as f:
            stations = json.load(f)
        
        # Create station lookup
        station_lookup = {s['id']: s for s in stations}
        
        # Find null stations
        null_stations = [(sid, urls[sid]) for sid in urls if urls[sid] is None]
        
        print(f"\n📊 Found {len(null_stations)} stations with null URLs")
        print(f"🤖 Using Groq LLM with enhanced prompts\n")
        
        found_count = 0
        still_null_count = 0
        
        for i, (station_id, _) in enumerate(null_stations, 1):
            station_data = station_lookup.get(station_id, {})
            station_name = station_data.get('name', station_id.replace('_', ' ').title())
            
            print(f"[{i}/{len(null_stations)}] 🔍 Retrying: {station_name} ({station_id})")
            
            # Try with Groq
            url = self.try_groq_with_context(station_id, station_name, station_data)
            
            if url:
                urls[station_id] = url
                found_count += 1
                print(f"    ✅ FOUND: {url}\n")
            else:
                still_null_count += 1
                print(f"    ❌ Still not found\n")
            
            # Save progress every 5 stations
            if i % 5 == 0:
                with open(output_file, 'w') as f:
                    json.dump(urls, f, indent=2)
                print(f"  💾 Progress saved ({found_count} newly found, {still_null_count} still missing)\n")
            
            # Rate limiting - Groq free tier: 30 req/min
            time.sleep(2.5)  # ~24 req/min to be safe
        
        # Final save
        with open(output_file, 'w') as f:
            json.dump(urls, f, indent=2)
        
        print("\n" + "=" * 60)
        print("✨ RETRY COMPLETE!")
        print("=" * 60)
        print(f"📊 Results:")
        print(f"   • Stations retried: {len(null_stations)}")
        print(f"   • Newly found: {found_count}")
        print(f"   • Still missing: {still_null_count}")
        
        # Calculate new total
        total_found = sum(1 for v in urls.values() if v is not None)
        total_stations = len(urls)
        print(f"\n📈 New Totals:")
        print(f"   • Total found: {total_found}/{total_stations} ({total_found/total_stations*100:.1f}%)")
        print(f"   • Saved to: {output_file}")
        print("=" * 60 + "\n")
        
        # Show what's still missing
        if still_null_count > 0:
            print("\n❌ Still Missing ({}):\n".format(still_null_count))
            for sid in urls:
                if urls[sid] is None:
                    station_data = station_lookup.get(sid, {})
                    name = station_data.get('name', sid)
                    print(f"   - {name} ({sid})")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Retry failed stations with enhanced LLM')
    parser.add_argument('--urls', default='station_wikipedia_urls.json',
                       help='Current URLs file with null values')
    parser.add_argument('--stations', default='delhi_metro_stations.json',
                       help='Stations data file')
    parser.add_argument('--output', default='station_wikipedia_urls.json',
                       help='Output file (can be same as input)')
    parser.add_argument('--groq-api-key',
                       help='Groq API key (or set GROQ_API_KEY env var)')
    
    args = parser.parse_args()
    
    # Get API key
    groq_key = args.groq_api_key or os.getenv('GROQ_API_KEY')
    
    if not groq_key:
        print("❌ Error: Groq API key required!")
        print("   Set GROQ_API_KEY environment variable or use --groq-api-key")
        print("\n   export GROQ_API_KEY='gsk_...'")
        print("   python3 retry_failed_stations.py")
        return
    
    # Create retrier
    retrier = RetryFailedStations(groq_key)
    
    # Retry null stations
    retrier.retry_null_stations(
        urls_file=args.urls,
        stations_file=args.stations,
        output_file=args.output
    )


if __name__ == '__main__':
    main()
