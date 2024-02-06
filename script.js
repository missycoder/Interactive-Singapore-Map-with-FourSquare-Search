document.addEventListener("DOMContentLoaded", function () {
    const map = createMap('map', 1.3521, 103.8198);

    document.querySelector("#searchBtn").addEventListener("click", async function () {
        const searchTerms = document.querySelector("#searchTerms").value;
        const data = await search(1.3521, 103.8198, searchTerms);
        console.log(data);

        // add markers:
        // Example of how to get lat lng from the FourSquare results: 
        // x.results[0].geocodes.main.latitude = lat
        // x.results[0].goecodes.main.longtitude = lng

        // take one location at a time from data.results
        for (let location of data.results) {
            // create a marker for that location
            const lat = location.geocodes.main.latitude;
            const lng = location.geocodes.main.longitude;
            const address = location.location.formatted_address;
            const marker = L.marker([lat, lng]);
            marker.bindPopup(`<h1>${address}</h1>`);

            // add the marker to the map
            marker.addTo(map);

            // repeat until there are no location left in data.results
        }



    })

});