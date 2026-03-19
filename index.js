// Initialize Map
var map = L.map('map').setView([20.21, 77.14], 10);


// OpenStreetMap Basemap
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// -------------------------
// GeoServer NDVI WMS Layer
// -------------------------

var ndviLayer = L.tileLayer.wms("https://velutinous-vestally-kairi.ngrok-free.dev/geoserver/GIS/wms", {
    layers: "GIS:NDVI_Zonalst",
    styles: "NDVI_STYLE",
    format: "image/png",
    transparent: true,
    tiled: true,
    version: "1.1.1",
    attribution: "GeoServer NDVI_Zonalst"
});


var washimshp = L.tileLayer.wms("https://velutinous-vestally-kairi.ngrok-free.dev/geoserver/GIS/wms", {
    layers: "GIS:Washim_vill_rep",
    styles: "",
    format: "image/png",
    transparent: true,
    opacity: 1,
    version: "1.1.1",
    attribution: "GeoServer Washim_vill_rep"
});

// -------------------------
// Google Basemaps
// -------------------------

let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom:20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom:20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom:20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom:20,
    subdomains:['mt0','mt1','mt2','mt3']
});


// CartoDB basemap
let cartoDB = L.tileLayer(
'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap © CARTO',
    subdomains:'abcd',
    maxZoom:20
});


// -------------------------
// Base Maps
// -------------------------

let baseMaps = {
    "OpenStreetMap": osm,
    "Google Hybrid": googleHybrid,
    "Google Streets": googleStreets,
    "Google Satellite": googleSat,
    "Google Terrain": googleTerrain,
    "CartoDB": cartoDB
};


// -------------------------
// Overlay Maps
// -------------------------

let overlayMaps = {
    "NDVI Layer": ndviLayer
};


// -------------------------
// Layer Control
// -------------------------

L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(map);


// -------------------------
// Add NDVI by default
// -------------------------

ndviLayer.addTo(map);

washimshp.addTo(map);

// -------------------------
// Map Click Popup
// -------------------------

let popup = L.popup();

function onMapClick(e){
    popup
    .setLatLng(e.latlng)
    .setContent("You clicked at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);


// -------------------------
// Geocoder
// -------------------------

L.Control.geocoder().addTo(map);

// -------------------------
// NDVI Legend from GeoServer
// -------------------------

var legend = L.control({position:'bottomright'});

legend.onAdd = function(){

var div = L.DomUtil.create('div','info legend');

div.innerHTML += "<h4>NDVI</h4>";
div.innerHTML += '<i style="background:#d73027"></i> -1 - 0<br>';
div.innerHTML += '<i style="background:#fdae61"></i> 0 - 0.05<br>';
div.innerHTML += '<i style="background:#fee08b"></i> 0.05 - 0.1<br>';
div.innerHTML += '<i style="background:#a6d96a"></i> 0.1 - 0.15<br>';
div.innerHTML += '<i style="background:#1a9850"></i> 0.15 - 1';

return div;

};

legend.addTo(map);

