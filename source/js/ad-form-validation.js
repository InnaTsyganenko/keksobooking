import {adForm} from './map.js';

/* title */

const titleInput = adForm.querySelector('#title');

titleInput.addEventListener('input', () => {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('I expect text from 30 to 100 characters, darling!');
  } else {
    titleInput.setCustomValidity('');
  }
});

/* type - price */

const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const updatePrice = (evt) => {
  const price = minPrices[evt.target.value];
  priceInput.setAttribute('min', price);
  priceInput.placeholder = minPrices[evt.target.value];
};

typeSelect.addEventListener('change', updatePrice);

/* timein - timeout */

const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

const syncTime = () => {
  const SelectsTime = [timeinSelect, timeoutSelect];
  for (let i = 0; i < 2; i++) {
    SelectsTime[i].addEventListener('change', (evt) => SelectsTime[i^1].value = evt.target.value);
  }
};

syncTime(timeinSelect, timeoutSelect);

/* rooms - capacity */

const roomSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const capacityOptions = capacitySelect.options;
Array.from(capacityOptions, option => option.value === '1').forEach((isMatchedItem, index) => ((!isMatchedItem) ? (capacityOptions[index].disabled = true) : null));

const conformCapacity = (evt) => {
  Array.from(capacityOptions).forEach((isMatchedItem) => (isMatchedItem = isMatchedItem.disabled = false));
  switch (evt.target.value) {
    case '1':
      capacitySelect.value = evt.target.value;
      Array.from(capacityOptions, option => option.value === '1').forEach((isMatchedItem, index) => ((!isMatchedItem) ? (capacityOptions[index].disabled = true) : null));
      break;
    case '2':
      capacitySelect.value = evt.target.value;
      Array.from(capacityOptions, option => (option.value === '1') || (option.value === '2')).forEach((isMatchedItem, index) => ((!isMatchedItem) ? (capacityOptions[index].disabled = true) : null));
      break;
    case '3':
      capacitySelect.value = evt.target.value;
      Array.from(capacityOptions, option => (option.value === '1') || (option.value === '2') || (option.value === '3')).forEach((isMatchedItem, index) => ((!isMatchedItem) ? (capacityOptions[index].disabled = true) : null));
      break;
    case '100':
      capacitySelect.value = '0';
      Array.from(capacityOptions, option => option.value === '0').forEach((isMatchedItem, index) => ((!isMatchedItem) ? (capacityOptions[index].disabled = true) : null));
      break;
  }
};

roomSelect.addEventListener('change', conformCapacity);
