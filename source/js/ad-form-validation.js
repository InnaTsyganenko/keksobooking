import {adForm} from './ad-form-notification.js';

/* title */

const inputType = adForm.querySelector('#title');

inputType.addEventListener('input', () => {
  if (inputType.validity.tooShort) {
    inputType.setCustomValidity('I expect text from 30 to 100 characters, darling!');
  } else {
    inputType.setCustomValidity('');
  }
});

/* type - price */

const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const updatePrice = (evt) => {
  const price = MinPrice[evt.target.value];
  priceInput.setAttribute('min', price);
  priceInput.placeholder = MinPrice[evt.target.value];
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
Array.from(capacityOptions, o => o.value == '1').forEach((e, i) => ((!e) ? (capacityOptions[i].disabled = true) : null));

const conformCapacity = (evt) => {
  Array.from(capacityOptions).forEach((e) => (e = e.disabled = false));
  switch (evt.target.value) {
    case '1':
      capacitySelect.value = evt.target.value;
      Array.from(capacityOptions, o => o.value == '1').forEach((e, i) => ((!e) ? (capacityOptions[i].disabled = true) : null));
      break;
    case '2':
      capacitySelect.value = evt.target.value;
      Array.from(capacityOptions, o => (o.value == '1') || (o.value == '2')).forEach((e, i) => ((!e) ? (capacityOptions[i].disabled = true) : null));
      break;
    case '3':
      capacitySelect.value = evt.target.value;
      Array.from(capacityOptions, o => (o.value == '1') || (o.value == '2') || (o.value == '3')).forEach((e, i) => ((!e) ? (capacityOptions[i].disabled = true) : null));
      break;
    case '100':
      capacitySelect.value = '0';
      Array.from(capacityOptions, o => o.value == '0').forEach((e, i) => ((!e) ? (capacityOptions[i].disabled = true) : null));
      break;
  }
};

roomSelect.addEventListener('change', conformCapacity);
