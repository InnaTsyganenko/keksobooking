import {isInPage, isEscEvent, debounce} from './util.js';
import {renderSimilarList} from './similar-ads.js';

const RERENDER_DELAY = 500;

const leafletPane = document.querySelector('.leaflet-pane');
const leafletAllMarkers = document.querySelector('.leaflet-marker-pane');
const leafletMarkerDraggable = leafletPane.querySelector('.leaflet-marker-draggable');
const copyAllAds = JSON.parse(localStorage.getItem('copy_of_ads'));
const selectHousingType = document.querySelector('[name="housing-type"]');

leafletAllMarkers.addEventListener('keydown', (evt) => {
  const leafletPopup = leafletPane.querySelector('.leaflet-popup');
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (isInPage(leafletPopup)) {
      document.querySelector('.leaflet-popup-close-button').click()
    }
  }
});

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
