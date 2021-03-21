const adForm = document.querySelector('.ad-form');
const avatarInput = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview');

const handleFilesAvatar = (files) => {
  avatarPreview.innerHTML = '';
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')){ continue }

    const img = document.createElement('img');
    img.classList.add('obj');
    img.file = file;
    img.width = '70';
    img.height = '70';
    img.style=('border-radius: 5px');
    if (avatarPreview.childNodes.length < '1') {
      avatarPreview.style = 'background: none';
      avatarPreview.prepend(img);
    }
    const reader = new FileReader();
    reader.onload = ((aImg) => {return e => aImg.src = e.target.result})(img);
    reader.readAsDataURL(file);
  }
};

avatarInput.addEventListener('change', () => {
  handleFilesAvatar(avatarInput.files);
});

/* drag-and-drop housing images */

const dropBox = adForm.querySelector('.ad-form-header__drop-zone');

const drop = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFilesAvatar(files);
}

dropBox.addEventListener('drop', drop, false);

const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
  dropBox.addEventListener(eventName, preventDefaults, false);
});

const highlightdropBox = () => {
  dropBox.classList.add('highlight');
  dropBox.focus();
};

const unhighlightdropBox = () => {
  dropBox.classList.remove('highlight');
  dropBox.blur();
};

['dragenter', 'dragover'].forEach(eventName => {
  dropBox.addEventListener(eventName, highlightdropBox, false);
});
['dragleave', 'drop'].forEach(eventName => {
  dropBox.addEventListener(eventName, unhighlightdropBox, false);
});

export {adForm, preventDefaults, avatarPreview};