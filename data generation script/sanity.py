import json

# Load the generated JSON
with open("delhi_metro_stations.json", "r", encoding="utf-8") as f:
    stations = json.load(f)

errors = []

for station in stations:
    sid = station.get("id", "<missing id>")
    name = station.get("name", "<missing name>")

    # Check required top-level fields
    if not station.get("id"):
        errors.append(f"{name}: Missing station id")
    if not station.get("name"):
        errors.append(f"{sid}: Missing station name")

    coords = station.get("coordinates", {})
    if "latitude" not in coords or "longitude" not in coords:
        errors.append(f"{sid}: Missing coordinates")

    # Check lines array
    lines = station.get("lines", [])
    if not lines:
        errors.append(f"{sid}: No lines listed")
    else:
        for line in lines:
            if "name" not in line:
                errors.append(f"{sid}: Line missing name")
            if "dwell_time_seconds" not in line:
                errors.append(f"{sid}: Line {line.get('name')} missing dwell_time_seconds")

    # Check connections array
    connections = station.get("connections", [])
    for conn in connections:
        if "to_station_id" not in conn:
            errors.append(f"{sid}: Connection missing to_station_id")
        if "line" not in conn:
            errors.append(f"{sid}: Connection missing line")
        if "travel_time_seconds" not in conn:
            errors.append(f"{sid}: Connection missing travel_time_seconds")
        if "terminal_station_id" not in conn:
            errors.append(f"{sid}: Connection missing terminal_station_id")

    # Check interchange info
    interchange = station.get("interchange_info", {})
    if "is_interchange" not in interchange:
        errors.append(f"{sid}: Missing is_interchange flag")
    if interchange.get("is_interchange") and not interchange.get("walking_time_between_lines"):
        errors.append(f"{sid}: Interchange missing walking_time_between_lines")

# Print results
if errors:
    print("Validation errors found:")
    for e in errors:
        print(" -", e)
else:
    print("All stations validated successfully. No missing data detected.")
