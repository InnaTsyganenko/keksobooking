import './api.js';
import './map.js';
import './util.js';
import './filters.js';
import './similar-ads.js';
import './ad-form.js';
import {getData} from './api.js';
import {renderSimilarList} from './similar-ads.js';
import {mapFilters} from './ad-form.js';

getData((ads) => {
  renderSimilarList(ads);
  mapFilters.classList.remove('map__filters--disabled');
  document.querySelectorAll('.map__filters > *').forEach(function(item){
    item.disabled=false;
  })
});
