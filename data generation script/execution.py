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
        best_terminal = None
        longest_trip_len = 0
        for tid, seq in trip_stops.items():
            rid = trip_to_route.get(tid)
            trip_color = route_color.get(rid)
            if trip_color != clr:
                continue
            stop_ids = [s for _, s in sorted(seq)]
            if sid in stop_ids and nbr_id in stop_ids:
                sid_idx = stop_ids.index(sid)
                nbr_idx = stop_ids.index(nbr_id)
                trip_len = len(stop_ids)
                if trip_len > longest_trip_len:
                    longest_trip_len = trip_len
                    terminal_id = stop_ids[-1] if sid_idx < nbr_idx else stop_ids[0]
                    best_terminal = stops[terminal_id]['id']
        conn_obj = {
            'to_station_id': stops[nbr_id]['id'],
            'line': clr,
            'travel_time_seconds': travel_time
        }
        if best_terminal:
            conn_obj['terminal_station_id'] = best_terminal
        conn_list.append(conn_obj)

    # Build walking times
    walks = []
    if is_interchange:
        for from_line in line_colors:
            for to_line in line_colors:
                if from_line == to_line:
                    continue

                # Find adjacent stations for each line
                from_neighbors = [
                    nbr_id for nbr_id, clr, _ in data['connections']
                    if clr == to_line
                ]

                direction_options = []
                for nbr in from_neighbors:
                    best_terminal = None
                    longest_trip_len = 0
                    for tid, seq in trip_stops.items():
                        rid = trip_to_route.get(tid)
                        clr = route_color.get(rid)
                        if clr != to_line:
                            continue
                        stop_ids = [s for _, s in sorted(seq)]
                        if sid in stop_ids and nbr in stop_ids:
                            sid_idx = stop_ids.index(sid)
                            nbr_idx = stop_ids.index(nbr)
                            trip_len = len(stop_ids)
                            if trip_len > longest_trip_len:
                                longest_trip_len = trip_len
                                if sid_idx < nbr_idx:
                                    terminal_id = stop_ids[-1]
                                else:
                                    terminal_id = stop_ids[0]
                                best_terminal = stops[terminal_id]['id']
                    if best_terminal:
                        direction_options.append({
                            'to_station_id': stops[nbr]['id'],
                            'terminal_station_id': best_terminal
                        })

                walks.append({
                    'from_line': from_line,
                    'to_line': to_line,
                    'time_seconds': DEFAULT_WALK,
                    'direction_options': direction_options
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
