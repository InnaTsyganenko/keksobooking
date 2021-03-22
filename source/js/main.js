import './api.js';
import './map.js';
import './similar-ads.js';
import './util.js';
import './filters.js';
import './ad-form-notification.js';
import './ad-form-validation.js';
import './ad-form-upload-avatar.js';
import './ad-form-upload-housing-images.js';
import {getData} from './api.js';
import {renderSimilarList} from './similar-ads.js';
import {mapFilters} from './map.js';

getData((ads) => {
  renderSimilarList(ads);
  mapFilters.classList.remove('map__filters--disabled');
  document.querySelectorAll('.map__filters > *').forEach((item) => {
    item.disabled = false;
  })
});
