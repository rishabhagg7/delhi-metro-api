import csv
import json
from collections import defaultdict

# Default timing rules
DEFAULT_DWELL = 45
DWELL_OVERRIDES = {
    'yellow': 45,
    'red': 45
}
DEFAULT_TRAVEL = 120
DEFAULT_WALK = 180

# Load stop metadata
stops = {}
with open('stops.txt', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        sid = row['stop_id']
        machine_id = row['stop_name'].strip().lower().replace(' ', '_')
        stops[sid] = {
            'id': machine_id,
            'name': row['stop_name'],
            'coordinates': {
                'latitude': float(row['stop_lat']),
                'longitude': float(row['stop_lon'])
            },
            'lines': set(),
            'connections': set()
        }

# Load route colors with fallback to route_long_name
route_color = {}
with open('routes.txt', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        rid = row['route_id']
        col = row['route_color'].strip().lower()
        if not col and row['route_long_name']:
            col = row['route_long_name'].split('_', 1)[0].strip().lower()
        if col in ('grey',):
            col = 'gray'
        route_color[rid] = col or None

# Map trip_id to route_id
trip_to_route = {}
with open('trips.txt', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        trip_to_route[row['trip_id']] = row['route_id']

# Build stop sequences per trip
trip_stops = defaultdict(list)
with open('stop_times.txt', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        seq = int(row['stop_sequence'])
        trip_stops[row['trip_id']].append((seq, row['stop_id']))

# Process each trip: assign lines and connections
for trip_id, seq_list in trip_stops.items():
    route_id = trip_to_route.get(trip_id)
    color = route_color.get(route_id)
    if not color:
        continue
    ordered = [sid for _, sid in sorted(seq_list)]
    for idx, sid in enumerate(ordered):
        stops[sid]['lines'].add(color)
        for neighbor_idx in (idx - 1, idx + 1):
            if 0 <= neighbor_idx < len(ordered):
                nbr_sid = ordered[neighbor_idx]
                stops[sid]['connections'].add((nbr_sid, color, DEFAULT_TRAVEL))

# Assemble final JSON array
output = []
for sid, data in stops.items():
    line_colors = sorted(data['lines'])
    is_interchange = len(line_colors) > 1

    # Build lines list
    lines_list = []
    for clr in line_colors:
        dwell = DWELL_OVERRIDES.get(clr, DEFAULT_DWELL)
        lines_list.append({
            'name': clr,
            'dwell_time_seconds': dwell
        })

    # Build connections list
    conn_list = []
    for nbr_id, clr, travel_time in sorted(data['connections']):
        conn_list.append({
            'to_station_id': stops[nbr_id]['id'],
            'line': clr,
            'travel_time_seconds': travel_time
        })

    # Build walking times
    walks = []
    for i in range(len(line_colors)):
        for j in range(i + 1, len(line_colors)):
            walks.append({
                'from_line': line_colors[i],
                'to_line': line_colors[j],
                'time_seconds': DEFAULT_WALK
            })

    station_obj = {
        'id': data['id'],
        'name': data['name'],
        'coordinates': data['coordinates'],
        'lines': lines_list,
        'connections': conn_list,
        'interchange_info': {
            'is_interchange': is_interchange,
            'interchange_lines': line_colors,
            'walking_time_between_lines': walks
        }
    }
    output.append(station_obj)

# Write to JSON file
with open('delhi_metro_stations.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(output)} stations to delhi_metro_stations.json")
