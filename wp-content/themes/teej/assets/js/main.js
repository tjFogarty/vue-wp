webpackJsonp([3],{

/***/ 101:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(162)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RECIEVE_POSTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RECIEVE_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RECIEVE_CATEGORIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SET_LOADING; });
var RECIEVE_POSTS = 'RECIEVE_POSTS';
var RECIEVE_POST = 'RECIEVE_POST';
var RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES';
var SET_LOADING = 'SET_LOADING';

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
module.exports = __webpack_require__(415);


/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_meta__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(414);







__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_vue_meta___default.a);

Object(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__router__["a" /* default */]);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  store: __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */],
  router: __WEBPACK_IMPORTED_MODULE_5__router__["a" /* default */],
  render: function render(h) {
    return h(__WEBPACK_IMPORTED_MODULE_3__App_vue___default.a);
  }
});

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var normalizeComponent = __webpack_require__(98)
/* script */
var __vue_script__ = __webpack_require__(163)
/* template */
var __vue_template__ = __webpack_require__(169)
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56f60701", Component.options)
  } else {
    hotAPI.reload("data-v-56f60701", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(161);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(102)("093f927c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56f60701\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./App.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56f60701\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(101)(true);
// imports


// module
exports.push([module.i, "\n.fade-enter-active,\n.fade-leave-active {\n  -webkit-transition: opacity .2s ease, -webkit-transform ease 0.2s;\n  transition: opacity .2s ease, -webkit-transform ease 0.2s;\n  transition: opacity .2s ease, transform ease 0.2s;\n  transition: opacity .2s ease, transform ease 0.2s, -webkit-transform ease 0.2s;\n  will-change: opacity, transform;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n  -webkit-transform: translateY(5px);\n          transform: translateY(5px);\n}\n.wrapper {\n  max-width: 1000px;\n  margin: 0 auto;\n}\n", "", {"version":3,"sources":["/Users/tjfogarty/Code/tjwp/wp-content/themes/teej/src/js/src/js/App.vue?2e0b92ca"],"names":[],"mappings":";AAqCA;;EAEA,kEAAA;EAAA,0DAAA;EAAA,kDAAA;EAAA,+EAAA;EACA,gCAAA;CACA;AAEA;;EAEA,WAAA;EACA,mCAAA;UAAA,2BAAA;CACA;AAEA;EACA,kBAAA;EACA,eAAA;CACA","file":"App.vue","sourcesContent":["<template>\n  <div>\n    <site-header></site-header>\n    <transition name=\"fade\" appear mode=\"out-in\">\n      <router-view></router-view>\n    </transition>\n  </div>\n</template>\n\n<script>\nimport { mapActions, mapGetters } from 'vuex'\nimport SiteHeader from './features/header/index.vue'\n\nexport default {\n  name: 'App',\n\n  metaInfo() {\n    return {\n      title: window.WP_SETTINGS.siteName\n    }\n  },\n  \n  components: { SiteHeader },\n  \n  computed: mapGetters(['categories']),\n\n  mounted () {\n    if (!this.categories.length) {\n      this.getCategories()\n    }\n  },\n  \n  methods: mapActions(['getCategories'])\n}\n</script>\n\n<style>\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity .2s ease, transform ease 0.2s;\n  will-change: opacity, transform;\n}\n\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n  transform: translateY(5px);\n}\n\n.wrapper {\n  max-width: 1000px;\n  margin: 0 auto;\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 162:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__features_header_index_vue__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__features_header_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__features_header_index_vue__);
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'App',

  metaInfo: function metaInfo() {
    return {
      title: window.WP_SETTINGS.siteName
    };
  },


  components: { SiteHeader: __WEBPACK_IMPORTED_MODULE_1__features_header_index_vue___default.a },

  computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['categories']),

  mounted: function mounted() {
    if (!this.categories.length) {
      this.getCategories();
    }
  },


  methods: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapActions"])(['getCategories'])
});

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var normalizeComponent = __webpack_require__(98)
/* script */
var __vue_script__ = __webpack_require__(167)
/* template */
var __vue_template__ = __webpack_require__(168)
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-22db4de2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/features/header/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22db4de2", Component.options)
  } else {
    hotAPI.reload("data-v-22db4de2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(166);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(102)("2c531bc0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22db4de2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22db4de2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(101)(true);
// imports


// module
exports.push([module.i, "\n.navbar[data-v-22db4de2] {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 1;\n  top: 0;\n}\n", "", {"version":3,"sources":["/Users/tjfogarty/Code/tjwp/wp-content/themes/teej/src/js/features/header/src/js/features/header/index.vue?7438c5f6"],"names":[],"mappings":";AAwCA;EACA,yBAAA;EAAA,iBAAA;EACA,WAAA;EACA,OAAA;CACA","file":"index.vue","sourcesContent":["<template>\n  <nav class=\"navbar\" role=\"navigation\" aria-label=\"main navigation\">\n    <div class=\"navbar-brand\">\n      <router-link to=\"/\" class=\"navbar-item\">Home</router-link>\n      \n      <button class=\"button navbar-burger\" @click=\"toggleNavigation\">\n        <span></span>\n        <span></span>\n        <span></span>\n      </button>\n    </div>\n    \n    <div class=\"navbar-menu\" ref=\"navigation\">\n      <div class=\"navbar-start\">\n        <a href=\"#\" class=\"navbar-item\">About</a>\n        <a href=\"#\" class=\"navbar-item\">Contact</a>\n      </div>\n      \n      <div class=\"navbar-end\">\n        <a href=\"#\" class=\"navbar-item\">Github</a>\n        <a href=\"#\" class=\"navbar-item\">Twitter</a>\n      </div>\n    </div>\n\n  </nav>\n</template>\n\n<script>\nexport default {\n  name: 'SiteHeader',\n  \n  methods: {\n    toggleNavigation () {\n      this.$refs.navigation.classList.toggle('is-active')\n    }\n  }\n}\n</script>\n\n<style scoped>\n.navbar {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'SiteHeader',

  methods: {
    toggleNavigation: function toggleNavigation() {
      this.$refs.navigation.classList.toggle('is-active');
    }
  }
});

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "nav",
    {
      staticClass: "navbar",
      attrs: { role: "navigation", "aria-label": "main navigation" }
    },
    [
      _c(
        "div",
        { staticClass: "navbar-brand" },
        [
          _c(
            "router-link",
            { staticClass: "navbar-item", attrs: { to: "/" } },
            [_vm._v("Home")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "button navbar-burger",
              on: { click: _vm.toggleNavigation }
            },
            [_c("span"), _vm._v(" "), _c("span"), _vm._v(" "), _c("span")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { ref: "navigation", staticClass: "navbar-menu" }, [
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1)
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "navbar-start" }, [
      _c("a", { staticClass: "navbar-item", attrs: { href: "#" } }, [
        _vm._v("About")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "navbar-item", attrs: { href: "#" } }, [
        _vm._v("Contact")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "navbar-end" }, [
      _c("a", { staticClass: "navbar-item", attrs: { href: "#" } }, [
        _vm._v("Github")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "navbar-item", attrs: { href: "#" } }, [
        _vm._v("Twitter")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-22db4de2", module.exports)
  }
}

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("site-header"),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "fade", appear: "", mode: "out-in" } },
        [_c("router-view")],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-56f60701", module.exports)
  }
}

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_posts__ = __webpack_require__(171);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["default"]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["default"].Store({
  modules: {
    posts: __WEBPACK_IMPORTED_MODULE_2__modules_posts__["a" /* default */]
  }
}));

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(175);





/* harmony default export */ __webpack_exports__["a"] = ({
  state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
  getters: __WEBPACK_IMPORTED_MODULE_2__getters__,
  actions: __WEBPACK_IMPORTED_MODULE_3__actions__,
  mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* default */]
});

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  all: [],
  post: null,
  error: '',
  categories: [],
  isLoading: false
});

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(103);
var _types$RECIEVE_POSTS$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = (_types$RECIEVE_POSTS$ = {}, _defineProperty(_types$RECIEVE_POSTS$, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["c" /* RECIEVE_POSTS */], function (state, _ref) {
  var posts = _ref.posts;

  state.all = posts;
}), _defineProperty(_types$RECIEVE_POSTS$, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["b" /* RECIEVE_POST */], function (state, _ref2) {
  var post = _ref2.post;

  state.post = post;
}), _defineProperty(_types$RECIEVE_POSTS$, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["a" /* RECIEVE_CATEGORIES */], function (state, _ref3) {
  var categories = _ref3.categories;

  state.categories = categories;
}), _defineProperty(_types$RECIEVE_POSTS$, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["d" /* SET_LOADING */], function (state, _ref4) {
  var isLoading = _ref4.isLoading;

  state.isLoading = isLoading;
}), _types$RECIEVE_POSTS$);

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allPosts", function() { return allPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoading", function() { return isLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categories", function() { return categories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentCategories", function() { return currentCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagination", function() { return pagination; });
var allPosts = function allPosts(state) {
  return state.all;
};

var post = function post(state) {
  return state.post;
};

var route = function route(state) {
  return state.route;
};

var isLoading = function isLoading(state) {
  return state.isLoading;
};

var categories = function categories(state) {
  return state.categories;
};

var currentCategories = function currentCategories(_ref) {
  var categories = _ref.categories,
      post = _ref.post;

  if (!post || !post.categories.length) return [];

  return categories.filter(function (c) {
    return post.categories.includes(c.id);
  });
};

var pagination = function pagination(state) {
  if (!state.all._paging) return null;

  var links = state.all._paging.links;

  var nextPage = links.next || null;
  var prevPage = links.prev || null;

  return {
    next: nextPage ? nextPage.split('page=')[1] : null,
    prev: prevPage ? prevPage.split('page=')[1] : null
  };
};

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPosts", function() { return getAllPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSinglePost", function() { return getSinglePost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCategories", function() { return getCategories; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutation_types__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_polyfill__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_polyfill__);
var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





var getAllPosts = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var commit = _ref2.commit;
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* SET_LOADING */], { isLoading: true });

            _context.prev = 1;
            _context.next = 4;
            return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].posts().page(page);

          case 4:
            posts = _context.sent;

            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["c" /* RECIEVE_POSTS */], { posts: posts });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            console.log(_context.t0);

          case 11:

            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* SET_LOADING */], { isLoading: false });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[1, 8]]);
  }));

  return function getAllPosts(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSinglePost = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4, _ref5) {
    var commit = _ref4.commit;
    var slug = _ref5.slug;
    var singlePost;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* SET_LOADING */], { isLoading: true });

            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["b" /* RECIEVE_POST */], {
              post: null
            });

            _context2.prev = 2;
            _context2.next = 5;
            return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].posts().slug(slug);

          case 5:
            singlePost = _context2.sent;

            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["b" /* RECIEVE_POST */], {
              post: singlePost[0]
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](2);

            console.log(_context2.t0);

          case 12:

            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* SET_LOADING */], { isLoading: false });

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[2, 9]]);
  }));

  return function getSinglePost(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var getCategories = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
    var commit = _ref7.commit;
    var categories;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].categories();

          case 2:
            categories = _context3.sent;

            commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["a" /* RECIEVE_CATEGORIES */], { categories: categories });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function getCategories(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wpapi__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wpapi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wpapi__);


