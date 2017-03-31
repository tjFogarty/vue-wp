import Utils from './utils';
import Barba from 'barba.js';
import * as analytics from './analytics/base.js';

Utils.ready(() => {
  analytics.init();
  Barba.Pjax.start();
  Barba.Prefetch.init();

  // track page views when using pjax
  Barba.Dispatcher.on('newPageReady', () => {
    ga('send', 'pageview', window.location.pathname);
  });

  Barba.Dispatcher.on('transitionCompleted', () => {
    Prism.highlightAll();
  });

});
