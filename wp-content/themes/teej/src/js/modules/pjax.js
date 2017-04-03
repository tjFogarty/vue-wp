import Utils from '../utils';

const Pjax = {
  Barba: null,
  anime: null,

  init () {
    Promise.all([
      import('barba.js'),
      import('animejs')
    ]).then(([Barba, anime]) => {
      this.Barba = Barba;
      this.anime = anime;

      this.Barba.Pjax.start();
      this.Barba.Prefetch.init();

      this.addEvents();
      this.setupTransitions();
    });
  },

  addEvents () {
    this.Barba.Dispatcher.on('newPageReady', () => {
      ga('send', 'pageview', window.location.pathname);
      Utils.detectCodeHighlight();
    });
  },

  setupTransitions () {
    let FadeTransition = this.Barba.BaseTransition.extend({
      start: function () {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function () {
        let animation = Pjax.anime({
          targets: this.oldContainer,
          opacity: 0,
          translateY: 30
        });

        return animation.finish;
      },

      fadeIn: function () {
        let el = this.newContainer;

        this.oldContainer.style.display = 'none';

        el.style.visibility = 'visible';
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';

        window.scroll(0, 0);

        let animation = Pjax.anime({
          targets: el,
          opacity: 1,
          translateY: 0
        });

        animation.complete = () => {
          this.done();
        };
      }
    });

    this.Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };
  }
};

export default Pjax;
