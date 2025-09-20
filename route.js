import { stations } from './data.js'
import { MetroRouteFinder } from './MetroRouteFinder.js';

const routeFinder = new MetroRouteFinder(stations);

try {
    const stops = ["east_azad_nagar", "kashmere_gate", "huda_city_centre"]
    let answer = {totalTimeMinutes:0, totalTimeSeconds: 0, route: [], stationIds: [], lines: []}
    for (let index = 0; index < stops.length - 1; index++) {
        const currStop = stops[index];
        const nextStop = stops[index+1];
        const currTimeSeconds = answer.totalTimeSeconds                
        const result = routeFinder.findShortestRoute(currStop,nextStop,currTimeSeconds)
       
        // Check if route was found
        if (!result) {
            throw new Error(`No route found from ${currStop} to ${nextStop}`);
        }

        const {totalTimeMinutes, totalTimeSeconds, route, stationIds, lines} = result;
        answer.totalTimeMinutes += totalTimeMinutes;
        answer.totalTimeSeconds += totalTimeSeconds;
        
        if (index === 0) {
            answer.route = [...answer.route, ...route];
            answer.stationIds = [...answer.stationIds, ...stationIds];
            answer.lines = [...answer.lines, ...lines];
        } else {
            answer.route = [...answer.route, ...route.slice(1)];
            answer.stationIds = [...answer.stationIds, ...stationIds.slice(1)];
            answer.lines = [...answer.lines, ...lines.slice(1)];
        }
    }
    routeFinder.printRoute(answer);
    routeFinder.printDetailedRoute(answer);
} catch (error) {
    console.error('Error finding route:', error.message);
}