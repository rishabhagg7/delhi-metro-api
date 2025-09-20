import { stations } from './data.js'
import { PriorityQueue } from './PriorityQueue.js'

class MetroRouteFinder {
    constructor(stations) {
        this.stationMap = this.buildStationMap(stations);
    }

    buildStationMap(stations) {
        return stations.reduce((map, station) => {
            map[station.id] = station;
            return map;
        }, {});
    }

    findShortestRoute(sourceId, destinationId) {
        // Validate input
        if (!this.stationMap[sourceId] || !this.stationMap[destinationId]) {
            throw new Error('Invalid source or destination station ID');
        }

        const visited = new Map();
        const pq = new PriorityQueue();
        
        // Initialize source station
        this.initializeSource(sourceId, pq, visited);

        while (pq.size() > 0) {
            const current = pq.pop();
            const { stationId, priority: currentTime, line: currentLine, route } = current;

            // Skip if we've already found a better path to this station
            if (visited.has(stationId) && currentTime > visited.get(stationId)) {
                continue;
            }

            // Check if we've reached the destination
            if (stationId === destinationId) {
                return this.formatResult(currentTime, route);
            }

            // Process current station
            const station = this.stationMap[stationId];
            const timeWithDwell = this.addDwellTime(currentTime, station, currentLine);
            
            // Explore connections
            this.exploreConnections(station, timeWithDwell, currentLine, route, pq, visited, destinationId);
        }

        return null; // No route found
    }

    initializeSource(sourceId, pq, visited) {
        visited.set(sourceId, 0);
        const sourceStation = this.stationMap[sourceId];
        
        sourceStation.lines.forEach(line => {
            const initialRoute = [{ stationId: sourceId, line: line.name, isInterchange: false }];
            pq.push(sourceId, 0, line.name, initialRoute);
        });
    }

    addDwellTime(currentTime, station, lineName) {
        const line = station.lines.find(l => l.name === lineName);
        const dwellTime = line ? line.dwell_time_seconds : 0;
        return currentTime + dwellTime;
    }

    getInterchangeTime(station, fromLine, toLine) {
        if (fromLine === toLine || !station.interchange_info?.walking_time_between_lines) {
            return 0;
        }

        const interchangeData = station.interchange_info.walking_time_between_lines.find(data => 
            (data.from_line === fromLine && data.to_line === toLine) ||
            (data.from_line === toLine && data.to_line === fromLine)
        );

        return interchangeData ? interchangeData.time_seconds : 0;
    }

    exploreConnections(station, currentTime, currentLine, currentRoute, pq, visited, destinationId) {
        station.connections.forEach(connection => {
            const { to_station_id: nextStationId, line: nextLine, travel_time_seconds: travelTime } = connection;

            // Calculate interchange time if needed
            const interchangeTime = this.shouldCalculateInterchange(nextStationId, destinationId, currentLine, nextLine)
                ? this.getInterchangeTime(station, currentLine, nextLine)
                : 0;

            const totalTime = currentTime + travelTime + interchangeTime;

            // Only proceed if this path is better
            if (this.isBetterPath(nextStationId, totalTime, visited)) {
                visited.set(nextStationId, totalTime);
                
                const newRoute = this.buildNewRoute(currentRoute, nextStationId, nextLine, currentLine, interchangeTime > 0);
                pq.push(nextStationId, totalTime, nextLine, newRoute);
            }
        });
    }

    shouldCalculateInterchange(nextStationId, destinationId, currentLine, nextLine) {
        return nextStationId !== destinationId && currentLine !== nextLine;
    }

    isBetterPath(stationId, newTime, visited) {
        return !visited.has(stationId) || newTime < visited.get(stationId);
    }

    buildNewRoute(currentRoute, nextStationId, nextLine, currentLine, hasInterchange) {
        const newRoute = [...currentRoute];
        
        // Mark interchange on the previous station if line change occurs
        if (hasInterchange && newRoute.length > 0) {
            const lastStation = newRoute[newRoute.length - 1];
            newRoute[newRoute.length - 1] = {
                ...lastStation,
                isInterchange: true,
                interchange_info: { from_line: currentLine, to_line: nextLine }
            };
        }

        // Add the next station
        newRoute.push({
            stationId: nextStationId,
            line: nextLine,
            isInterchange: false
        });

        return newRoute;
    }

    formatResult(totalTime, route) {
        return {
            totalTimeMinutes: Math.ceil(totalTime / 60),
            totalTimeSeconds: totalTime,
            route: route,
            stationIds: route.map(r => r.stationId),
            lines: route.map(r => r.line)
        };
    }

    printRoute(result) {
        if (!result) {
            console.log('No route found');
            return;
        }

        console.log(`Total time: ${result.totalTimeMinutes} minutes`);
        console.log('Route:');
        console.log(result.route);
        
        // Print detailed route
        console.log('\nDetailed Route:');
        result.route.forEach((station, index) => {
            const stationName = station.stationId.replace(/_/g, ' ').toUpperCase();
            const lineName = station.line.toUpperCase();
            
            if (station.isInterchange) {
                console.log(`${index + 1}. ${stationName} (${lineName}) - INTERCHANGE: ${station.interchange_info.from_line} → ${station.interchange_info.to_line}`);
            } else {
                console.log(`${index + 1}. ${stationName} (${lineName})`);
            }
        });
    }
}

// Usage
const routeFinder = new MetroRouteFinder(stations);

try {
    const result = routeFinder.findShortestRoute("welcome", "huda_city_centre");
    routeFinder.printRoute(result);
} catch (error) {
    console.error('Error finding route:', error.message);
}

// Export for use in other modules
export { MetroRouteFinder };