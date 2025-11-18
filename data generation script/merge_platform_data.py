import json

# Load the data files
with open('delhi_metro_stations.json') as f:
    stations = json.load(f)

with open('platform_data.json') as f:
    platform_data = json.load(f)

print(f"Loaded {len(stations)} stations and {len(platform_data)} stations with platform data")

# Create a merged structure
merged_stations = []

for station in stations:
    station_id = station['id']
    
    # Start with the base station data
    merged_station = {
        'id': station_id,
        'name': station['name'],
        'coordinates': station.get('coordinates', {}),
        'lines': station.get('lines', []),
        'connections': []
    }
    
    # Get platform data for this station
    platforms = platform_data.get(station_id, {})
    
    # Create a mapping: (terminal, next_station) -> (platform_number, bound)
    platform_map = {}
    for platform_num, platform_info in platforms.items():
        terminal = platform_info.get('terminal')
        next_station = platform_info.get('next_station')
        bound = platform_info.get('bound')
        
        if terminal and next_station:
            key = (terminal, next_station)
            platform_map[key] = {
                'platform_number': platform_num,
                'direction': bound.capitalize() if bound else None
            }
    
    # Update connections with platform info
    for conn in station.get('connections', []):
        terminal = conn['terminal_station_id']
        to_station = conn['to_station_id']
        
        # Look up platform info
        key = (terminal, to_station)
        platform_info = platform_map.get(key, {})
        
        # Create updated connection
        updated_conn = {
            'to_station_id': conn['to_station_id'],
            'line': conn['line'],
            'travel_time_seconds': conn.get('travel_time_seconds', 120),
            'terminal_station_id': conn['terminal_station_id'],
            'platform_number': platform_info.get('platform_number'),
            'direction': platform_info.get('direction')
        }
        
        merged_station['connections'].append(updated_conn)
    
    # Add interchange info if it's an interchange station
    if station.get('interchange_info'):
        interchange_info = station['interchange_info'].copy()
        
        # Enhance walking_time_between_lines with platform information
        if 'walking_time_between_lines' in interchange_info:
            enhanced_walking_times = []
            
            for walking_time in interchange_info['walking_time_between_lines']:
                from_line = walking_time['from_line']
                to_line = walking_time['to_line']
                
                # Find connections for the from_line to get from_platform info
                from_line_connections = [c for c in merged_station['connections'] if c['line'] == from_line]
                
                # For each from_line connection (each direction on that line)
                for from_conn in from_line_connections:
                    enhanced_entry = {
                        'from_line': from_line,
                        'to_line': to_line,
                        'time_seconds': walking_time['time_seconds'],
                        'from_platform': from_conn.get('platform_number'),
                        'from_direction': from_conn.get('direction'),
                        'direction_options': []
                    }
                    
                    # Add to_platform and to_direction for each direction option
                    for option in walking_time.get('direction_options', []):
                        to_station_id = option['to_station_id']
                        terminal_id = option['terminal_station_id']
                        
                        # Find the connection that matches this to_line and direction
                        to_conn = next((c for c in merged_station['connections'] 
                                       if c['line'] == to_line 
                                       and c['to_station_id'] == to_station_id
                                       and c['terminal_station_id'] == terminal_id), None)
                        
                        enhanced_option = {
                            'to_station_id': to_station_id,
                            'terminal_station_id': terminal_id,
                            'to_platform': to_conn.get('platform_number') if to_conn else None,
                            'to_direction': to_conn.get('direction') if to_conn else None
                        }
                        
                        enhanced_entry['direction_options'].append(enhanced_option)
                    
                    enhanced_walking_times.append(enhanced_entry)
            
            interchange_info['walking_time_between_lines'] = enhanced_walking_times
        
        merged_station['interchange_info'] = interchange_info
    
    merged_stations.append(merged_station)

# Save the merged data
output_file = 'delhi_metro_complete.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(merged_stations, f, indent=2, ensure_ascii=False)

print(f"\n✅ Merged data saved to {output_file}")
print(f"Total stations: {len(merged_stations)}")

# Count how many connections have platform numbers
total_connections = sum(len(s['connections']) for s in merged_stations)
connections_with_platform = sum(
    1 for s in merged_stations 
    for c in s['connections'] 
    if c.get('platform_number')
)

print(f"Total connections: {total_connections}")
print(f"Connections with platform numbers: {connections_with_platform} ({connections_with_platform*100/total_connections:.1f}%)")
