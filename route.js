import {stations} from './data.js'
import {PriorityQueue} from './PriorityQueue.js'

const getStationById = stations.reduce((map, station) => {
    map[station.id] = station
    return map
}, {})

const sourceStationId = "east_azad_nagar"
const destinationStationId = "huda_city_centre"

let visited = new Map() 
visited.set(sourceStationId, 0)
let pq = new PriorityQueue()
getStationById[sourceStationId].lines.forEach((line) => {
    const lineColor = line.color
    pq.push(sourceStationId, 0, lineColor, [{stationId: sourceStationId, line:lineColor}])    
})

while(pq.size() > 0){
    const currStation = getStationById[pq.top().stationId]
    let currTime = pq.top().priority 
    const currLine = pq.top().line
    let currRoute = pq.top().route
    pq.pop()    
    if(currStation.id == destinationStationId){
        console.log(`Total time that will be taken = ${currTime/60} minutes`);
        console.log(`Route: ${currRoute.map(data => data.stationId)}`);
        console.log(`Line: ${currRoute.map(data => data.line)}`);
        
        break
    }
    currTime += currStation.lines.filter((line) => line.color == currLine)[0].dwell_time_seconds
    for (let index = 0; index < currStation.connections.length; index++) {
        const connection = currStation.connections[index];
        const nextStationId = connection.to_station_id
        const nextLineColor = connection.line_color
        const travelTimeSeconds = connection.travel_time_seconds 
        let addedTime = 0          
        if(nextStationId != destinationStationId && currLine != nextLineColor){    
            addedTime += currStation.interchange_info.walking_time_between_lines.filter((data) => (
                    (data.from_line == currLine && data.to_line == nextLineColor) || 
                    (data.from_line == nextLineColor && data.to_line == currLine))
                )[0].time_seconds
        }
        if(!visited.has(nextStationId) || currTime + travelTimeSeconds + addedTime < visited.get(nextStationId)){
            visited.set(nextStationId , currTime + travelTimeSeconds + addedTime)
            const newRoute = Array.from(currRoute)
            newRoute.push({stationId: nextStationId, line: nextLineColor})
            pq.push(nextStationId, currTime + travelTimeSeconds + addedTime, nextLineColor, newRoute)
        }
    }
}

