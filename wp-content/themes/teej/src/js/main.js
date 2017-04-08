import Utils from './utils';

import('./analytics/base')
  .then(analytics => analytics.init());

Utils.documentReady(() => {
  Utils.detectCodeHighlight();
});
