import {isInPage, isEscEvent} from './util.js';
import {renderSimilarList} from './similar-ads.js';

const RERENDER_DELAY = 500;

const leafletPane = document.querySelector('.leaflet-pane');
const leafletAllMarkers = leafletPane.querySelector('.leaflet-marker-pane');

leafletAllMarkers.addEventListener('keydown', (evt) => {
  const leafletPopup = leafletPane.querySelector('.leaflet-popup');
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (isInPage(leafletPopup)) {
      leafletPopup.classList.add('hidden');
    }
  }
});

const debounce = (cb, wait) => {
  return function (timeout) {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      cb.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const leafletMarkerDraggable = leafletPane.querySelector('.leaflet-marker-draggable');
const copyAllAds = JSON.parse(localStorage.getItem('copy_of_ads'));
const selectHousingType = document.querySelector('[name="housing-type"]');

selectHousingType.addEventListener('change', (evt) => {
  const selectHousingTypeOption = evt.target.value;
  const matchTypeHousing = (el) => {
    return (el.offer.type == selectHousingTypeOption);
  };

  const ads = copyAllAds.filter(matchTypeHousing);

  leafletPane.querySelector('.leaflet-popup') ? leafletPane.querySelector('.leaflet-popup').classList.add('hidden') : null;
  leafletAllMarkers.innerHTML = '';

  leafletAllMarkers.prepend(leafletMarkerDraggable);

  let renderSimilarListDebounced = debounce(renderSimilarList, RERENDER_DELAY);
  renderSimilarListDebounced(ads);

  evt.target.value == 'any' ? renderSimilarListDebounced(copyAllAds) : null;
});
