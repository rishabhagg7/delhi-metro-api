#!/usr/bin/env python3
"""
Analyze platforms where terminal is present but next_station is null.
Determine if these are penultimate stations (where next IS the terminal).
"""

import json
from collections import defaultdict

def load_gtfs_data():
    """Load and parse GTFS data files."""
    # Load stops.txt - map stop_id (numeric) to stop_name
    stops_map = {}  # numeric_id -> station_name
    with open('stops.txt', 'r') as f:
        lines = f.readlines()
    for line in lines[1:]:  # Skip header
        parts = line.strip().split(',')
        if len(parts) >= 3:
            stop_id = parts[0].strip()
            stop_name = parts[2].strip()
            stops_map[stop_id] = stop_name
    
    # Load stop_times.txt - get station sequences per trip
    trips = defaultdict(list)
    with open('stop_times.txt', 'r') as f:
        lines = f.readlines()
    for line in lines[1:]:  # Skip header
        parts = line.strip().split(',')
        if len(parts) >= 5:
            trip_id = parts[0].strip()
            stop_id = parts[3].strip()
            stop_sequence = int(parts[4].strip()) if parts[4].strip().isdigit() else 0
            trips[trip_id].append((stop_sequence, stop_id))
    
    # Sort each trip by sequence
    for trip_id in trips:
        trips[trip_id].sort()
    
    return stops_map, trips

def create_name_to_id_map(stations):
    """Create mapping from stop names to station IDs."""
    name_map = {}
    for station in stations:
        # Normalize name for matching
        name = station['name'].lower().strip()
        # Try multiple variations
        variations = [
            name,
            name.replace('-', ' '),
            name.replace('  ', ' '),
            name.replace('(', '').replace(')', ''),
        ]
        for var in variations:
            if var not in name_map:
                name_map[var] = []
            name_map[var].append(station['id'])
    return name_map

def find_next_station_in_route(current_name, terminal_name, trips, stops_map):
    """
    Find the next station after current_name toward terminal_name.
    Returns (next_station_name, is_penultimate, distance_to_terminal)
    """
    current_norm = current_name.lower().strip()
    terminal_norm = terminal_name.lower().strip()
    
    # Find trips containing both stations
    for trip_id, stops in trips.items():
        stop_ids = [s[1] for s in stops]
        stop_names = [stops_map.get(sid, '').lower().strip() for sid in stop_ids]
        
        # Try to find current and terminal in this trip
        current_indices = [i for i, name in enumerate(stop_names) if current_norm in name or name in current_norm]
        terminal_indices = [i for i, name in enumerate(stop_names) if terminal_norm in name or name in terminal_norm]
        
        if current_indices and terminal_indices:
            # Use first match
            current_idx = current_indices[0]
            terminal_idx = terminal_indices[0]
            
            # Check if terminal is after current (same direction)
            if terminal_idx > current_idx:
                # Get next station
                if current_idx + 1 < len(stop_ids):
                    next_stop_id = stop_ids[current_idx + 1]
                    next_name = stops_map.get(next_stop_id, 'Unknown')
                    
                    is_penultimate = (current_idx + 1 == terminal_idx)
                    distance = terminal_idx - current_idx
                    
                    return next_name, is_penultimate, distance
    
    return None, False, None

def main():
    print("🔍 Analyzing platforms with terminal but no next_station\n")
    
    # Load data
    with open('platform_data.json', 'r') as f:
        platform_data = json.load(f)
    
    with open('delhi_metro_stations.json', 'r') as f:
        stations = json.load(f)
    
    stations_by_id = {s['id']: s for s in stations}
    name_to_id = create_name_to_id_map(stations)
    
    # Load GTFS data
    print("Loading GTFS data...")
    stops_map, trips = load_gtfs_data()
    print(f"  Loaded {len(stops_map)} stops and {len(trips)} trips\n")
    
    # Find missing next_stations
    missing_next = []
    for station_id, platforms in platform_data.items():
        for platform_num, platform_info in platforms.items():
            terminal = platform_info.get('terminal')
            next_station = platform_info.get('next_station')
            
            if terminal and not next_station:
                station_name = stations_by_id.get(station_id, {}).get('name', station_id)
                terminal_name = stations_by_id.get(terminal, {}).get('name', terminal)
                
                # Try to find next station in route
                next_name, is_penultimate, distance = find_next_station_in_route(
                    station_name, terminal_name, trips, stops_map
                )
                
                missing_next.append({
                    'station_id': station_id,
                    'station_name': station_name,
                    'platform': platform_num,
                    'terminal_id': terminal,
                    'terminal_name': terminal_name,
                    'bound': platform_info.get('bound'),
                    'source': platform_info.get('source'),
                    'next_in_route': next_name,
                    'is_penultimate': is_penultimate,
                    'distance_to_terminal': distance
                })
    
    # Summary
    print(f"📊 Found {len(missing_next)} platforms with missing next_station\n")
    
    penultimate = [m for m in missing_next if m['is_penultimate']]
    not_penultimate = [m for m in missing_next if m['distance_to_terminal'] and not m['is_penultimate']]
    no_route_found = [m for m in missing_next if m['distance_to_terminal'] is None]
    
    print(f"   ✅ Penultimate (next IS terminal): {len(penultimate)}")
    print(f"   ⚠️  NOT penultimate (terminal {'>'}1 stop away): {len(not_penultimate)}")
    print(f"   ❓ No route data found: {len(no_route_found)}\n")
    
    # Show penultimate stations
    if penultimate:
        print("="*80)
        print("✅ PENULTIMATE STATIONS (next station IS the terminal)")
        print("="*80)
        for item in penultimate:
            print(f"\n🚉 {item['station_name']} - Platform {item['platform']}")
            print(f"   → Terminal: {item['terminal_name']}")
            print(f"   Next station: {item['next_in_route']} (IS the terminal)")
            print(f"   This is CORRECT - no next_station needed (or next = terminal)")
    
    # Show NOT penultimate (these need fixing)
    if not_penultimate:
        print("\n" + "="*80)
        print("⚠️  NOT PENULTIMATE (missing intermediate next_station)")
        print("="*80)
        for item in not_penultimate[:10]:  # Show first 10
            print(f"\n🚉 {item['station_name']} - Platform {item['platform']}")
            print(f"   → Terminal: {item['terminal_name']} ({item['distance_to_terminal']} stops away)")
            print(f"   ❌ MISSING: next_station should be: {item['next_in_route']}")
            print(f"   Source: {item['source']}")
        
        if len(not_penultimate) > 10:
            print(f"\n   ... and {len(not_penultimate) - 10} more")
    
    # Save detailed results
    with open('missing_next_station_analysis.json', 'w') as f:
        json.dump({
            'summary': {
                'total': len(missing_next),
                'penultimate': len(penultimate),
                'not_penultimate': len(not_penultimate),
                'no_route_found': len(no_route_found)
            },
            'penultimate_stations': penultimate,
            'not_penultimate_stations': not_penultimate,
            'no_route_found': no_route_found
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n\n💾 Detailed analysis saved to: missing_next_station_analysis.json")

if __name__ == '__main__':
    main()
