/* eslint-disable no-undef */
import {createAds, TYPES_OF_HOUSING_DICT} from './create-ad.js';
import {makeElement} from './util.js';
import {getRandomFloat} from './util.js';

const adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');

document.querySelectorAll('.ad-form > *').forEach(function(item){
  item.disabled=true;
})

const mapFilters = document.querySelector('.map__filters');
mapFilters.classList.add('map__filters--disabled');

document.querySelectorAll('.map__filters > *').forEach(function(item){
  item.disabled=true;
})

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');

    document.querySelectorAll('.ad-form > *').forEach(function(item){
      item.disabled=false;
    })

    mapFilters.classList.remove('map__filters--disabled');

    document.querySelectorAll('.map__filters > *').forEach(function(item){
      item.disabled=false;
    })
  })
  .setView({
    lat: 35.6919085784612,
    lng: 139.7518350691999,
  }, 11);


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
    lat: 35.6919085784612,
    lng: 139.7518350691999,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);

const getLatLngFix = function (pinMarker, fixed) {
  pinMarker = pinMarker.getLatLng().lat.toFixed(fixed).toString() + ' ' + pinMarker.getLatLng().lng.toFixed(fixed).toString();
  return pinMarker;
}

const inputAddress = document.querySelector('#address');

inputAddress.value = getLatLngFix(mainPinMarker, 5);
mainPinMarker.on('move', () => {
  inputAddress.value = getLatLngFix(mainPinMarker, 5);
});

const adTemplate = document.querySelector('#card').content;
const similarAds = createAds;

similarAds.forEach((ad) => {
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  ad.offer.title == 0 ? adElement.querySelector('.popup__title').classList.add('hidden') : null;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  ad.offer.address == 0 ? adElement.querySelector('.popup__text--address').classList.add('hidden') : null;
  adElement.querySelector('.popup__text--price').textContent = ad.offer.price;
  ad.offer.price == 0 ? adElement.querySelector('.popup__text--price').classList.add('hidden') : null;
  adElement.querySelector('.popup__type').textContent = TYPES_OF_HOUSING_DICT[ad.offer.type];
  ad.offer.type == 0 ? adElement.querySelector('.popup__type').classList.add('hidden') : null;
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ad.offer.guests;
  ad.offer.guests == 0 || ad.offer.rooms == 0 ? adElement.querySelector('.popup__text--capacity').classList.add('hidden') : null;
  adElement.querySelector('.popup__text--time').textContent = ad.offer.checkin + ad.offer.checkout;
  ad.offer.checkin  == 0 || ad.offer.checkout == 0 ? adElement.querySelector('.popup__text--time').classList.add('hidden') : null;
  if (ad.offer.features == 0) {
    adElement.querySelector('.popup__features').classList.add('hidden')
  } else {
    adElement.querySelector('.popup__features').innerHTML = '';
    ad.offer.features.forEach((item) => {
      const el = makeElement('p', 'popup__feature');
      el.classList.add('popup__feature--' + item)
      adElement.querySelector('.popup__features').appendChild(el);
    })
  }
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  ad.offer.description == 0 ? adElement.querySelector('.popup__description').classList.add('hidden') : null;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  ad.author.avatar.length == 0 ? adElement.querySelector('.popup__avatar').classList.add('hidden') : null;
  const img = adElement.querySelector('.popup__photo');
  img.src = ad.offer.photos[0];
  for (let i = 1; i < ad.offer.photos.length; i++) {
    const clonePhoto = img.cloneNode(true);
    clonePhoto.src = ad.offer.photos[i];
    adElement.querySelector('.popup__photos').appendChild(clonePhoto);
  }
  ad.offer.photos.length == 0 ? adElement.querySelector('.popup__photos').classList.add('hidden') : null;
  const popup = makeElement('div', 'map__card');
  popup.appendChild(adElement);

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: getRandomFloat(35.62000, 35.80000, 5).toString(),
      lng: getRandomFloat(139.60000, 139.80000, 5).toString(),
    },
    {
      icon,
    },
  );

  marker
    .addTo(mapCanvas)
    .bindPopup(
      popup,
    );
});