/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_wpapi___default.a({
  endpoint: window.WP_API_SETTINGS.root,
  nonce: window.WP_API_SETTINGS.nonce
}));

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(154);



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

var PostList = function PostList() {
  return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 422));
};

var SinglePost = function SinglePost() {
  return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 423));
};

var routes = [{
  path: '/',
  component: PostList,
  alias: 'home'
}, {
  path: '/page/1',
  redirect: '/'
}, {
  path: '/page/:page',
  component: PostList
}, {
  path: '/page',
  redirect: '/'
}, {
  path: '/:slug',
  component: SinglePost
}];

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]({
  mode: 'history',
  routes: routes
}));

/***/ }),

/***/ 415:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 98:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ })

},[155]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RvcmUvbW9kdWxlcy9wb3N0cy9tdXRhdGlvbi10eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvQXBwLnZ1ZT84MTFiIiwid2VicGFjazovLy8uL3NyYy9qcy9BcHAudnVlPzUyZTIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL0FwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWU/ZDJhZCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvaGVhZGVyL2luZGV4LnZ1ZT9jOTA4Iiwid2VicGFjazovLy9zcmMvanMvZmVhdHVyZXMvaGVhZGVyL2luZGV4LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvaGVhZGVyL2luZGV4LnZ1ZT80YjFjIiwid2VicGFjazovLy8uL3NyYy9qcy9BcHAudnVlP2QyOTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdG9yZS9tb2R1bGVzL3Bvc3RzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdG9yZS9tb2R1bGVzL3Bvc3RzL3N0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdG9yZS9tb2R1bGVzL3Bvc3RzL211dGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RvcmUvbW9kdWxlcy9wb3N0cy9nZXR0ZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdG9yZS9tb2R1bGVzL3Bvc3RzL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0b3JlL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcm91dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiXSwibmFtZXMiOlsiUkVDSUVWRV9QT1NUUyIsIlJFQ0lFVkVfUE9TVCIsIlJFQ0lFVkVfQ0FURUdPUklFUyIsIlNFVF9MT0FESU5HIiwiVnVlIiwidXNlIiwic3luYyIsImVsIiwic3RvcmUiLCJyb3V0ZXIiLCJyZW5kZXIiLCJoIiwiVnVleCIsIlN0b3JlIiwibW9kdWxlcyIsInBvc3RzIiwic3RhdGUiLCJnZXR0ZXJzIiwiYWN0aW9ucyIsIm11dGF0aW9ucyIsImFsbCIsInBvc3QiLCJlcnJvciIsImNhdGVnb3JpZXMiLCJpc0xvYWRpbmciLCJhbGxQb3N0cyIsInJvdXRlIiwiY3VycmVudENhdGVnb3JpZXMiLCJsZW5ndGgiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImMiLCJpZCIsInBhZ2luYXRpb24iLCJfcGFnaW5nIiwibGlua3MiLCJuZXh0UGFnZSIsIm5leHQiLCJwcmV2UGFnZSIsInByZXYiLCJzcGxpdCIsImdldEFsbFBvc3RzIiwiY29tbWl0IiwicGFnZSIsImFwaSIsImNvbnNvbGUiLCJsb2ciLCJnZXRTaW5nbGVQb3N0Iiwic2x1ZyIsInNpbmdsZVBvc3QiLCJnZXRDYXRlZ29yaWVzIiwiZW5kcG9pbnQiLCJ3aW5kb3ciLCJXUF9BUElfU0VUVElOR1MiLCJyb290Iiwibm9uY2UiLCJQb3N0TGlzdCIsIlNpbmdsZVBvc3QiLCJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiYWxp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Y2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsImV4cG9ydCBjb25zdCBSRUNJRVZFX1BPU1RTID0gJ1JFQ0lFVkVfUE9TVFMnXG5leHBvcnQgY29uc3QgUkVDSUVWRV9QT1NUID0gJ1JFQ0lFVkVfUE9TVCdcbmV4cG9ydCBjb25zdCBSRUNJRVZFX0NBVEVHT1JJRVMgPSAnUkVDSUVWRV9DQVRFR09SSUVTJ1xuZXhwb3J0IGNvbnN0IFNFVF9MT0FESU5HID0gJ1NFVF9MT0FESU5HJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0b3JlL21vZHVsZXMvcG9zdHMvbXV0YXRpb24tdHlwZXMuanMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHN5bmMgfSBmcm9tICd2dWV4LXJvdXRlci1zeW5jJ1xuaW1wb3J0IE1ldGEgZnJvbSAndnVlLW1ldGEnXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLnZ1ZSdcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJ1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcidcblxuVnVlLnVzZShNZXRhKVxuXG5zeW5jKHN0b3JlLCByb3V0ZXIpXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xubmV3IFZ1ZSh7XG4gIGVsOiAnI2FwcCcsXG4gIHN0b3JlLFxuICByb3V0ZXIsXG4gIHJlbmRlcjogaCA9PiBoKEFwcClcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbWFpbi5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTZmNjA3MDFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL0FwcC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3JcXFwiXX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vQXBwLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTZmNjA3MDFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vQXBwLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xuICB2YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvQXBwLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7ICByZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkgeyAgY29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNTZmNjA3MDFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi01NmY2MDcwMVwiLCBDb21wb25lbnQub3B0aW9ucylcbicgKyAnICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvQXBwLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi01NmY2MDcwMVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vQXBwLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMDkzZjkyN2NcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTZmNjA3MDFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL0FwcC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTZmNjA3MDFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL0FwcC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNTZmNjA3MDFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9zcmMvanMvQXBwLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uZmFkZS1lbnRlci1hY3RpdmUsXFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAuMnMgZWFzZSwgLXdlYmtpdC10cmFuc2Zvcm0gZWFzZSAwLjJzO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMnMgZWFzZSwgLXdlYmtpdC10cmFuc2Zvcm0gZWFzZSAwLjJzO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMnMgZWFzZSwgdHJhbnNmb3JtIGVhc2UgMC4ycztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjJzIGVhc2UsIHRyYW5zZm9ybSBlYXNlIDAuMnMsIC13ZWJraXQtdHJhbnNmb3JtIGVhc2UgMC4ycztcXG4gIHdpbGwtY2hhbmdlOiBvcGFjaXR5LCB0cmFuc2Zvcm07XFxufVxcbi5mYWRlLWVudGVyLFxcbi5mYWRlLWxlYXZlLWFjdGl2ZSB7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDVweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIG1heC13aWR0aDogMTAwMHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvdGpmb2dhcnR5L0NvZGUvdGp3cC93cC1jb250ZW50L3RoZW1lcy90ZWVqL3NyYy9qcy9zcmMvanMvQXBwLnZ1ZT8yZTBiOTJjYVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBcUNBOztFQUVBLGtFQUFBO0VBQUEsMERBQUE7RUFBQSxrREFBQTtFQUFBLCtFQUFBO0VBQ0EsZ0NBQUE7Q0FDQTtBQUVBOztFQUVBLFdBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0NBQ0E7QUFFQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtDQUNBXCIsXCJmaWxlXCI6XCJBcHAudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG4gIDxkaXY+XFxuICAgIDxzaXRlLWhlYWRlcj48L3NpdGUtaGVhZGVyPlxcbiAgICA8dHJhbnNpdGlvbiBuYW1lPVxcXCJmYWRlXFxcIiBhcHBlYXIgbW9kZT1cXFwib3V0LWluXFxcIj5cXG4gICAgICA8cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz5cXG4gICAgPC90cmFuc2l0aW9uPlxcbiAgPC9kaXY+XFxuPC90ZW1wbGF0ZT5cXG5cXG48c2NyaXB0PlxcbmltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMgfSBmcm9tICd2dWV4J1xcbmltcG9ydCBTaXRlSGVhZGVyIGZyb20gJy4vZmVhdHVyZXMvaGVhZGVyL2luZGV4LnZ1ZSdcXG5cXG5leHBvcnQgZGVmYXVsdCB7XFxuICBuYW1lOiAnQXBwJyxcXG5cXG4gIG1ldGFJbmZvKCkge1xcbiAgICByZXR1cm4ge1xcbiAgICAgIHRpdGxlOiB3aW5kb3cuV1BfU0VUVElOR1Muc2l0ZU5hbWVcXG4gICAgfVxcbiAgfSxcXG4gIFxcbiAgY29tcG9uZW50czogeyBTaXRlSGVhZGVyIH0sXFxuICBcXG4gIGNvbXB1dGVkOiBtYXBHZXR0ZXJzKFsnY2F0ZWdvcmllcyddKSxcXG5cXG4gIG1vdW50ZWQgKCkge1xcbiAgICBpZiAoIXRoaXMuY2F0ZWdvcmllcy5sZW5ndGgpIHtcXG4gICAgICB0aGlzLmdldENhdGVnb3JpZXMoKVxcbiAgICB9XFxuICB9LFxcbiAgXFxuICBtZXRob2RzOiBtYXBBY3Rpb25zKFsnZ2V0Q2F0ZWdvcmllcyddKVxcbn1cXG48L3NjcmlwdD5cXG5cXG48c3R5bGU+XFxuLmZhZGUtZW50ZXItYWN0aXZlLFxcbi5mYWRlLWxlYXZlLWFjdGl2ZSB7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4ycyBlYXNlLCB0cmFuc2Zvcm0gZWFzZSAwLjJzO1xcbiAgd2lsbC1jaGFuZ2U6IG9wYWNpdHksIHRyYW5zZm9ybTtcXG59XFxuXFxuLmZhZGUtZW50ZXIsXFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KTtcXG59XFxuXFxuLndyYXBwZXIge1xcbiAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuPC9zdHlsZT5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNTZmNjA3MDFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9zcmMvanMvQXBwLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8c2l0ZS1oZWFkZXI+PC9zaXRlLWhlYWRlcj5cbiAgICA8dHJhbnNpdGlvbiBuYW1lPVwiZmFkZVwiIGFwcGVhciBtb2RlPVwib3V0LWluXCI+XG4gICAgICA8cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz5cbiAgICA8L3RyYW5zaXRpb24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMgfSBmcm9tICd2dWV4J1xuaW1wb3J0IFNpdGVIZWFkZXIgZnJvbSAnLi9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdBcHAnLFxuXG4gIG1ldGFJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogd2luZG93LldQX1NFVFRJTkdTLnNpdGVOYW1lXG4gICAgfVxuICB9LFxuICBcbiAgY29tcG9uZW50czogeyBTaXRlSGVhZGVyIH0sXG4gIFxuICBjb21wdXRlZDogbWFwR2V0dGVycyhbJ2NhdGVnb3JpZXMnXSksXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgaWYgKCF0aGlzLmNhdGVnb3JpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdldENhdGVnb3JpZXMoKVxuICAgIH1cbiAgfSxcbiAgXG4gIG1ldGhvZHM6IG1hcEFjdGlvbnMoWydnZXRDYXRlZ29yaWVzJ10pXG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMnMgZWFzZSwgdHJhbnNmb3JtIGVhc2UgMC4ycztcbiAgd2lsbC1jaGFuZ2U6IG9wYWNpdHksIHRyYW5zZm9ybTtcbn1cblxuLmZhZGUtZW50ZXIsXG4uZmFkZS1sZWF2ZS1hY3RpdmUge1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KTtcbn1cblxuLndyYXBwZXIge1xuICBtYXgtd2lkdGg6IDEwMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG48L3N0eWxlPlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvQXBwLnZ1ZT8yZTBiOTJjYSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjJkYjRkZTJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vaW5kZXgudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInN5bnRheC1keW5hbWljLWltcG9ydFxcXCIsXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFxcXCJ0cmFuc2Zvcm0tYXN5bmMtdG8tZ2VuZXJhdG9yXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL2luZGV4LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjJkYjRkZTJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWUsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9pbmRleC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbiAgdmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtMjJkYjRkZTJcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkgeyAgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHsgIGNvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTIyZGI0ZGUyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjJkYjRkZTJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4nICsgJyAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWVcbi8vIG1vZHVsZSBpZCA9IDE2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjJkYjRkZTJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vaW5kZXgudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIyYzUzMWJjMFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yMmRiNGRlMlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9pbmRleC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjJkYjRkZTJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vaW5kZXgudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTIyZGI0ZGUyXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9zcmMvanMvZmVhdHVyZXMvaGVhZGVyL2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubmF2YmFyW2RhdGEtdi0yMmRiNGRlMl0ge1xcbiAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5O1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG4gIHotaW5kZXg6IDE7XFxuICB0b3A6IDA7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvdGpmb2dhcnR5L0NvZGUvdGp3cC93cC1jb250ZW50L3RoZW1lcy90ZWVqL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWU/NzQzOGM1ZjZcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQXdDQTtFQUNBLHlCQUFBO0VBQUEsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsT0FBQTtDQUNBXCIsXCJmaWxlXCI6XCJpbmRleC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgPG5hdiBjbGFzcz1cXFwibmF2YmFyXFxcIiByb2xlPVxcXCJuYXZpZ2F0aW9uXFxcIiBhcmlhLWxhYmVsPVxcXCJtYWluIG5hdmlnYXRpb25cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJuYXZiYXItYnJhbmRcXFwiPlxcbiAgICAgIDxyb3V0ZXItbGluayB0bz1cXFwiL1xcXCIgY2xhc3M9XFxcIm5hdmJhci1pdGVtXFxcIj5Ib21lPC9yb3V0ZXItbGluaz5cXG4gICAgICBcXG4gICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidXR0b24gbmF2YmFyLWJ1cmdlclxcXCIgQGNsaWNrPVxcXCJ0b2dnbGVOYXZpZ2F0aW9uXFxcIj5cXG4gICAgICAgIDxzcGFuPjwvc3Bhbj5cXG4gICAgICAgIDxzcGFuPjwvc3Bhbj5cXG4gICAgICAgIDxzcGFuPjwvc3Bhbj5cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIFxcbiAgICA8ZGl2IGNsYXNzPVxcXCJuYXZiYXItbWVudVxcXCIgcmVmPVxcXCJuYXZpZ2F0aW9uXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJuYXZiYXItc3RhcnRcXFwiPlxcbiAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcIm5hdmJhci1pdGVtXFxcIj5BYm91dDwvYT5cXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXZiYXItaXRlbVxcXCI+Q29udGFjdDwvYT5cXG4gICAgICA8L2Rpdj5cXG4gICAgICBcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJuYXZiYXItZW5kXFxcIj5cXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXZiYXItaXRlbVxcXCI+R2l0aHViPC9hPlxcbiAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcIm5hdmJhci1pdGVtXFxcIj5Ud2l0dGVyPC9hPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvbmF2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5leHBvcnQgZGVmYXVsdCB7XFxuICBuYW1lOiAnU2l0ZUhlYWRlcicsXFxuICBcXG4gIG1ldGhvZHM6IHtcXG4gICAgdG9nZ2xlTmF2aWdhdGlvbiAoKSB7XFxuICAgICAgdGhpcy4kcmVmcy5uYXZpZ2F0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXFxuICAgIH1cXG4gIH1cXG59XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlIHNjb3BlZD5cXG4ubmF2YmFyIHtcXG4gIHBvc2l0aW9uOiBzdGlja3k7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbn1cXG48L3N0eWxlPlxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0yMmRiNGRlMlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWVcbi8vIG1vZHVsZSBpZCA9IDE2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCI8dGVtcGxhdGU+XG4gIDxuYXYgY2xhc3M9XCJuYXZiYXJcIiByb2xlPVwibmF2aWdhdGlvblwiIGFyaWEtbGFiZWw9XCJtYWluIG5hdmlnYXRpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+XG4gICAgICA8cm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3M9XCJuYXZiYXItaXRlbVwiPkhvbWU8L3JvdXRlci1saW5rPlxuICAgICAgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIG5hdmJhci1idXJnZXJcIiBAY2xpY2s9XCJ0b2dnbGVOYXZpZ2F0aW9uXCI+XG4gICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLW1lbnVcIiByZWY9XCJuYXZpZ2F0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLXN0YXJ0XCI+XG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuYXZiYXItaXRlbVwiPkFib3V0PC9hPlxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwibmF2YmFyLWl0ZW1cIj5Db250YWN0PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItZW5kXCI+XG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuYXZiYXItaXRlbVwiPkdpdGh1YjwvYT5cbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdmJhci1pdGVtXCI+VHdpdHRlcjwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gIDwvbmF2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ1NpdGVIZWFkZXInLFxuICBcbiAgbWV0aG9kczoge1xuICAgIHRvZ2dsZU5hdmlnYXRpb24gKCkge1xuICAgICAgdGhpcy4kcmVmcy5uYXZpZ2F0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5uYXZiYXIge1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG59XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlPzc0MzhjNWY2IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIm5hdlwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdmJhclwiLFxuICAgICAgYXR0cnM6IHsgcm9sZTogXCJuYXZpZ2F0aW9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIm1haW4gbmF2aWdhdGlvblwiIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1icmFuZFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2YmFyLWl0ZW1cIiwgYXR0cnM6IHsgdG86IFwiL1wiIH0gfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJIb21lXCIpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBuYXZiYXItYnVyZ2VyXCIsXG4gICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0udG9nZ2xlTmF2aWdhdGlvbiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwic3BhblwiKSwgX3ZtLl92KFwiIFwiKSwgX2MoXCJzcGFuXCIpLCBfdm0uX3YoXCIgXCIpLCBfYyhcInNwYW5cIildXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcIm5hdmlnYXRpb25cIiwgc3RhdGljQ2xhc3M6IFwibmF2YmFyLW1lbnVcIiB9LCBbXG4gICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLl9tKDEpXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuYXZiYXItc3RhcnRcIiB9LCBbXG4gICAgICBfYyhcImFcIiwgeyBzdGF0aWNDbGFzczogXCJuYXZiYXItaXRlbVwiLCBhdHRyczogeyBocmVmOiBcIiNcIiB9IH0sIFtcbiAgICAgICAgX3ZtLl92KFwiQWJvdXRcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYVwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1pdGVtXCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJDb250YWN0XCIpXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibmF2YmFyLWVuZFwiIH0sIFtcbiAgICAgIF9jKFwiYVwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1pdGVtXCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJHaXRodWJcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYVwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1pdGVtXCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJUd2l0dGVyXCIpXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTIyZGI0ZGUyXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yMmRiNGRlMlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlXG4vLyBtb2R1bGUgaWQgPSAxNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF9jKFwic2l0ZS1oZWFkZXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidHJhbnNpdGlvblwiLFxuICAgICAgICB7IGF0dHJzOiB7IG5hbWU6IFwiZmFkZVwiLCBhcHBlYXI6IFwiXCIsIG1vZGU6IFwib3V0LWluXCIgfSB9LFxuICAgICAgICBbX2MoXCJyb3V0ZXItdmlld1wiKV0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi01NmY2MDcwMVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNTZmNjA3MDFcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vc3JjL2pzL0FwcC52dWVcbi8vIG1vZHVsZSBpZCA9IDE2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnXG5pbXBvcnQgcG9zdHMgZnJvbSAnLi9tb2R1bGVzL3Bvc3RzJ1xuXG5WdWUudXNlKFZ1ZXgpXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcbiAgbW9kdWxlczoge1xuICAgIHBvc3RzXG4gIH1cbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RvcmUvaW5kZXguanMiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zdGF0ZSdcbmltcG9ydCBtdXRhdGlvbnMgZnJvbSAnLi9tdXRhdGlvbnMnXG5pbXBvcnQgKiBhcyBnZXR0ZXJzIGZyb20gJy4vZ2V0dGVycydcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN0YXRlLFxuICBnZXR0ZXJzLFxuICBhY3Rpb25zLFxuICBtdXRhdGlvbnNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zdG9yZS9tb2R1bGVzL3Bvc3RzL2luZGV4LmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICBhbGw6IFtdLFxuICBwb3N0OiBudWxsLFxuICBlcnJvcjogJycsXG4gIGNhdGVnb3JpZXM6IFtdLFxuICBpc0xvYWRpbmc6IGZhbHNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RvcmUvbW9kdWxlcy9wb3N0cy9zdGF0ZS5qcyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vbXV0YXRpb24tdHlwZXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgW3R5cGVzLlJFQ0lFVkVfUE9TVFNdOiAoc3RhdGUsIHsgcG9zdHMgfSkgPT4ge1xuICAgIHN0YXRlLmFsbCA9IHBvc3RzXG4gIH0sXG5cbiAgW3R5cGVzLlJFQ0lFVkVfUE9TVF06IChzdGF0ZSwgeyBwb3N0IH0pID0+IHtcbiAgICBzdGF0ZS5wb3N0ID0gcG9zdFxuICB9LFxuXG4gIFt0eXBlcy5SRUNJRVZFX0NBVEVHT1JJRVNdOiAoc3RhdGUsIHsgY2F0ZWdvcmllcyB9KSA9PiB7XG4gICAgc3RhdGUuY2F0ZWdvcmllcyA9IGNhdGVnb3JpZXNcbiAgfSxcblxuICBbdHlwZXMuU0VUX0xPQURJTkddOiAoc3RhdGUsIHsgaXNMb2FkaW5nIH0pID0+IHtcbiAgICBzdGF0ZS5pc0xvYWRpbmcgPSBpc0xvYWRpbmdcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0b3JlL21vZHVsZXMvcG9zdHMvbXV0YXRpb25zLmpzIiwiZXhwb3J0IGNvbnN0IGFsbFBvc3RzID0gc3RhdGUgPT4gc3RhdGUuYWxsXG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gc3RhdGUgPT4gc3RhdGUucG9zdFxuXG5leHBvcnQgY29uc3Qgcm91dGUgPSBzdGF0ZSA9PiBzdGF0ZS5yb3V0ZVxuXG5leHBvcnQgY29uc3QgaXNMb2FkaW5nID0gc3RhdGUgPT4gc3RhdGUuaXNMb2FkaW5nXG5cbmV4cG9ydCBjb25zdCBjYXRlZ29yaWVzID0gc3RhdGUgPT4gc3RhdGUuY2F0ZWdvcmllc1xuXG5leHBvcnQgY29uc3QgY3VycmVudENhdGVnb3JpZXMgPSAoeyBjYXRlZ29yaWVzLCBwb3N0IH0pID0+IHtcbiAgaWYgKCFwb3N0IHx8ICFwb3N0LmNhdGVnb3JpZXMubGVuZ3RoKSByZXR1cm4gW11cblxuICByZXR1cm4gY2F0ZWdvcmllcy5maWx0ZXIoYyA9PiBwb3N0LmNhdGVnb3JpZXMuaW5jbHVkZXMoYy5pZCkpXG59XG5cbmV4cG9ydCBjb25zdCBwYWdpbmF0aW9uID0gc3RhdGUgPT4ge1xuICBpZiAoIXN0YXRlLmFsbC5fcGFnaW5nKSByZXR1cm4gbnVsbFxuXG4gIGxldCB7IGxpbmtzIH0gPSBzdGF0ZS5hbGwuX3BhZ2luZ1xuICBsZXQgbmV4dFBhZ2UgPSBsaW5rcy5uZXh0IHx8IG51bGxcbiAgbGV0IHByZXZQYWdlID0gbGlua3MucHJldiB8fCBudWxsXG5cbiAgcmV0dXJuIHtcbiAgICBuZXh0OiBuZXh0UGFnZSA/IG5leHRQYWdlLnNwbGl0KCdwYWdlPScpWzFdIDogbnVsbCxcbiAgICBwcmV2OiBwcmV2UGFnZSA/IHByZXZQYWdlLnNwbGl0KCdwYWdlPScpWzFdIDogbnVsbFxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RvcmUvbW9kdWxlcy9wb3N0cy9nZXR0ZXJzLmpzIiwiaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGknXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL211dGF0aW9uLXR5cGVzJ1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcblxuZXhwb3J0IGNvbnN0IGdldEFsbFBvc3RzID0gYXN5bmMgKHsgY29tbWl0IH0sIHBhZ2UgPSAxKSA9PiB7XG4gIGNvbW1pdCh0eXBlcy5TRVRfTE9BRElORywgeyBpc0xvYWRpbmc6IHRydWUgfSlcblxuICB0cnkge1xuICAgIGxldCBwb3N0cyA9IGF3YWl0IGFwaS5wb3N0cygpLnBhZ2UocGFnZSlcbiAgICBjb21taXQodHlwZXMuUkVDSUVWRV9QT1NUUywgeyBwb3N0cyB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG4gIH1cblxuICBjb21taXQodHlwZXMuU0VUX0xPQURJTkcsIHsgaXNMb2FkaW5nOiBmYWxzZSB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0U2luZ2xlUG9zdCA9IGFzeW5jICh7IGNvbW1pdCB9LCB7IHNsdWcgfSkgPT4ge1xuICBjb21taXQodHlwZXMuU0VUX0xPQURJTkcsIHsgaXNMb2FkaW5nOiB0cnVlIH0pXG5cbiAgY29tbWl0KHR5cGVzLlJFQ0lFVkVfUE9TVCwge1xuICAgIHBvc3Q6IG51bGxcbiAgfSlcblxuICB0cnkge1xuICAgIGxldCBzaW5nbGVQb3N0ID0gYXdhaXQgYXBpLnBvc3RzKCkuc2x1ZyhzbHVnKVxuICAgIGNvbW1pdCh0eXBlcy5SRUNJRVZFX1BPU1QsIHtcbiAgICAgIHBvc3Q6IHNpbmdsZVBvc3RbMF1cbiAgICB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG4gIH1cblxuICBjb21taXQodHlwZXMuU0VUX0xPQURJTkcsIHsgaXNMb2FkaW5nOiBmYWxzZSB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllcyA9IGFzeW5jICh7IGNvbW1pdCB9KSA9PiB7XG4gIGxldCBjYXRlZ29yaWVzID0gYXdhaXQgYXBpLmNhdGVnb3JpZXMoKVxuICBjb21taXQodHlwZXMuUkVDSUVWRV9DQVRFR09SSUVTLCB7IGNhdGVnb3JpZXMgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zdG9yZS9tb2R1bGVzL3Bvc3RzL2FjdGlvbnMuanMiLCJpbXBvcnQgV1BBUEkgZnJvbSAnd3BhcGknXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXUEFQSSh7XG4gIGVuZHBvaW50OiB3aW5kb3cuV1BfQVBJX1NFVFRJTkdTLnJvb3QsXG4gIG5vbmNlOiB3aW5kb3cuV1BfQVBJX1NFVFRJTkdTLm5vbmNlXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0b3JlL2FwaS5qcyIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd2dWUtcm91dGVyJ1xuXG5WdWUudXNlKFZ1ZVJvdXRlcilcblxuY29uc3QgUG9zdExpc3QgPSAoKSA9PiB7XG4gIHJldHVybiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJwb3N0LWxpc3RcIiAqLyAnLi9mZWF0dXJlcy9wb3N0cy9Qb3N0TGlzdC52dWUnKVxufVxuXG5jb25zdCBTaW5nbGVQb3N0ID0gKCkgPT4ge1xuICByZXR1cm4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwic2luZ2xlLXBvc3RcIiAqLyAnLi9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZScpXG59XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICcvJyxcbiAgICBjb21wb25lbnQ6IFBvc3RMaXN0LFxuICAgIGFsaWFzOiAnaG9tZSdcbiAgfSxcbiAge1xuICAgIHBhdGg6ICcvcGFnZS8xJyxcbiAgICByZWRpcmVjdDogJy8nXG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnL3BhZ2UvOnBhZ2UnLFxuICAgIGNvbXBvbmVudDogUG9zdExpc3RcbiAgfSxcbiAge1xuICAgIHBhdGg6ICcvcGFnZScsXG4gICAgcmVkaXJlY3Q6ICcvJ1xuICB9LFxuICB7XG4gICAgcGF0aDogJy86c2x1ZycsXG4gICAgY29tcG9uZW50OiBTaW5nbGVQb3N0XG4gIH1cbl1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZVJvdXRlcih7XG4gIG1vZGU6ICdoaXN0b3J5JyxcbiAgcm91dGVzXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3JvdXRlci5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gSU1QT1JUQU5UOiBEbyBOT1QgdXNlIEVTMjAxNSBmZWF0dXJlcyBpbiB0aGlzIGZpbGUuXG4vLyBUaGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGUuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgZnVuY3Rpb25hbFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgICBvcHRpb25zLl9jb21waWxlZCA9IHRydWVcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uYWwgdGVtcGxhdGVcbiAgaWYgKGZ1bmN0aW9uYWxUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWVcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuXG4gICAgaWYgKCFmdW5jdGlvbmFsKSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIHRlbXBsYXRlLW9ubHkgaG90LXJlbG9hZCBiZWNhdXNlIGluIHRoYXQgY2FzZSB0aGUgcmVuZGVyIGZuIGRvZXNuJ3RcbiAgICAgIC8vIGdvIHRocm91Z2ggdGhlIG5vcm1hbGl6ZXJcbiAgICAgIG9wdGlvbnMuX2luamVjdFN0eWxlcyA9IGhvb2tcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiXSwic291cmNlUm9vdCI6IiJ9