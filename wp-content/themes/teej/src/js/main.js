import Utils from './utils';
import Pjax from './modules/pjax';

import('./analytics/base')
  .then(analytics => analytics.init());

Utils.documentReady(() => {
  let pre = document.querySelector('pre');

  import('barba.js')
    .then(Barba => Pjax.init(Barba));

  if (pre) {
    import('prismjs')
      .then(Prism => Prism.highlightAll());
  }
});
