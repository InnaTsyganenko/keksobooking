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
const typeSelectValue = typeSelect.options[typeSelect.selectedIndex].value;

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

priceInput.placeholder = MinPrice[typeSelectValue];
priceInput.setAttribute('min', MinPrice[typeSelectValue]);

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
const roomSelectValue = roomSelect.options[roomSelect.selectedIndex].value;
capacitySelect.value = roomSelectValue;
Array.prototype.filter.call(capacitySelect.options, o => o.value !== '1').forEach(e => (e.disabled = true));

const conformCapacity = (evt) => {
  Array.prototype.filter.call(capacitySelect.options, o => o.value).forEach(e => (e.disabled = false));

  switch (evt.target.value) {
    case '1':
      capacitySelect.value = evt.target.value;
      Array.prototype.filter.call(capacitySelect.options, o => o.value !== '1').forEach(e => (e.disabled = true));
      break;
    case '2':
      capacitySelect.value = evt.target.value;
      Array.prototype.filter.call(capacitySelect.options, o => (o.value !== '1') && (o.value !== '2')).forEach(e => (e.disabled = true));
      break;
    case '3':
      capacitySelect.value = evt.target.value;
      Array.prototype.filter.call(capacitySelect.options, o => (o.value !== '1') && (o.value !== '2') && (o.value !== '3')).forEach(e => (e.disabled = true));
      break;
    case '100':
      capacitySelect.value = '0';
      Array.prototype.filter.call(capacitySelect.options, o => o.value !== '0').forEach(e => (e.disabled = true));
      break;
  }
};

roomSelect.addEventListener('change', conformCapacity);
