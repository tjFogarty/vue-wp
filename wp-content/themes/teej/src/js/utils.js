const Utils = {
  documentReady (fn = () => {}) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },

  /**
   * See if there's any code to be highlighted
   * if so, load a library
   * @return {void}
   */
  detectCodeHighlight () {
    if (document.querySelector('pre')) {
      import('prismjs')
        .then(Prism => Prism.highlightAll());
    }
  }
};

export default Utils;
