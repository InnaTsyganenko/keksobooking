import {isInPage, isEscEvent} from './util.js';
import {mainPinMarker, latCenter, lngCenter} from './map.js';
import {sendData} from './api.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const resetDataForms = () => {
  adForm.reset();
  mapFilters.reset();
  mainPinMarker.setLatLng([latCenter, lngCenter]);
};

const setAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(showSuccessMessage()),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

setAdFormSubmit(resetDataForms);

const main = document.querySelector('main');
const successMessageTemplate = document.querySelector('#success').content;

const showSuccessMessage = () => {
  if (isInPage(main.querySelector('.success'))) {
    main.querySelector('.success').remove();
  }
  const successMessageElement = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessageElement);
  main.addEventListener('click', () => {
    main.querySelector('.success').classList.add('hidden');
  });

  main.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.querySelector('.success').classList.add('hidden');
    }
  });
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content;
  if (isInPage(main.querySelector('.error'))) {
    main.querySelector('.error').remove(); }
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  main.appendChild(errorMessageElement);

  main.addEventListener('click', () => {
    main.querySelector('.error').classList.add('hidden');
  });

  main.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.querySelector('.error').classList.add('hidden');
    }
  });
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetDataForms();
});

export {setAdFormSubmit, adForm, mapFilters};
