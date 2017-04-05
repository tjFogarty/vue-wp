import Utils from '../utils';
import Barba from 'barba.js';

/**
 * This object is responsible for any PJAX-related functionality
 * @type {Object}
 */
const Pjax = {
  /**
   * Load all our dependencies
   * when they're done, kick things off
   * @return {void}
   */
  init () {
    Barba.Pjax.start();
    Barba.Prefetch.init();

    this.addEvents();
  },

  /**
   * Any events we need to hook into
   */
  addEvents () {
    Barba.Dispatcher.on('newPageReady', () => {
      ga('send', 'pageview', window.location.pathname);
      Utils.detectCodeHighlight();
    });
  }
};

export default Pjax;
