import {isInPage, isEscEvent, debounce} from './util.js';
import {renderSimilarList} from './similar-ads.js';
import {mapFilters} from './map.js';

const RERENDER_DELAY = 500;
const leafletPane = document.querySelector('.leaflet-pane');
const leafletAllMarkers = document.querySelector('.leaflet-marker-pane');
const leafletMarkerDraggable = leafletPane.querySelector('.leaflet-marker-draggable');
const copyAllAds = JSON.parse(localStorage.getItem('copy_of_ads'));
const selectsMapFilters = [...document.querySelectorAll('.map__filter')];
const checkboxesHousingFeatures = document.querySelectorAll('.map__checkbox');

const closePopup = () => {
  if (isInPage(leafletPane.querySelector('.leaflet-popup'))) {
    document.querySelector('.leaflet-popup-close-button').click();
  }
};

leafletAllMarkers.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
});

const debouncedRenderAds = debounce((ads) => {
  closePopup();
  leafletAllMarkers.innerHTML = '';
  leafletAllMarkers.prepend(leafletMarkerDraggable);
  renderSimilarList(ads);
}, RERENDER_DELAY);

let selectedOptions = [];

const isMatchHousingFeatures = (arr, target) => {
  return (target.every((v) => arr.includes(v)));
};

mapFilters.addEventListener('change', () => {
  selectedOptions = selectsMapFilters.map(option => option.value);
  let checkboxValues = [];
  checkboxesHousingFeatures.forEach((checkbox) => {
    checkbox.checked ? checkboxValues.push(checkbox.value) : null;
  });
  const filterPins = copyAllAds.filter((el) =>
    (selectedOptions[0] === 'any' ? true : (el.offer.type === selectedOptions[0])) &&
    (selectedOptions[1] === 'any' ? true : (definePrice(el.offer.price))) &&
    (selectedOptions[2] === 'any' ? true : (el.offer.rooms === Number(selectedOptions[2]))) &&
    (selectedOptions[3] === 'any' ? true : (el.offer.guests === Number(selectedOptions[3]))) &&
    isMatchHousingFeatures(el.offer.features, checkboxValues),
  );
  debouncedRenderAds(filterPins);
});

const definePrice = (price) => {
  const selectHousingPrice = document.querySelector('[name="housing-price"]');
  const selectPriceText = selectHousingPrice.options[selectHousingPrice.selectedIndex].text;
  let splitMiddle
  let min;
  let max;
  let isPriceRequired;
  let lowPrice;
  let highPrice;
  switch (selectedOptions[1]) {
    case 'middle':
      splitMiddle = selectPriceText.split('-');
      min = parseInt(splitMiddle[0].replace(/[^\d]/g, ''));
      max = parseInt(splitMiddle[1].replace(/[^\d]/g, ''));
      isPriceRequired = (price >= min) && (price <= max);
      break;
    case 'low':
      lowPrice = parseInt(selectPriceText.replace(/[^\d]/g, ''));
      isPriceRequired = price < lowPrice;
      break;
    case 'high':
      highPrice = parseInt(selectPriceText.replace(/[^\d]/g, ''));
      isPriceRequired = price > highPrice;
      break;
    default:
      isPriceRequired = true;
  }
  return isPriceRequired;
};

export {closePopup};
