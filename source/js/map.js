/* eslint-disable no-undef */

const LAT_CENTER = 35.7919085784612;
const LNG_CENTER = 139.7518350691999;
const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

mapFilters.classList.add('map__filters--disabled');
document.querySelectorAll('.map__filters > *').forEach((item) => {
  item.disabled = true;
});

adForm.classList.add('ad-form--disabled');
document.querySelectorAll('.ad-form > *').forEach((item) => {
  item.disabled = true;
});

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    document.querySelectorAll('.ad-form > *').forEach((item) => {
      item.disabled = false;
    })
  })
  .setView({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  }, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);

const getLatLngFix = (pinMarker, fixed) => {
  pinMarker = pinMarker.getLatLng().lat.toFixed(fixed).toString() + ' ' + pinMarker.getLatLng().lng.toFixed(fixed).toString();
  return pinMarker;
};

const inputAddress = document.querySelector('#address');

inputAddress.value = getLatLngFix(mainPinMarker, 5);
mainPinMarker.on('move', () => {
  inputAddress.value = getLatLngFix(mainPinMarker, 5);
});

export {adForm, mapFilters, mapCanvas, mainPinMarker, LAT_CENTER, LNG_CENTER};
