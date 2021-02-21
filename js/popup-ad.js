import {isEscEvent} from './util.js';

const userModalElement = document.querySelector('.popup');
const userModalCloseElement = userModalElement.querySelector('.popup__close');

const closeUserModal = () => {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

userModalCloseElement.addEventListener('click', () => {
  userModalElement.classList.add('hidden');
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    closeUserModal();
  }
});

export {userModalElement, userModalCloseElement};
