import { stations } from './data.js'
import { MultiStopJourneyPlanner } from './MultiStopJourneyPlanner.js';

const journeyPlanner = new MultiStopJourneyPlanner(stations);

try {
    const stops = ["east_azad_nagar", "rithala", "huda_city_centre"];
    
    const journey = journeyPlanner.planJourney(stops, {
        includeWaitTime: true,
        waitTimeMinutes: 3
    });
    
    journeyPlanner.printJourney(journey);
    
} catch (error) {
    console.error('Journey planning failed:', error.message);
}