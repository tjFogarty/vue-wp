import Utils from './utils';
import Pjax from './modules/pjax';

import('./analytics/base')
  .then(analytics => analytics.init());

Utils.documentReady(() => {
  Utils.detectCodeHighlight();
  Pjax.init();
});
