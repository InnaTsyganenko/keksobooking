import {adForm, preventDefaults} from './ad-form-upload-avatar.js';

const housingImagesInput = adForm.querySelector('.ad-form__upload input[type=file]');
const housingImagesPreview = adForm.querySelector('.ad-form__photo');

const handleHousingImages = (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')){ continue }

    const img = document.createElement('img');
    img.classList.add('obj');
    img.file = file;
    img.width = '70';
    img.height = '70';
    img.style=('border-radius: 5px');
    if (housingImagesPreview.childNodes.length < '3') {
      housingImagesPreview.style = 'background: none';
      housingImagesPreview.prepend(img);
    } else {
      housingImagesPreview.prepend(img);
      while (housingImagesPreview.children.length > 3) {
        housingImagesPreview.removeChild(housingImagesPreview.lastChild);
      }
    }
    const reader = new FileReader();
    reader.onload = ((aImg) => {return e => aImg.src = e.target.result})(img);
    reader.readAsDataURL(file);
  }
};

housingImagesInput.addEventListener('change', () => {
  handleHousingImages(housingImagesInput.files);
});

/* drag-and-drop housing images */

const dropArea = adForm.querySelector('.ad-form__drop-zone');

const drop = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  const dt = evt.dataTransfer;
  const files = dt.files;
  handleHousingImages(files);
}

dropArea.addEventListener('drop', drop, false);

['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

const highlightDropArea = () => {
  dropArea.classList.add('highlight');
  dropArea.focus();
};

const unhighlightDropArea = () => {
  dropArea.classList.remove('highlight');
  dropArea.blur();
};

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlightDropArea, false);
});
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlightDropArea, false);
});

export {housingImagesPreview};
