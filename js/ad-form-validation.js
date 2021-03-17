import {adForm} from './ad-form-notification.js';

/* type - price */

const selectType = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const selectPriceValue = selectType.options[selectType.selectedIndex].value;

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

priceInput.placeholder = MinPrice[selectPriceValue]
priceInput.setAttribute('min', MinPrice[selectPriceValue]);

const updatePrice = (evt) => {
  const price = MinPrice[evt.target.value];
  priceInput.setAttribute('min', price);
  priceInput.placeholder = MinPrice[evt.target.value];
};

selectType.addEventListener('change', updatePrice);

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

// export {};
