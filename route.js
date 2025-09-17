import {stations} from './data.js'
import {PriorityQueue} from './PriorityQueue.js'

const getStationById = stations.reduce((map, station) => {
    map[station.id] = station
    return map
}, {})

const sourceStationId = "east_azad_nagar"
const destinationStationId = "shalimar_bagh"

let visited = new Map() 
visited.set(sourceStationId, 0)
let pq = new PriorityQueue()
getStationById[sourceStationId].lines.forEach((line) => {
    pq.push(sourceStationId, 0, line.name,[{stationId: sourceStationId, line:line.name, isInterchange: false}])    
})

while(pq.size() > 0){
    const currStation = getStationById[pq.top().stationId]
    let currTime = pq.top().priority 
    const currLineName = pq.top().line
    let currRoute = pq.top().route
    pq.pop()    
    if(currStation.id == destinationStationId){
        console.log(`Total time that will be taken = ${Math.ceil(currTime/60)} minutes`);
        console.log(currRoute);
        break
    }
    currTime += currStation.lines.filter((line) => line.name == currLineName)[0].dwell_time_seconds
    for (let index = 0; index < currStation.connections.length; index++) {
        const connection = currStation.connections[index];
        const nextStationId = connection.to_station_id
        const nextLineName = connection.line
        const travelTimeSeconds = connection.travel_time_seconds 

        let addedTime = 0   
        let isInterchange = false       
        if(nextStationId != destinationStationId && currLineName != nextLineName){    
            addedTime += currStation.interchange_info.walking_time_between_lines.filter((data) => (
                    (data.from_line == currLineName && data.to_line == nextLineName) || 
                    (data.from_line == nextLineName && data.to_line == currLineName))
                )[0].time_seconds
            isInterchange = true
        }

        if(!visited.has(nextStationId) || currTime + travelTimeSeconds + addedTime < visited.get(nextStationId)){
            visited.set(nextStationId , currTime + travelTimeSeconds + addedTime)
            const newRoute = Array.from(currRoute)
            if(isInterchange && newRoute.length > 0){
                let interchangedStation = newRoute[newRoute.length-1]
                const interchangeInfo = {from_line: interchangedStation.line, to_line: nextLineName}
                interchangedStation.isInterchange = true
                interchangedStation.interchangeInfo = interchangeInfo
            }
            newRoute.push({stationId: nextStationId, line: nextLineName, isInterchange: false})
            pq.push(nextStationId, currTime + travelTimeSeconds + addedTime, nextLineName, newRoute)
        }
    }
}

