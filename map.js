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
function addMarkersToMap(searchResults, layer, map) {
    // add markers:
    // Example of how to get lat lng from the FourSquare results: 
    // x.results[0].geocodes.main.latitude = lat
    // x.results[0].goecodes.main.longtitude = lng

    // remove all existing markers from the provided layer
    layer.clearLayers();

    const searchResultOutput = document.querySelector("#search-results");
    searchResultOutput.innerHTML = "";

    // take one location at a time from data.results
    for (let location of searchResults.results) {
        // PART A: create a marker for that location
        
        const lat = location.geocodes.main.latitude;
        const lng = location.geocodes.main.longitude;
        const address = location.location.formatted_address;
        const name = location.name;
        const marker = L.marker([lat, lng]);
        marker.bindPopup(function(){

            const divElement = document.createElement('div');
            divElement.innerHTML = `
                <h3>${location.name}</h3>
                <img src="#"/>
                <h4>${location.location.formatted_address}</h4>
                <button class="clickButton">Click</button>
            `;

            async function getPicture() {
                const photos = await getPhotoFromFourSquare(location.fsq_id);
                const firstPhoto = photos[0];
                const photoUrl = firstPhoto.prefix + '150x150' + firstPhoto.suffix;
                divElement.querySelector("img").src = photoUrl;
            }

            getPicture();

            divElement.querySelector(".clickButton").addEventListener("click", function(){
                alert("hello world!");
            });


            // whatver element or HTML the function returns will be inside popup
            return divElement;
        });

        // add the marker to the map
        marker.addTo(layer);

        // PART B: create and display the search result
        // 2. create a an element to display the result
        const divElement = document.createElement('div');

        // 3. add the element to the result element
        divElement.innerHTML = location.name;

        divElement.addEventListener("click", function () {
            // get lat lng of the search result
            const lat = location.geocodes.main.latitude;
            const lng = location.geocodes.main.longitude;
            map.flyTo([lat, lng], 16);
            marker.openPopup(); // simulate a click on marker
        })

        searchResultOutput.appendChild(divElement);

        // repeat until there are no location left in data.results
    }
}