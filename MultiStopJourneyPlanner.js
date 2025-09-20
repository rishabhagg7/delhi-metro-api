import { MetroRouteFinder } from './MetroRouteFinder.js';

export class MultiStopJourneyPlanner {
    constructor(stations) {
        this.routeFinder = new MetroRouteFinder(stations);
    }

    planJourney(stops, options = {}) {
        this.validateStops(stops);
        
        const {
            includeWaitTime = true,
            waitTimeMinutes = 2, 
        } = options;

        let totalJourney = {
            totalTimeMinutes: 0,
            totalTimeSeconds: 0,
            route: [],
            stationIds: [],
            lines: []
        };

        try {
            for (let i = 0; i < stops.length - 1; i++) {
                const segment = this.planSegment(
                    stops[i], 
                    stops[i + 1], 
                    totalJourney.totalTimeSeconds,
                    i,
                    includeWaitTime ? waitTimeMinutes * 60 : 0
                );

                if (!segment) {
                    throw new Error(`No route found from ${stops[i]} to ${stops[i + 1]}`);
                }

                this.mergeSegment(totalJourney, segment, i === 0);
            }
            return totalJourney;

        } catch (error) {
            console.error(`❌ Journey planning failed: ${error.message}`);
            throw error;
        }
    }

    planSegment(fromStop, toStop, currentTime, segmentIndex, waitTime) {        
        const startTime = segmentIndex === 0 ? currentTime : currentTime + waitTime;
        
        const result = this.routeFinder.findShortestRoute(fromStop, toStop, startTime);
        
        if (result) {
            result.segmentInfo = {
                segmentNumber: segmentIndex + 1,
                from: fromStop,
                to: toStop,
                startTime: startTime
            };
        }
        
        return result;
    }

    mergeSegment(totalJourney, segment, isFirstSegment) {
        const { totalTimeMinutes, totalTimeSeconds, route, stationIds, lines, segmentInfo } = segment;
    
        totalJourney.totalTimeMinutes += totalTimeMinutes;
        totalJourney.totalTimeSeconds += totalTimeSeconds;
        
        if (isFirstSegment) {
            totalJourney.route = [...route];
            totalJourney.stationIds = [...stationIds];
            totalJourney.lines = [...lines];
        } else {
            const lastStation = totalJourney.route[totalJourney.route.length - 1];
            totalJourney.route[totalJourney.route.length - 1] = {
                ...lastStation,
                isConnectionPoint: true
            };        
            const routeToAdd = route.slice(1);
            const stationIdsToAdd = stationIds.slice(1);
            const linesToAdd = lines.slice(1);
            const firstStationOfNewSegment = route[0];
            
            if (lastStation.line !== firstStationOfNewSegment.line) {
                totalJourney.route[totalJourney.route.length - 1] = {
                    ...lastStation,
                    isConnectionPoint: true,
                    isInterchange: true,
                    interchange_info: {
                        from_line: lastStation.line,
                        to_line: firstStationOfNewSegment.line
                    }
                };
            }
            
            totalJourney.route = [...totalJourney.route, ...routeToAdd];
            totalJourney.stationIds = [...totalJourney.stationIds, ...stationIdsToAdd];
            totalJourney.lines = [...totalJourney.lines, ...linesToAdd];
        }
    }

    validateStops(stops) {
        if (!Array.isArray(stops) || stops.length < 2) {
            throw new Error('At least 2 stops are required for journey planning');
        }

        for (let i = 1; i < stops.length; i++) {
            if (stops[i] === stops[i - 1]) {
                throw new Error(`Duplicate consecutive stops found: ${stops[i]}`);
            }
        }

        const invalidStations = stops.filter(stop => !this.routeFinder.stationMap[stop]);
        if (invalidStations.length > 0) {
            throw new Error(`Invalid stations: ${invalidStations.join(', ')}`);
        }
    }

    printJourney(journey) {
        if (!journey) {
            console.log('No journey found');
            return;
        }
        
        console.log(journey);
    
        console.log('\n' + '='.repeat(70));
        console.log('🚇 MULTI-STOP DELHI METRO JOURNEY');
        console.log('='.repeat(70));
        
        // Journey Summary
        console.log(`📊 JOURNEY SUMMARY:`);
        console.log(`   Total Time: ${journey.totalTimeMinutes} minutes (${journey.totalTimeSeconds} seconds)`);
        console.log(`   Total Stations: ${journey.route.length}`);
        
        // Detailed route
        this.routeFinder.printDetailedRoute(journey);
    }

    formatStationName(stationId) {
        return stationId
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}