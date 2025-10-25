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

    // Unified method with optimization strategy
    findShortestRoute(sourceId, destinationId, options = {}) {
        const { 
            optimizeBy = 'time', // 'time' | 'interchanges'
            initialInterchanges = 0,
            initialTimeSeconds = 0
        } = options;

        if (!this.stationMap[sourceId] || !this.stationMap[destinationId]) {
            throw new Error('Invalid source or destination station ID');
        }

        const visited = new Map();
        const pq = new PriorityQueue();
        
        this.initializeSource(sourceId, pq, visited, initialTimeSeconds, initialInterchanges, optimizeBy);

        while (pq.size() > 0) {
            const current = pq.top();
            pq.pop();

            const { stationId, line: currentLine, route } = current;
            const currentValue = current.priority1;
            const currentTime = optimizeBy === 'time' ? current.priority1 : current.priority2;
            const currentInterchanges = optimizeBy === 'interchanges' ? current.priority1 : current.priority2;

            // Skip if we've already found a better path to this station
            const stationLineKey = this.makeKey(stationId, currentLine);
            if (visited.has(stationLineKey) && currentValue > visited.get(stationLineKey)) {
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
            this.exploreConnections(station, timeWithDwell, currentLine, route, pq, visited, optimizeBy, currentInterchanges);
        }

        return null; // No route found
    }

    findShortestRouteByTime(sourceId, destinationId, initialTimeSeconds = 0) {
        return this.findShortestRoute(sourceId, destinationId, { 
            optimizeBy: 'time',
            initialTimeSeconds: initialTimeSeconds
        });
    }

    findShortestRouteByInterchange(sourceId, destinationId, initialTimeSeconds = 0, initialInterchanges = 0) {
        return this.findShortestRoute(sourceId, destinationId, { 
            optimizeBy: 'interchanges', 
            initialTimeSeconds: initialTimeSeconds,
            initialInterchanges: initialInterchanges 
        });
    }

    initializeSource(sourceId, pq, visited, initialTimeSeconds, initialInterchanges, optimizeBy) {
        const sourceStation = this.stationMap[sourceId];
        
        sourceStation.lines.forEach(line => {
            const stationLineKey = this.makeKey(sourceId, line.name);
            const initialValue = optimizeBy === 'time' ? initialTimeSeconds : initialInterchanges;
            visited.set(stationLineKey, initialValue);
            
            const initialRoute = [{ 
                stationId: sourceId, 
                line: line.name, 
                isInterchange: false, 
                timeToReachInSeconds: initialTimeSeconds 
            }];

            if (optimizeBy === 'time') {
                pq.push(sourceId, line.name, initialRoute, initialTimeSeconds);
            } else {
                pq.push(sourceId, line.name, initialRoute, initialInterchanges,initialTimeSeconds);
            }
        });
    }

    addDwellTime(currentTime, station, lineName) {
        const line = station.lines.find(l => l.name === lineName);
        const dwellTime = line?.dwell_time_seconds ?? 0;
        return currentTime + dwellTime;
    }

    getInterchangeTime(station, fromLine, toLine) {
        if (fromLine === toLine) {
            return 60;
        }
        if (!station.interchange_info?.walking_time_between_lines) {
            return 0;
        }

        const interchangeData = station.interchange_info.walking_time_between_lines.find(data => 
            (data.from_line === fromLine && data.to_line === toLine)
        );

        return interchangeData?.time_seconds ?? 0;
    }

    exploreConnections(station, currentTime, currentLine, currentRoute, pq, visited, optimizeBy, currentInterchanges) {
        const currentTerminalStationId = currentRoute[currentRoute.length-1]?.terminalStation ?? null
        station.connections.forEach(connection => {
            const { to_station_id: nextStationId, line: nextLine, travel_time_seconds: travelTime, terminal_station_id: nextTerminalStationId } = connection;

            // Calculate interchange penalties
            const hasInterchange = this.shouldCalculateInterchange(currentLine, nextLine, currentTerminalStationId, nextTerminalStationId);
            const interchangeTime = hasInterchange ? this.getInterchangeTime(station, currentLine, nextLine) : 0;
            const totalTime = currentTime + travelTime + interchangeTime;
            const totalInterchanges = currentInterchanges + (hasInterchange ? 1 : 0);

            // Calculate values based on optimization strategy
            let primaryValue, secondaryValue, visitedValue;
            
            if (optimizeBy === 'time') {
                primaryValue = totalTime;
                secondaryValue = totalInterchanges;
                visitedValue = totalTime;
            } else {
                primaryValue = totalInterchanges;
                secondaryValue = totalTime;
                visitedValue = totalInterchanges;
            }

            // Only proceed if this path is better
            if (this.isBetterPath(nextStationId, nextLine, visitedValue, visited)) {
                const stationLineKey = this.makeKey(nextStationId, nextLine);
                visited.set(stationLineKey, visitedValue);
                
                const newRoute = this.buildNewRoute(currentRoute, nextStationId, nextLine, currentLine, hasInterchange, totalTime, nextTerminalStationId);
                
                if (optimizeBy === 'time') {
                    pq.push(nextStationId, nextLine, newRoute, primaryValue);
                } else {
                    pq.push(nextStationId, nextLine, newRoute, primaryValue, secondaryValue);
                }
            }
        });
    }

    shouldCalculateInterchange(currentLine, nextLine, currentTerminalStationId, nextTerminalStationId) {
        return currentLine !== nextLine || (currentLine === nextLine && currentTerminalStationId !== null && nextTerminalStationId !== null && currentTerminalStationId !== nextTerminalStationId);
    }

    isBetterPath(stationId, line, newValue, visited) {
        const stationLineKey = this.makeKey(stationId, line);
        return !visited.has(stationLineKey) || newValue < visited.get(stationLineKey);
    }

    buildNewRoute(currentRoute, nextStationId, nextLine, currentLine, hasInterchange, totalTime, terminalStationId) {
        const newRoute = [...currentRoute];
        const lastStation = newRoute[newRoute.length - 1];
        
        // Mark interchange on the previous station if line change occurs
        if (hasInterchange && newRoute.length > 0) {
            newRoute[newRoute.length - 1] = {
                ...lastStation,
                isInterchange: true,
                terminalStation: terminalStationId,
                interchange_info: { 
                    from_line: currentLine, 
                    to_line: nextLine,
                    terminal_station: terminalStationId
                }
            };
        }else if(newRoute.length > 0){
            newRoute[newRoute.length - 1] = {
                ...lastStation,
                isInterchange: false,
                terminalStation: terminalStationId
            }
        }

        // Add the next station
        newRoute.push({
            stationId: nextStationId,
            line: nextLine,
            isInterchange: false,
            timeToReachInSeconds: totalTime,
            terminalStation: terminalStationId
        });

        return newRoute;
    }

    formatResult(totalTime, route) {
        return {
            totalTimeMinutes: Math.ceil(totalTime / 60),
            totalTimeSeconds: totalTime,
            route: route,
            stationIds: route.map(r => r.stationId),
            lines: route.map(r => r.line),
            totalInterchanges: route.filter(r => r.isInterchange).length
        };
    }

    printRoute(result) {
        if (!result) {
            console.log('❌ No route found');
            return;
        }

        console.log(`⏱️  Total time: ${result.totalTimeMinutes} minutes`);
        console.log(`🔄 Interchanges: ${result.totalInterchanges}`);
        console.log(`🚉 Stations: ${result.stationIds.length}`);
        console.log(`🚇 Route: ${result.stationIds.map(this.formatStationName).join(' → ')}`);
    }

    printDetailedRoute(result) {
        if (!result) {
            console.log('❌ No route found');
            return;
        }

        this.printHeader(result);
        this.printRouteDetails(result);
    }

    printHeader(result) {
        console.log('='.repeat(70));
        console.log('🚇 DELHI METRO ROUTE FINDER');
        console.log('='.repeat(70));
        console.log(`⏱️  Total Journey Time: ${result.totalTimeMinutes} minutes (${result.totalTimeSeconds} seconds)`);
        console.log(`🚉 Total Stations: ${result.route.length}`);
        console.log(`🔄 Interchanges: ${result.totalInterchanges}`);
        console.log(`🚇 Lines Used: ${[...new Set(result.lines)].join(', ').toUpperCase()}`);
        console.log('='.repeat(70));
    }

    printRouteDetails(result) {
        console.log('📍 DETAILED ROUTE:');
        console.log('-'.repeat(70));
        
        result.route.forEach((station, index) => {
            const stationName = this.formatStationName(station.stationId);
            const lineName = station.line.toUpperCase();
            const timeInMinutes = Math.ceil(station.timeToReachInSeconds / 60);
            
            const stationInfo = `${String(index + 1).padStart(2, '0')}. ${stationName}`;
            const lineInfo = `[${lineName} LINE]`;
            const timeInfo = index === 0 ? '[START]' : `[${timeInMinutes} min]`;

            console.log(`${stationInfo.padEnd(35)} ${lineInfo.padEnd(15)} ${timeInfo}`);
            
            if (station.isInterchange) {
                console.log(`    🔄 INTERCHANGE: ${station.interchange_info.from_line.toUpperCase()} → ${station.interchange_info.to_line.toUpperCase()}`);
                if (station.interchange_info.terminal_station) {
                    const terminalStationName = this.formatStationName(station.interchange_info.terminal_station);
                    console.log(`    🧭 DIRECTION: TOWARDS ${terminalStationName}`);
                }
                console.log('    ' + '─'.repeat(50));
            }
            
            if (station.isConnectionPoint) {
                console.log(`    📍 CONNECTION POINT`);
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