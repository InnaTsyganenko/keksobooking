const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const SIMILAR_AD_COUNT = 10;

const getRandomInt = function (min, max) { // Источник MDN
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = function (min, max, precision) {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return ((Math.random() * (max - min)) + min).toPrecision(precision + 1);
}

const getRandomArrayElements = function (arr, count) {
  let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

const createAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8).toString() + '.png',
    },
    offer: {
      title: 'Title Ad',
      address: getRandomFloat(35.65000, 35.70000, 6).toString() + ', ' + getRandomFloat(139.70000, 139.80000, 6).toString(),
      price: getRandomInt(500, 1000000),
      type: TYPE[getRandomInt(0, TYPE.length - 1)],
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 100),
      checkin: CHECKIN[getRandomInt(0, CHECKIN.length - 1)],
      checkout: CHECKIN[getRandomInt(0, CHECKIN.length - 1)],
      features: getRandomArrayElements(FEATURES, getRandomInt(1, 6)),
      description: 'Description',
      photos: PHOTOS[getRandomInt(0, PHOTOS.length - 1)],
    },
    location: {
      x: getRandomFloat(35.65000, 35.70000, 6),
      y: getRandomFloat(139.70000, 139.80000, 6),
    },
  };
};
const similarAd = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
similarAd;
