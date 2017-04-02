const Utils = {
  documentReady (fn = () => {}) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },

  detectCodeHighlight () {
    if (document.querySelector('pre')) {
      import('prismjs')
        .then(Prism => Prism.highlightAll());
    }
  }
};

export default Utils;
