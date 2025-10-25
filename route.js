import { stations } from './data.js'
import { MultiStopJourneyPlanner } from './MultiStopJourneyPlanner.js';

const journeyPlanner = new MultiStopJourneyPlanner(stations, 'time');

try {
    const stops = ["supreme_court", "yamuna_bank","krishna_nagar"];
    
    const journey = journeyPlanner.planJourney(stops, {
        includeWaitTime: true,
        waitTimeMinutes: 3
    });
    
    journeyPlanner.printJourney(journey);
    
} catch (error) {
    console.error('Journey planning failed:', error.message);
}