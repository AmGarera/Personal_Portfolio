// initialize the map
var map = L.map('map').setView([40.7128, -74.0059], 13);

var terrainTiles = L.tileLayer.provider('OpenTopoMap');
terrainTiles.addTo(map);

// Set the initial viewport of the map. Here we're centering on CLT.
map.setView([40.7128, -74.0059], 15);

// Loading the geoJSON
function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data);
    dataLayer.addTo(map);
}

$.getJSON("Subway_Entrances.geojson", function(data) { addDataToMap(data, map); console.log(data);});
//Where the magic is AKA pulling objects and their values to make it into readable english for the end user to understand.
function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            var popupText = "Population Ranking: " + feature.properties.name
                + "<br>Location: " + feature.properties.line
                + "<br><a href='" + feature.properties.url + "'>More info</a>";
            layer.bindPopup(popupText); }
    });
    dataLayer.addTo(map);
}