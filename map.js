function createMap(mapContainerID, lat, lng) {
    const map = L.map(mapContainerID);
    map.setView([lat, lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
        .addTo(map);
    return map;
}