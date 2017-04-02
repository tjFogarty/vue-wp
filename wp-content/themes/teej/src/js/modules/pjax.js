import Utils from '../utils';

const Pjax = {
  Barba: null,
  anime: null,

  init (Barba) {
    this.Barba = Barba;

    this.Barba.Pjax.start();
    this.Barba.Prefetch.init();

    this.addEvents();

    import('animejs')
      .then(anime => {
        this.anime = anime;
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
          opacity: 0
        });

        return animation.finish;
      },

      fadeIn: function () {
        let _this = this;
        let el = this.newContainer;

        this.oldContainer.style.display = 'none';

        el.style.visibility = 'visible';
        el.style.opacity = 0;

        window.scroll(0, 0);

        let animation = Pjax.anime({
          targets: el,
          opacity: 1
        });

        animation.complete = function () {
          _this.done();
        };
      }
    });

    this.Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };
  }
};

export default Pjax;
