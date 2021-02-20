import {getRandomInt, getRandomFloat, getRandomArrayElements} from './util.js';

const TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const TYPES_OF_HOUSING_DICT = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalow: 'Бунгало'};
const CHECKIN_CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
const HOUSING_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_OF_HOUSING = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const SIMILAR_AD_COUNT = 1;

const createAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8).toString() + '.png',
    },
    offer: {
      title: 'TitleAd',
      address: getRandomFloat(35.65000, 35.70000, 5).toString() + ', ' + getRandomFloat(139.70000, 139.80000, 5).toString(),
      price: getRandomInt(500, 100000).toString() + ' ₽/ночь',
      type: TYPES_OF_HOUSING[getRandomInt(0, TYPES_OF_HOUSING.length - 1)],
      rooms:  getRandomInt(1, 10).toString() + ' комнаты для ',
      guests: getRandomInt(1, 10).toString() + ' гостей',
      checkin: 'Заезд после ' + CHECKIN_CHECKOUT_HOURS[getRandomInt(0, CHECKIN_CHECKOUT_HOURS.length - 1)].toString(),
      checkout: ', выезд до ' + CHECKIN_CHECKOUT_HOURS[getRandomInt(0, CHECKIN_CHECKOUT_HOURS.length - 1)].toString(),
      features: getRandomArrayElements(HOUSING_FEATURES),
      description: 'Description',
      photos: PHOTOS_OF_HOUSING,
    },
    location: {
      x: getRandomFloat(35.65000, 35.70000, 5),
      y: getRandomFloat(139.70000, 139.80000, 5),
    },
  };
};

const createAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

export {createAds, TYPES_OF_HOUSING_DICT};
