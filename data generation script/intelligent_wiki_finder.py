#!/usr/bin/env python3
"""
Intelligent Wikipedia URL Finder for Delhi Metro Stations
Uses multiple strategies including:
1. Wikipedia Search API
2. Fuzzy string matching
3. LLM-based intelligent search (OpenAI/Groq)
4. Google Custom Search fallback
"""

import json
import requests
import time
import os
from typing import Dict, List, Optional, Tuple
from urllib.parse import quote, unquote
import re
from difflib import SequenceMatcher


class IntelligentWikiFinder:
    def __init__(self, use_llm: bool = False, llm_api_key: Optional[str] = None):
        """
        Initialize the intelligent Wikipedia finder.
        
        Args:
            use_llm: Whether to use LLM for intelligent matching
            llm_api_key: API key for LLM service (OpenAI, Groq, etc.)
        """
        self.use_llm = use_llm
        self.llm_api_key = llm_api_key
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Cache for already found URLs
        self.url_cache = {}
        
        # Common name variations and corrections
        self.known_corrections = {
            'vishwavidyalaya': 'Vishwavidyalaya (Delhi Metro)',
            'huda_city_centre': 'HUDA City Centre (Delhi Metro)',
            'igi_airport': 'Indira Gandhi International Airport',
            'lal_quila': 'Lal Qila (Delhi Metro)',
            'jorbagh': 'Jor Bagh (Delhi Metro)',
        }
        
        # Detect available LLM services
        if self.use_llm:
            self._detect_llm_services()
    
        # Detect available LLM services
        if self.use_llm:
            self._detect_llm_services()
    
    def _detect_llm_services(self):
        """Detect which LLM services are available."""
        services = []
        
        # Check for Groq
        if os.getenv('GROQ_API_KEY'):
            services.append('Groq (FREE)')
        
        # Check for Ollama
        try:
            response = requests.get('http://localhost:11434/api/tags', timeout=2)
            if response.status_code == 200:
                services.append('Ollama (LOCAL)')
        except:
            pass
        
        # Check for OpenAI
        if self.llm_api_key:
            services.append('OpenAI (PAID)')
        
        if services:
            print(f"🤖 LLM Services Available: {', '.join(services)}")
        else:
            print("⚠️  No LLM services detected. Install Groq/Ollama or set API key.")
            print("   Get free Groq key: https://console.groq.com/")
            print("   Or install Ollama: brew install ollama")
            self.use_llm = False
    
    def similarity_score(self, str1: str, str2: str) -> float:
        """Calculate similarity between two strings (0-1)."""
        return SequenceMatcher(None, str1.lower(), str2.lower()).ratio()
    
    def normalize_station_name(self, name: str) -> str:
        """Normalize station name for searching."""
        # Remove special characters
        name = re.sub(r'[_\-()]', ' ', name)
        # Remove extra spaces
        name = ' '.join(name.split())
        return name.strip()
    
    def search_wikipedia_api(self, station_name: str) -> List[Dict]:
        """
        Use Wikipedia Search API to find potential matches.
        
        Returns list of search results with titles and snippets.
        """
        search_query = f"{station_name} delhi metro station"
        
        url = "https://en.wikipedia.org/w/api.php"
        params = {
            'action': 'opensearch',
            'search': search_query,
            'limit': 10,
            'namespace': 0,
            'format': 'json'
        }
        
        try:
            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            # OpenSearch format: [query, [titles], [descriptions], [urls]]
            if len(data) >= 4:
                titles = data[1]
                descriptions = data[2]
                urls = data[3]
                
                results = []
                for title, desc, url in zip(titles, descriptions, urls):
                    results.append({
                        'title': title,
                        'description': desc,
                        'url': url,
                        'score': self.calculate_relevance_score(station_name, title, desc)
                    })
                
                # Sort by relevance score
                results.sort(key=lambda x: x['score'], reverse=True)
                return results
        
        except Exception as e:
            print(f"  ⚠️  Wikipedia API error for {station_name}: {e}")
        
        return []
    
    def calculate_relevance_score(self, query: str, title: str, description: str) -> float:
        """
        Calculate relevance score based on multiple factors.
        Higher score = more relevant.
        """
        query_norm = self.normalize_station_name(query).lower()
        title_lower = title.lower()
        desc_lower = description.lower()
        
        score = 0.0
        
        # Title similarity (most important)
        title_similarity = self.similarity_score(query_norm, title_lower)
        score += title_similarity * 50
        
        # Exact phrase match in title (bonus)
        if query_norm in title_lower:
            score += 30
        
        # Contains "metro" keyword
        if 'metro' in title_lower or 'metro' in desc_lower:
            score += 15
        
        # Contains "delhi" keyword
        if 'delhi' in title_lower or 'delhi' in desc_lower:
            score += 10
        
        # Contains "station" keyword
        if 'station' in title_lower or 'station' in desc_lower:
            score += 5
        
        # Penalty for disambiguation pages
        if 'disambiguation' in title_lower:
            score -= 20
        
        # Penalty for non-station pages
        if any(keyword in title_lower for keyword in ['line', 'corridor', 'phase']):
            if 'station' not in title_lower:
                score -= 15
        
        return score
    
    def verify_url(self, url: str) -> bool:
        """Verify if URL is valid and contains metro station content."""
        try:
            response = self.session.get(url, timeout=10)
            if response.status_code != 200:
                return False
            
            # Check if page contains metro-related content
            content_lower = response.text.lower()
            
            # Must contain key indicators
            has_metro = 'delhi metro' in content_lower or 'dmrc' in content_lower
            has_station = 'station' in content_lower
            
            # Should not be a list/disambiguation page
            is_list = 'list of' in content_lower[:1000]  # Check first 1000 chars
            
            return has_metro and has_station and not is_list
            
        except Exception as e:
            print(f"  ⚠️  URL verification failed: {e}")
            return False
    
    def try_direct_url(self, station_name: str) -> Optional[str]:
        """Try common URL patterns directly."""
        patterns = [
            f"{station_name} metro station",
            f"{station_name} (Delhi Metro)",
            f"{station_name} Metro Station",
            station_name,
        ]
        
        for pattern in patterns:
            # Convert to URL format
            url_name = pattern.replace(' ', '_')
            url = f"https://en.wikipedia.org/wiki/{quote(url_name)}"
            
            try:
                response = self.session.head(url, timeout=5, allow_redirects=True)
                if response.status_code == 200:
                    # Verify it's actually a metro station page
                    if self.verify_url(response.url):
                        return response.url
            except:
                continue
        
        return None
    
    def find_with_llm(self, station_name: str, station_data: Dict) -> Optional[str]:
        """
        Use LLM to intelligently find the correct Wikipedia URL.
        Supports: Groq (free), Ollama (local), OpenAI (paid)
        """
        if not self.use_llm:
            return None
        
        # Add prioritized references and line-aware guidance so the LLM searches the right wiki pages first.
        # If the station is on Rapid Metro or Aqua Line, prefer those pages. Otherwise consult the List of Delhi Metro stations.
        line_list = [line['name'] for line in station_data.get('lines', [])]
        line_hint = ', '.join(line_list) if line_list else 'unknown'

        prompt = f'''Find the exact Wikipedia URL for this Delhi Metro station.

Station Name: {station_name}
Official Name: {station_data.get('name', station_name)}
Lines: {line_hint}

Priority references (check these pages first when applicable):
- Rapid Metro (Gurgaon): https://en.wikipedia.org/wiki/Rapid_Metro_Gurgaon
- Aqua Line (Noida Metro): https://en.wikipedia.org/wiki/Aqua_Line_(Noida_Metro)
- List of Delhi Metro stations: https://en.wikipedia.org/wiki/List_of_Delhi_Metro_stations

The station name may have spelling variations. Use the priority references above when the station is part of Rapid Metro or Aqua Line. If not, prefer the List of Delhi Metro stations and follow links from it.

Instructions:
1) Correct spelling and common OCR/typo mistakes.
2) Try common title variations (add/remove 'metro station', include '(Delhi Metro)')
3) If the station belongs to Rapid Metro, prefer pages linked from the Rapid Metro article.
4) If the station belongs to Aqua Line (Noida Metro), prefer pages linked from the Aqua Line article.
5) Return ONLY the full URL starting with https://en.wikipedia.org/wiki/. If nothing exact is available, return "NOT_FOUND".

Examples:
- "Vishwavidyalaya" -> https://en.wikipedia.org/wiki/Vishwavidyalaya_(Delhi_Metro)
- "Huda City Centre" -> https://en.wikipedia.org/wiki/HUDA_City_Centre_(Delhi_Metro)
- "IGI Airport" -> https://en.wikipedia.org/wiki/Indira_Gandhi_International_Airport

URL:'''
        
        # Try Groq first (free tier, very fast)
        url = self._try_groq(prompt)
        if url:
            return url
        
        # Try Ollama (local, completely free)
        url = self._try_ollama(prompt)
        if url:
            return url
        
        # Try OpenAI (if API key provided)
        if self.llm_api_key:
            url = self._try_openai(prompt)
            if url:
                return url
        
        return None
    
    def _try_groq(self, prompt: str) -> Optional[str]:
        """Try using Groq API (free tier available)."""
        try:
            # Check for Groq API key in environment
            groq_key = os.getenv('GROQ_API_KEY')
            if not groq_key:
                return None
            
            headers = {
                'Authorization': f'Bearer {groq_key}',
                'Content-Type': 'application/json'
            }
            
            # Use a strong Groq-hosted OSS model; 'openai/gpt-oss-20b' is available
            data = {
                'model': 'llama-3.3-70b-versatile',
                'messages': [
                    {'role': 'system', 'content': 'You are a Wikipedia URL finder. Return only the exact URL.'},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.1,
                'max_tokens': 150
            }
            
            response = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                url = result['choices'][0]['message']['content'].strip()
                
                # Extract URL from response
                if 'wikipedia.org/wiki/' in url:
                    # Find the URL in the response
                    import re
                    url_match = re.search(r'https://en\.wikipedia\.org/wiki/[^\s\)]+', url)
                    if url_match:
                        found_url = url_match.group(0)
                        if self.verify_url(found_url):
                            print(f"    🤖 Groq found: {found_url}")
                            return found_url
        
        except Exception as e:
            # Silently fail - Groq might not be available
            pass
        
        return None
    
    def _try_ollama(self, prompt: str) -> Optional[str]:
        """Try using Ollama (local LLM, completely free)."""
        try:
            # Check if Ollama is running
            response = requests.post(
                'http://localhost:11434/api/generate',
                json={
                    'model': 'llama3.1',  # or 'mistral', 'phi3', etc.
                    'prompt': prompt,
                    'stream': False,
                    'options': {
                        'temperature': 0.1,
                        'num_predict': 150
                    }
                },
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                text = result.get('response', '').strip()
                
                # Extract URL from response
                if 'wikipedia.org/wiki/' in text:
                    import re
                    url_match = re.search(r'https://en\.wikipedia\.org/wiki/[^\s\)]+', text)
                    if url_match:
                        found_url = url_match.group(0)
                        if self.verify_url(found_url):
                            print(f"    🤖 Ollama found: {found_url}")
                            return found_url
        
        except Exception as e:
            # Ollama might not be running - that's okay
            pass
        
        return None
    
    def _try_openai(self, prompt: str) -> Optional[str]:
        """Try using OpenAI API (requires API key)."""
        if not self.llm_api_key:
            return None
        
        try:
            headers = {
                'Authorization': f'Bearer {self.llm_api_key}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'model': 'gpt-3.5-turbo',
                'messages': [
                    {'role': 'system', 'content': 'You are a Wikipedia URL finder. Return only the exact URL.'},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.1,
                'max_tokens': 150
            }
            
            response = requests.post(
                'https://api.openai.com/v1/chat/completions',
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                url = result['choices'][0]['message']['content'].strip()
                
                # Extract URL from response
                if 'wikipedia.org/wiki/' in url:
                    import re
                    url_match = re.search(r'https://en\.wikipedia\.org/wiki/[^\s\)]+', url)
                    if url_match:
                        found_url = url_match.group(0)
                        if self.verify_url(found_url):
                            print(f"    🤖 OpenAI found: {found_url}")
                            return found_url
        
        except Exception as e:
            print(f"  ⚠️  OpenAI error: {e}")
        
        return None
    
    def find_wikipedia_url(self, station_id: str, station_data: Dict) -> Optional[str]:
        """
        Main method to find Wikipedia URL for a station.
        Uses multiple strategies in order of reliability.
        """
        # Check cache first
        if station_id in self.url_cache:
            return self.url_cache[station_id]
        
        station_name = station_data.get('name', station_id.replace('_', ' ').title())
        
        print(f"  🔍 Finding URL for: {station_name} ({station_id})")
        
        # Strategy 1: Check known corrections
        if station_id in self.known_corrections:
            corrected_name = self.known_corrections[station_id]
            url = self.try_direct_url(corrected_name)
            if url:
                print(f"    ✅ Found (known correction): {url}")
                self.url_cache[station_id] = url
                return url
        
        # Strategy 2: Try direct URL patterns
        url = self.try_direct_url(station_name)
        if url:
            print(f"    ✅ Found (direct): {url}")
            self.url_cache[station_id] = url
            return url
        
        # Strategy 3: Use Wikipedia Search API
        search_results = self.search_wikipedia_api(station_name)
        if search_results and search_results[0]['score'] > 50:  # Confidence threshold
            url = search_results[0]['url']
            if self.verify_url(url):
                print(f"    ✅ Found (search API): {url} (score: {search_results[0]['score']:.1f})")
                self.url_cache[station_id] = url
                return url
        
        # Strategy 4: Try variations
        variations = [
            f"{station_name} Delhi Metro",
            f"{station_name} Station",
            station_name.replace('-', ' '),
            station_name.replace('_', ' '),
        ]
        
        for variation in variations:
            url = self.try_direct_url(variation)
            if url:
                print(f"    ✅ Found (variation): {url}")
                self.url_cache[station_id] = url
                return url
        
        # Strategy 5: LLM-based intelligent search (if enabled)
        if self.use_llm:
            url = self.find_with_llm(station_name, station_data)
            if url:
                print(f"    ✅ Found (LLM): {url}")
                self.url_cache[station_id] = url
                return url
        
        print(f"    ❌ Not found: {station_name}")
        return None
    
    def process_all_stations(self, stations_file: str, output_file: str, 
                           resume: bool = True, delay: float = 0.3):
        """
        Process all stations from JSON file and save URLs.
        
        Args:
            stations_file: Path to delhi_metro_stations.json
            output_file: Path to save station_urls.json
            resume: Whether to resume from existing output
            delay: Delay between requests (seconds)
        """
        # Load stations
        print(f"📂 Loading stations from: {stations_file}")
        with open(stations_file, 'r', encoding='utf-8') as f:
            stations = json.load(f)
        
        print(f"📊 Total stations: {len(stations)}")
        
        # Load existing results if resuming
        results = {}
        if resume and os.path.exists(output_file):
            try:
                with open(output_file, 'r', encoding='utf-8') as f:
                    results = json.load(f)
                print(f"📂 Loaded {len(results)} existing URLs")
                self.url_cache = results.copy()
            except:
                pass
        
        # Process each station
        found_count = 0
        not_found_count = 0
        
        print("\n" + "="*60)
        print("🚇 Starting Wikipedia URL Discovery")
        print("="*60 + "\n")
        
        for i, station in enumerate(stations, 1):
            station_id = station.get('id')
            
            # Skip if already processed
            if station_id in results:
                found_count += 1
                continue
            
            # Find URL
            url = self.find_wikipedia_url(station_id, station)
            
            if url:
                results[station_id] = url
                found_count += 1
            else:
                results[station_id] = None
                not_found_count += 1
            
            # Save progress every 10 stations
            if i % 10 == 0:
                self._save_results(results, output_file)
                print(f"\n  Progress: {i}/{len(stations)} ({found_count} found, {not_found_count} not found)\n")
            
            # Rate limiting
            time.sleep(delay)
        
        # Final save
        self._save_results(results, output_file)
        
        print("\n" + "="*60)
        print("✨ PROCESSING COMPLETE!")
        print("="*60)
        print(f"📊 Results:")
        print(f"   • Total stations: {len(stations)}")
        print(f"   • URLs found: {found_count} ({found_count/len(stations)*100:.1f}%)")
        print(f"   • Not found: {not_found_count} ({not_found_count/len(stations)*100:.1f}%)")
        print(f"   • Saved to: {output_file}")
        print("="*60 + "\n")
    
    def _save_results(self, results: Dict, output_file: str):
        """Save results to JSON file."""
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)


def main():
    """Main execution function."""
    import os
    import argparse
    
    parser = argparse.ArgumentParser(description='Intelligent Wikipedia URL Finder for Delhi Metro')
    parser.add_argument('--input', default='delhi_metro_stations.json', 
                       help='Input stations JSON file')
    parser.add_argument('--output', default='station_wikipedia_urls.json',
                       help='Output URLs JSON file')
    parser.add_argument('--use-llm', action='store_true',
                       help='Use LLM for intelligent matching')
    parser.add_argument('--llm-api-key', 
                       help='API key for LLM service (or set OPENAI_API_KEY env var)')
    parser.add_argument('--no-resume', action='store_true',
                       help='Start from scratch instead of resuming')
    parser.add_argument('--delay', type=float, default=0.3,
                       help='Delay between requests in seconds')
    
    args = parser.parse_args()
    
    # Get API key from args or environment
    llm_api_key = args.llm_api_key or os.getenv('OPENAI_API_KEY')
    
    # Check if any LLM service is available
    has_groq = os.getenv('GROQ_API_KEY') is not None
    has_ollama = False
    try:
        response = requests.get('http://localhost:11434/api/tags', timeout=2)
        has_ollama = response.status_code == 200
    except:
        pass
    
    if args.use_llm and not (llm_api_key or has_groq or has_ollama):
        print("⚠️  Warning: --use-llm specified but no LLM service available.")
        print("   Options:")
        print("   1. Set GROQ_API_KEY (free): export GROQ_API_KEY='gsk_...'")
        print("   2. Install Ollama (local): brew install ollama && ollama serve")
        print("   3. Set OPENAI_API_KEY (paid): export OPENAI_API_KEY='sk_...'")
        print("   Continuing without LLM support...\n")
        args.use_llm = False
    
    # Create finder
    finder = IntelligentWikiFinder(
        use_llm=args.use_llm,
        llm_api_key=llm_api_key
    )
    
    # Process all stations
    finder.process_all_stations(
        stations_file=args.input,
        output_file=args.output,
        resume=not args.no_resume,
        delay=args.delay
    )


if __name__ == '__main__':
    main()
