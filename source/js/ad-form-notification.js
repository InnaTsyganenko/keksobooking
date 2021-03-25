import {isInPage, isEscEvent} from './util.js';
import {closePopup} from './filters.js';
import {adForm, mapFilters, mainPinMarker, LAT_CENTER, LNG_CENTER} from './map.js';
import {sendData} from './api.js';
import {renderSimilarList} from './similar-ads.js';
import {avatarPreview} from './ad-form-upload-avatar.js';
import {housingImagesPreview} from './ad-form-upload-housing-images.js';
import {priceInput, minPrices, capacityOptions} from './ad-form-validation.js';

const resetDataForm = () => {
  adForm.reset();
  mapFilters.reset();
  closePopup();
  mainPinMarker.setLatLng([LAT_CENTER, LNG_CENTER]);
  renderSimilarList(JSON.parse(localStorage.getItem('copy_of_ads')));
  avatarPreview.innerHTML = '';
  avatarPreview.style = 'background: #e4e4de';
  avatarPreview.innerHTML = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';
  housingImagesPreview.innerHTML = '';
  housingImagesPreview.style = 'background: #e4e4de';
  priceInput.setAttribute('min', minPrices['flat']);
  priceInput.placeholder = minPrices['flat'];
  Array.from(capacityOptions, option => option.value === '1').forEach((isMatchedItem, index) => ((!isMatchedItem) ? (capacityOptions[index].disabled = true) : null));
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

setAdFormSubmit(resetDataForm);

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
  resetDataForm();
});

export {setAdFormSubmit, adForm, mapFilters};
