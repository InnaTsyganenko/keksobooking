/* eslint-disable no-undef */
import {makeElement} from './util.js';
import {mapCanvas} from './map.js';

const SIMILAR_AD_COUNT = 10;
const adTemplate = document.querySelector('#card').content;
const typesHousingDict = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalow: 'Бунгало'};

const renderMarkers = (ad, popup) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
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
};

const renderSimilarList = (similarAds) => {
  similarAds
    .slice(0, SIMILAR_AD_COUNT)
    .forEach((ad) => {
      const adElement = adTemplate.cloneNode(true);
      adElement.querySelector('.popup__title').textContent = ad.offer.title;
      ad.offer.title === 0 ? adElement.querySelector('.popup__title').classList.add('hidden') : null;
      adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
      ad.offer.address === 0 ? adElement.querySelector('.popup__text--address').classList.add('hidden') : null;
      adElement.querySelector('.popup__text--price').textContent = ad.offer.price.toString() + ' ₽/ночь';
      ad.offer.price === 0 ? adElement.querySelector('.popup__text--price').classList.add('hidden') : null;
      adElement.querySelector('.popup__type').textContent = typesHousingDict[ad.offer.type];
      ad.offer.type === 0 ? adElement.querySelector('.popup__type').classList.add('hidden') : null;
      adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms.toString() + ' комнаты для ' + ad.offer.guests.toString() + ' гостей';
      ad.offer.guests === 0 || ad.offer.rooms === 0 ? adElement.querySelector('.popup__text--capacity').classList.add('hidden') : null;
      adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin.toString() + ', выезд до ' + ad.offer.checkout.toString();
      ad.offer.checkin  === 0 || ad.offer.checkout === 0 ? adElement.querySelector('.popup__text--time').classList.add('hidden') : null;
      if (ad.offer.features === 0) {
        adElement.querySelector('.popup__features').classList.add('hidden')
      } else {
        adElement.querySelector('.popup__features').innerHTML = '';
        ad.offer.features.forEach((item) => {
          const element = makeElement('p', 'popup__feature');
          element.classList.add('popup__feature--' + item)
          adElement.querySelector('.popup__features').appendChild(element);
        })
      }
      adElement.querySelector('.popup__description').textContent = ad.offer.description;
      ad.offer.description === 0 ? adElement.querySelector('.popup__description').classList.add('hidden') : null;
      adElement.querySelector('.popup__avatar').src = ad.author.avatar;
      ad.author.avatar.length === 0 ? adElement.querySelector('.popup__avatar').classList.add('hidden') : null;
      const popupAvatar = adElement.querySelector('.popup__photo');
      popupAvatar.src = ad.offer.photos[0];
      for (let i = 1; i < ad.offer.photos.length; i++) {
        const clonePhoto = popupAvatar.cloneNode(true);
        clonePhoto.src = ad.offer.photos[i];
        adElement.querySelector('.popup__photos').appendChild(clonePhoto);
      }
      ad.offer.photos.length === 0 ? adElement.querySelector('.popup__photos').classList.add('hidden') : null;
      const popup = makeElement('div', 'map__card');
      popup.appendChild(adElement);
      renderMarkers(ad, popup);
    });
};

export {renderSimilarList};
