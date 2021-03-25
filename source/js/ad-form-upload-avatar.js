import {adForm} from './map.js';

const avatarInput = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview');

const handleImages = (files, object, quantityImg, clearObject) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')){ continue }
    if (clearObject) {
      object.innerHTML = '';
    }
    const img = document.createElement('img');
    img.classList.add('obj');
    img.file = file;
    img.width = '70';
    img.height = '70';
    img.style=('border-radius: 5px');
    if (object.childNodes.length < quantityImg) {
      object.style = 'background: none';
      object.prepend(img);
    } else if (quantityImg > 1) {
      object.prepend(img);
      while (object.children.length > quantityImg) {
        object.removeChild(object.lastChild);
      }
    }
    const reader = new FileReader();
    reader.onload = ((aImg) => {return e => aImg.src = e.target.result})(img);
    reader.readAsDataURL(file);
  }
};

avatarInput.addEventListener('change', () => {
  handleImages(avatarInput.files, avatarPreview, 1, true);
});

/* drag-and-drop housing images */

const dropBox = adForm.querySelector('.ad-form-header__drop-zone');

const onDropBoxDrop = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  const dt = evt.dataTransfer;
  const files = dt.files;
  handleImages(files, avatarPreview, 1, true);
}

dropBox.addEventListener('drop', onDropBoxDrop, false);

const onEventsPreventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
  dropBox.addEventListener(eventName, onEventsPreventDefaults, false);
});

const onDropBoxHighlight = () => {
  dropBox.classList.add('highlight');
  dropBox.focus();
};

const onDropBoxUnhighlight = () => {
  dropBox.classList.remove('highlight');
  dropBox.blur();
};

['dragenter', 'dragover'].forEach(eventName => {
  dropBox.addEventListener(eventName, onDropBoxHighlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
  dropBox.addEventListener(eventName, onDropBoxUnhighlight, false);
});

export {onEventsPreventDefaults, avatarPreview, handleImages};
