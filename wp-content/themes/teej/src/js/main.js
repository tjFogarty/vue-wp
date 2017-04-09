import Utils from './utils';

require('./modules/offline');

Utils.documentReady(() => {
  Utils.detectCodeHighlight();
});
