webpackJsonp([1],{t8iB:function(e,t){function n(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname)}function o(e){if(e||(e={}),n()){navigator.serviceWorker.register("/wp-content/themes/teej/sw.js")}else if(window.applicationCache){var t=function(){var e=document.createElement("iframe");e.src="/wp-content/themes/teej/appcache/manifest.html",e.style.display="none",c=e,document.body.appendChild(e)};return void("complete"===document.readyState?setTimeout(t):window.addEventListener("load",t))}}function i(e,t){}function a(){if(n()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()}),c)try{c.contentWindow.applicationCache.update()}catch(e){}}var c;t.install=o,t.applyUpdate=i,t.update=a}});