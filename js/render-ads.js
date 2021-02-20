import {createAds, TYPES_OF_HOUSING_DICT} from './create-ad.js';
import {makeElement} from './util.js';

const adTemplate = document.querySelector('#card').content;
const map = document.querySelector('#map-canvas');

const similarAds = createAds;
const closeButton = '<button class="popup__close" type="button">×</button>';

similarAds.forEach((ad) => {
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup').insertAdjacentHTML('afterbegin',closeButton);
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
  map.appendChild(adElement);
});

// export {userModalElement, userModalCloseElement};
