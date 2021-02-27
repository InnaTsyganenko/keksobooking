/* eslint-disable no-undef */
import {getRandomFloat, makeElement} from './util.js';
import {createAds, TYPES_OF_HOUSING_DICT} from './create-ad.js';
import {mapCanvas} from './map.js';

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
