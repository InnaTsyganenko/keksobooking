import {showAlert, isInPage, isEscEvent} from './util.js';
import {adForm, mapFilters, mainPinMarker} from './map.js';
import {renderSimilarList} from './similar-ads.js';

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    renderSimilarList(ads);
  })
  .catch(() => {
    showAlert('При загрузке данных с сервера произошла ошибка. Попробуйте обновить страницу.');
  });

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const main = document.querySelector('main');
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {

      if (response.ok) {

        const successMessageTemplate = document.querySelector('#success').content;
        if (isInPage(main.querySelector('.success'))) {
          main.querySelector('.success').remove(); }
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
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(() => {
      adForm.reset();
      mapFilters.reset();
      mainPinMarker.setLatLng([35.6919085784612, 139.7518350691999]);
    })
    .catch(() => {
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
    });
});

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  mapFilters.reset();
  mainPinMarker.setLatLng([35.6919085784612, 139.7518350691999]);
});
