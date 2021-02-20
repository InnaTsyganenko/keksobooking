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
  return ((Math.random() * (max - min)) + min).toFixed(precision);
}

const getRandomArrayElements = function (arr) {
  const shuffledArr = arr.slice(0);
  const count = getRandomInt(1, arr.length - 1);
  let i = arr.length;
  let min = i - count;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffledArr[index];
    shuffledArr[index] = shuffledArr[i];
    shuffledArr[i] = temp;
  }
  return (shuffledArr.slice(min));
}

let makeElement = function (tagName, className, text) {
  let element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

export {getRandomArrayElements, isEscEvent, isEnterEvent, getRandomInt, getRandomFloat, makeElement};
