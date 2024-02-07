/**
 * Create a new Leaflet map
 * @param {string} mapContainerID ID of the element that will display the map
 * @param {Number} lat latitude
 * @param {Number} lng longitude
 * @returns An object that represents the Leaflet map
 */
function createMap(mapContainerID, lat, lng) {
    const map = L.map(mapContainerID);
    map.setView([lat, lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
        .addTo(map);
    return map;
}

/**
 * Add markers to a map
 * @param {[*]} searchResults Array of objects from FourSquare
 * @param {*} layer The Leaflet Layer to add to
 */
function addMarkersToMap(searchResults, layer) {
     // add markers:
        // Example of how to get lat lng from the FourSquare results: 
        // x.results[0].geocodes.main.latitude = lat
        // x.results[0].goecodes.main.longtitude = lng

        // remove all existing markers from the provided layer
        layer.clearLayers();

        // take one location at a time from data.results
        for (let location of searchResults.results) {
            // create a marker for that location
            const lat = location.geocodes.main.latitude;
            const lng = location.geocodes.main.longitude;
            const address = location.location.formatted_address;
            const name = location.name;
            const marker = L.marker([lat, lng]);
            marker.bindPopup(`<h1>${name}</h1><h2>${address}</h2>`);

            // add the marker to the map
            marker.addTo(layer);

            // repeat until there are no location left in data.results
        }
}