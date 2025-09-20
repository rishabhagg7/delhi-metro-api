import { stations } from './data.js'
import { MetroRouteFinder } from './MetroRouteFinder.js';

const routeFinder = new MetroRouteFinder(stations);

try {
    const result = routeFinder.findShortestRoute("east_azad_nagar", "shalimar_bagh");
    routeFinder.printRoute(result);
    routeFinder.printDetailedRoute(result);
} catch (error) {
    console.error('Error finding route:', error.message);
}