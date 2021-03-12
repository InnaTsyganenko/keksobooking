import {isInPage, isEscEvent, debounce} from './util.js';
import {renderSimilarList} from './similar-ads.js';
import {mapFilters} from './ad-form.js';

const RERENDER_DELAY = 500;

const leafletPane = document.querySelector('.leaflet-pane');
const leafletAllMarkers = document.querySelector('.leaflet-marker-pane');
const leafletMarkerDraggable = leafletPane.querySelector('.leaflet-marker-draggable');
const copyAllAds = JSON.parse(localStorage.getItem('copy_of_ads'));
const selects = [...document.querySelectorAll('.map__filter')];
const checkboxesHousingFeatures = document.querySelectorAll('.map__checkbox');

const popupClose = () => {
  if (isInPage(leafletPane.querySelector('.leaflet-popup'))) {
    document.querySelector('.leaflet-popup-close-button').click()
  }
};

leafletAllMarkers.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    popupClose();
  }
});

const renderAds = (cb) => {
  popupClose();
  leafletAllMarkers.innerHTML = '';
  leafletAllMarkers.prepend(leafletMarkerDraggable);
  let renderSimilarListDebounced = debounce(renderSimilarList, RERENDER_DELAY);
  return renderSimilarListDebounced(cb);
};

let selectedOption = [];

const matchHousingFeatures = (arr, target) => {
  return (target.every((v) => arr.includes(v)));
};

mapFilters.addEventListener('change', () => {
  selectedOption = selects.map(option => option.value);
  let checkboxValues = [];
  checkboxesHousingFeatures.forEach((checkbox) => {
    checkbox.checked ? checkboxValues.push(checkbox.value) : null;
  });
  const filterPins = copyAllAds.filter((el) =>
    (selectedOption[0] == 'any' ? true : (el.offer.type == selectedOption[0])) &&
    (selectedOption[1] == 'any' ? true : (definePrice(el.offer.price))) &&
    (selectedOption[2] == 'any' ? true : (el.offer.rooms == selectedOption[2])) &&
    (selectedOption[3] == 'any' ? true : (el.offer.guests == selectedOption[3])) &&
    matchHousingFeatures(el.offer.features, checkboxValues),
  );
  renderAds(filterPins);
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
  switch (selectedOption[1]) {
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
