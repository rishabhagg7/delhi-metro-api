/**
 * Finds the terminal station ID for an interchange between two lines
 * @param {Object} stationMap - Map of station IDs to station objects
 * @param {string} stationId - Current station ID
 * @param {string} fromLine - Line transitioning from
 * @param {string} toLine - Line transitioning to
 * @param {string} nextStationId - Next station ID on the new line
 * @returns {string|null} Terminal station ID or null if not found
 */
export function findTerminalStationId(stationMap, stationId, fromLine, toLine, nextStationId) {
    const station = stationMap[stationId];

    if (!station?.interchange_info?.walking_time_between_lines) {
        return null;
    }

    const interchangeData = station.interchange_info.walking_time_between_lines.find(
        interchange => interchange.from_line === fromLine && interchange.to_line === toLine
    );

    if (!interchangeData?.direction_options) {
        return null;
    }

    const directionOption = interchangeData.direction_options.find(
        option => option.to_station_id === nextStationId
    );

    return directionOption?.terminal_station_id ?? null;
}
