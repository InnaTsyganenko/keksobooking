import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
      localStorage.setItem('copy_of_ads', JSON.stringify(ads));
    })
    .catch(() => {
      showAlert('При загрузке данных с сервера произошла ошибка. Попробуйте обновить страницу :(');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
