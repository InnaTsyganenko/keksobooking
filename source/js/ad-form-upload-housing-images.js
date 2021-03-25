import {onEventsPreventDefaults, handleImages} from './ad-form-upload-avatar.js';
import {adForm} from './map.js';

const housingImagesInput = adForm.querySelector('.ad-form__upload input[type=file]');
const housingImagesPreview = adForm.querySelector('.ad-form__photo');

housingImagesInput.addEventListener('change', () => {
  handleImages(housingImagesInput.files, housingImagesPreview, 3, false);
});

/* drag-and-drop housing images */

const dropArea = adForm.querySelector('.ad-form__drop-zone');

const onDropAreaDrop = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  const dt = evt.dataTransfer;
  const files = dt.files;
  handleImages(files, housingImagesPreview, 3, false);
}

dropArea.addEventListener('drop', onDropAreaDrop, false);

['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
  dropArea.addEventListener(eventName, onEventsPreventDefaults, false);
});

const onDropAreaHighlight = () => {
  dropArea.classList.add('highlight');
  dropArea.focus();
};

const onDropAreaUnhighlight = () => {
  dropArea.classList.remove('highlight');
  dropArea.blur();
};

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, onDropAreaHighlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, onDropAreaUnhighlight, false);
});

export {housingImagesPreview};
