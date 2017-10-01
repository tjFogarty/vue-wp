function loadScript (src) {
  let s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = src
  var x = document.getElementsByTagName('script')[0]
  x.parentNode.insertBefore(s, x)
}

function loadStyle (src) {
  let s = document.createElement('link')
  s.rel = 'stylesheet'
  s.href = src
  var x = document.getElementsByTagName('link')[0]
  x.parentNode.insertBefore(s, x)
}

export function loadCodePenEmbeds () {
  if (document.querySelector('.codepen')) {
    loadScript('https://production-assets.codepen.io/assets/embed/ei.js')
  }
}

export function loadSyntaxHighlighter () {
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/prism.min.js')
  loadStyle(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/themes/prism-solarizedlight.min.css'
  )
}
