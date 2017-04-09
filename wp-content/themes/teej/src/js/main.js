import Utils from './utils';
import SearchForm from './modules/search-form';

require('./modules/offline');

Utils.documentReady(() => {
  Utils.detectCodeHighlight();
  SearchForm.init();
});
