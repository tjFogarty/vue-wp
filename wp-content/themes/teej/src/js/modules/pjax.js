const Pjax = {
  Barba: null,

  init (Barba) {
    this.Barba = Barba;

    this.Barba.Pjax.start();
    this.Barba.Prefetch.init();

    this.addEvents();
  },

  addEvents () {
    // track page views when using pjax
    this.Barba.Dispatcher.on('newPageReady', () => {
      ga('send', 'pageview', window.location.pathname);
    });

    this.Barba.Dispatcher.on('transitionCompleted', () => {
      let pre = document.querySelector('pre');

      if (pre) {
        import('prismjs')
          .then(Prism => Prism.highlightAll());
      }
    });
  }
};

export default Pjax;
