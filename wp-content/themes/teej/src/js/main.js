import Utils from './utils';
import Barba from 'barba.js';

Utils.ready(() => {
  Barba.Pjax.start();
  Barba.Prefetch.init();
});
