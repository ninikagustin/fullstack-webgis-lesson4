const peta = L.map('peta'); // kanvas peta
peta.setView([0, 110], 5); // titik tengah

const atribusiOSM = {
  attribution: '<a href= "https://www.openstreetmap.org/about" target = "_blank">© OpenStreetMap</a>'
}

// menambahkan basemap
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', atribusiOSM);
basemapOSM.addTo(peta);

const basemapNaturalEarth = L.tileLayer('https://naturalearthtiles.roblabs.com/tiles/natural_earth_cross_blended_hypso_shaded_relief.raster/{z}/{x}/{y}.png');
// basemapNaturalEarth.addTo(peta);

// marker titik
const optionTitik = {
  opacity: 0.8
};
const titik = L.marker([-6.177446, 106.825532], optionTitik);
titik.addTo(peta);

const namaTitik = 'Jakarta'
const popupTitik = `
<h1>${namaTitik}</h1>
<a target= "_blank" href= "https://www.jakarta.go.id/">
<img height= "100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/330px-Coat_of_arms_of_Jakarta.svg.png">
</a>
`
titik.bindPopup(popupTitik);

// lingkaran dan radiusnya
const optionLingkaran = {
  radius: 100000,
  opacity: 0.5,
  color: 'purple'
};
const lingkaran = L.circle([-2.935988, 104.754939], optionLingkaran);
lingkaran.addTo(peta);

// polygon
const koordinatPolygon = [
  [0, 100], // vertex 1
  [-5, 100], // vertex 2
  [-5, 110], // vertex 3
  [0, 110] // vertex 4
];
const optionPolygon = {
  color: '#2ca391',
  opacity: 0.3
}
const polygon = L.polygon(koordinatPolygon, optionPolygon);
polygon.addTo(peta);

// polyline
const polyline = L.polyline(koordinatPolygon);
polyline.addTo(peta);

// lubang polygon
const koordinatPolygonLubang = [
  [
    [0, 100], // vertex 1
    [-5, 100], // vertex 2
    [-5, 110], // vertex 3
    [0, 110] // vertex 4
  ], // koordinat utama
  [
    [-2, 105], // vertex 1
    [-3, 106], // vertex 2
    [-3, 107] // vertex 3
  ], // koordinat lubang 1
  [
    [-1, 106], // vertex 1
    [-2, 106], // vertex 2
    [-2, 107] // vertex 3
  ] // koordinat lubang 2
];
const polygonLubang = L.polygon(koordinatPolygonLubang);
// polygonLubang.addTo(peta)

const koordinatMultiPolygon = [
  [
    [
      [0, 100], // vertex 1
      [-5, 100], // vertex 2
      [-5, 110], // vertex 3
      [0, 110] // vertex 4
    ], // koordinat utama
    [
      [-2, 105], // vertex 1
      [-3, 106], // vertex 2
      [-3, 107] // vertex 3
    ], // koordinat lubang 1
    [
      [-1, 106], // vertex 1
      [-2, 106], // vertex 2
      [-2, 107] // vertex 3
    ] // koordinat lubang 2
  ], // polygon 1
  [
    [
      [0, 115], // vertex 1
      [-5, 115], // vertex 2
      [-5, 120], // vertex 3
      [0, 120], // vertex 4
    ], // koordinat utama
    // [], // koordinat lubang 1
  ] // polygon 2
];

const multiPolygon = L.polygon(koordinatMultiPolygon);
multiPolygon.addTo(peta);

const eventClick = function(e){
  const koordinat = e.latlng;
  // console.log(koordinat); // memunculkan latlng dalam bentuk object
  const y = koordinat.lat;
  const x = koordinat.lng;

  // console.log(koordinat.lat); // menampilkan y terpisah
  // console.log(koordinat.lng); // menampilkan x terpisah
  // alert('Koordinat di sini adalah ' + e.latlng) // jika ingin memunculkan sbg alert

  const titikEvent = L.marker([y, x]); // membuat marker di setiap klik
  return titikEvent.addTo(peta);
};

// peta.on('click', eventClick);

// membuat digitasi polygon
let koordinatEventPolygon = [];
let eventPolygon = L.polygon(koordinatEventPolygon);

const eventClickPolygon = function(e){
  const koordinat = e.latlng;
  const y = koordinat.lat;
  const x = koordinat.lng;
  
  koordinatEventPolygon.push([y, x]);
  
  eventPolygon = L.polygon(koordinatEventPolygon);
};

peta.on('click', eventClickPolygon);

const buttonSubmit = document.createElement('button');
buttonSubmit.innerHTML = 'submit';
document.body.appendChild(buttonSubmit);

buttonSubmit.onclick = function(){
  return eventPolygon.addTo(peta)
};

// reset utk membuat polygon lain
const buttonReset = document.createElement('button');
buttonReset.innerHTML = 'reset koordinat';
document.body.appendChild(buttonReset);

buttonReset.onclick = function(){
  return koordinatEventPolygon = []
};