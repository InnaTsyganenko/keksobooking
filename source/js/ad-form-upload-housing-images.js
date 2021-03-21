import {adForm, preventDefaults} from './ad-form-upload-avatar.js';

const housingImagesInput = adForm.querySelector('.ad-form__upload input[type=file]');
const housingImagesPreview = adForm.querySelector('.ad-form__photo');

const handleFiles = (files) => {
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
  handleFiles(housingImagesInput.files);
});

/* drag-and-drop housing images */

const dropArea = adForm.querySelector('.ad-form__drop-zone');

const drop = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
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
