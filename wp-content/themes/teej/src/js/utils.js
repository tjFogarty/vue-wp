import noop from 'lodash/noop'

const Utils = {
  /**
   * Waits for the DOM to be ready
   * @param fn
   */
  documentReady (fn = noop) {
    if (document.readyState !== 'loading') {
      fn()
    } else {
      document.addEventListener('DOMContentLoaded', fn)
    }
  },

  /**
   * See if there's any code to be highlighted
   * if so, load a library
   */
  detectCodeHighlight () {
    if (document.querySelector('pre')) {
      Prism.highlightAll()
    }
  }
}

export default Utils
