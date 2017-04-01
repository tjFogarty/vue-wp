const Utils = {
  documentReady (fn = () => {}) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
};

export default Utils;
