import { PriorityQueue } from "./PriorityQueue.js";

export class MetroRouteFinder {
    constructor(stations) {
        this.stationMap = this.buildStationMap(stations);
    }

    buildStationMap(stations) {
        return stations.reduce((map, station) => {
            map[station.id] = station;
            return map;
        }, {});
    }

    makeKey(stationId, line) {
        return `${stationId}:${line}`;
    }

    findShortestRoute(sourceId, destinationId, initialTimeSeconds) {
        if (!this.stationMap[sourceId] || !this.stationMap[destinationId]) {
            throw new Error('Invalid source or destination station ID');
        }

        const visited = new Map();
        const pq = new PriorityQueue();
        
        this.initializeSource(sourceId, pq, visited, initialTimeSeconds);

        while (pq.size() > 0) {
            const { stationId, priority: currentTime, line: currentLine, route } = pq.top();
            pq.pop();

            // Skip if we've already found a better path to this station
            const stationLineKey = this.makeKey(stationId, currentLine)
            if (visited.has(stationLineKey) && currentTime > visited.get(stationLineKey)) {
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
            this.exploreConnections(station, timeWithDwell, currentLine, route, pq, visited);
        }

        return null; // No route found
    }

    initializeSource(sourceId, pq, visited, initialTimeSeconds) {
        const sourceStation = this.stationMap[sourceId];
        
        sourceStation.lines.forEach(line => {
            const stationLineKey = this.makeKey(sourceId, line.name)
            visited.set(stationLineKey, initialTimeSeconds);
            const initialRoute = [{ stationId: sourceId, line: line.name, isInterchange: false, timeToReachInSeconds: initialTimeSeconds }];
            pq.push(sourceId, initialTimeSeconds, line.name, initialRoute);
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

    exploreConnections(station, currentTime, currentLine, currentRoute, pq, visited) {
        station.connections.forEach(connection => {
            const { to_station_id: nextStationId, line: nextLine, travel_time_seconds: travelTime } = connection;

            // Calculate interchange time if needed
            const interchangeTime = this.shouldCalculateInterchange(currentLine, nextLine)
                ? this.getInterchangeTime(station, currentLine, nextLine)
                : 0;

            const totalTime = currentTime + travelTime + interchangeTime;

            // Only proceed if this path is better
            if (this.isBetterPath(nextStationId, nextLine, totalTime, visited)) {
                const stationLineKey = this.makeKey(nextStationId,nextLine)
                visited.set(stationLineKey, totalTime);
                
                const newRoute = this.buildNewRoute(currentRoute, nextStationId, nextLine, currentLine, interchangeTime > 0, totalTime);
                pq.push(nextStationId, totalTime, nextLine, newRoute);
            }
        });
    }

    shouldCalculateInterchange(currentLine, nextLine) {
        return currentLine !== nextLine;
    }

    isBetterPath(stationId, line, newTime, visited) {
        const stationLineKey = this.makeKey(stationId, line)
        return !visited.has(stationLineKey) || newTime < visited.get(stationLineKey);
    }

    buildNewRoute(currentRoute, nextStationId, nextLine, currentLine, hasInterchange, totalTime) {
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
            isInterchange: false,
            timeToReachInSeconds: totalTime
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
    }

    printDetailedRoute(result) {
        if (!result) {
            console.log('No route found');
            return;
        }

        console.log('='.repeat(60));
        console.log('🚇 DELHI METRO ROUTE FINDER');
        console.log('='.repeat(60));
        console.log(`⏱️  Total Journey Time: ${result.totalTimeMinutes} minutes (${result.totalTimeSeconds} seconds)`);
        console.log(`🚉 Total Stations: ${result.route.length}`);
        console.log(`🔄 Interchanges: ${result.route.filter(station => station.isInterchange).length}`);
        console.log('='.repeat(60));
        
        // Print detailed route
        console.log('📍 DETAILED ROUTE:');
        console.log('-'.repeat(60));
        
        result.route.forEach((station, index) => {
            const stationName = this.formatStationName(station.stationId);
            const lineName = station.line.toUpperCase();
            const timeInMinutes = Math.ceil(station.timeToReachInSeconds / 60);
            
            let stationInfo = `${String(index + 1).padStart(2, '0')}. ${stationName}`;
            let lineInfo = `[${lineName} LINE]`;
            let timeInfo = index === 0 ? '[START]' : `[${timeInMinutes} min]`;

            console.log(`${stationInfo.padEnd(35)} ${lineInfo.padEnd(15)} ${timeInfo}`);
            if (station.isInterchange) {
                console.log(`    🔄 INTERCHANGE: ${station.interchange_info.from_line.toUpperCase()} → ${station.interchange_info.to_line.toUpperCase()}`);
                console.log('    ' + '─'.repeat(50));
            }
        });
    }

    formatStationName(stationId) {
        return stationId
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}