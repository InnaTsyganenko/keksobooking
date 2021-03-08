import {isInPage, isEscEvent} from './util.js';
import {mainPinMarker, LAT_CENTER, LNG_CENTER} from './map.js';
import {sendData} from './api.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const resetDataForms = () => {
  adForm.reset();
  mapFilters.reset();
  mainPinMarker.setLatLng([LAT_CENTER, LNG_CENTER]);
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

  const successMessage = main.querySelector('.success');

  main.addEventListener('click', () => {
    successMessage.classList.add('hidden');
  });

  const onSuccessEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successMessage.classList.add('hidden');
      main.removeEventListener('keydown', onSuccessEscKeydown);
    }
  };
  main.addEventListener('keydown', onSuccessEscKeydown);
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content;
  if (isInPage(main.querySelector('.error'))) {
    main.querySelector('.error').remove(); }
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  main.appendChild(errorMessageElement);

  const errorMessage = main.querySelector('.error');

  main.addEventListener('click', () => {
    errorMessage.classList.add('hidden');
  });

  const onErrorEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorMessage.classList.add('hidden');
      main.removeEventListener('keydown', onErrorEscKeydown);
    }
  };
  main.addEventListener('keydown', onErrorEscKeydown);
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetDataForms();
});

export {setAdFormSubmit, adForm, mapFilters};
