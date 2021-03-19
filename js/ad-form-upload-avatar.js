const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const avatarInput = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview');

const reader = new FileReader();

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    reader.addEventListener('load', appendImg);
    reader.readAsDataURL(file);
  }
});

const appendImg = () => {
  let img = document.createElement('img');
  img.src = reader.result;
  img.width = '70';
  img.height = '70';
  img.style=('border-radius: 5px');
  avatarPreview.innerHTML = '';
  avatarPreview.appendChild(img);
};

/* drag-and-drop avatar */

let dropBox = adForm.querySelector('.ad-form-header__drop-zone');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropBox.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

const highlight = () => {
  dropBox.classList.add('highlight');
};

const unhighlight = () => {
  dropBox.classList.remove('highlight');
};

['dragenter', 'dragover'].forEach(eventName => {
  dropBox.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
  dropBox.addEventListener(eventName, unhighlight, false);
});

dropBox.addEventListener('drop', handleDrop, false);
function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}

const handleFiles = (files) => {
  files = [...files];
  files.forEach(previewFile);
}

const previewFile = (file) => {
  reader.readAsDataURL(file);
  reader.onloadend = appendImg;
};

export {adForm, avatarPreview};
