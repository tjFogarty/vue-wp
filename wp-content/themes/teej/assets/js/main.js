webpackJsonp([3],{

/***/ 100:
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

var listToStyles = __webpack_require__(159)

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

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(155);
module.exports = __webpack_require__(408);


/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_meta__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(407);







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

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(157)
}
var normalizeComponent = __webpack_require__(96)
/* script */
var __vue_script__ = __webpack_require__(160)
/* template */
var __vue_template__ = __webpack_require__(166)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(158);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(100)("a860a1ec", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56f60701\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56f60701\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(99)(true);
// imports


// module
exports.push([module.i, "\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity .2s ease;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0\n}\n", "", {"version":3,"sources":["/Users/tjfogarty/Code/tjwp/wp-content/themes/teej/src/js/App.vue?1c286ad4"],"names":[],"mappings":";AA2BA;;EAEA,6BAAA;CACA;AAEA;;EAEA,UAAA;CACA","file":"App.vue","sourcesContent":["<template>\n  <div>\n    <site-header></site-header>\n    <transition name=\"fade\" appear mode=\"out-in\">\n      <router-view></router-view>\n    </transition>\n  </div>\n</template>\n\n<script>\nimport { mapGetters } from 'vuex'\nimport SiteHeader from './features/header/index.vue'\n\nexport default {\n  name: 'App',\n\n  metaInfo() {\n    return {\n      title: window.WP_SETTINGS.siteName\n    }\n  },\n\n  components: { SiteHeader }\n}\n</script>\n\n<style>\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity .2s ease;\n}\n\n.fade-enter,\n.fade-leave-active {\n  opacity: 0\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 159:
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

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__features_header_index_vue__ = __webpack_require__(161);
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


  components: { SiteHeader: __WEBPACK_IMPORTED_MODULE_1__features_header_index_vue___default.a }
});

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var normalizeComponent = __webpack_require__(96)
/* script */
var __vue_script__ = __webpack_require__(164)
/* template */
var __vue_template__ = __webpack_require__(165)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-22db4de2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/features/header/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(163);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(100)("f7295e70", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22db4de2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22db4de2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(99)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 164:
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

/***/ 165:
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
     require("vue-hot-reload-api").rerender("data-v-22db4de2", module.exports)
  }
}

/***/ }),

/***/ 166:
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
     require("vue-hot-reload-api").rerender("data-v-56f60701", module.exports)
  }
}

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_posts__ = __webpack_require__(168);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["default"]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["default"].Store({
  modules: {
    posts: __WEBPACK_IMPORTED_MODULE_2__modules_posts__["a" /* default */]
  }
}));

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_polyfill__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_polyfill__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




var state = {
  all: [],
  post: null,
  error: ''
};

var getters = {
  allPosts: function allPosts(state) {
    return state.all;
  },
  post: function post(state) {
    return state.post;
  },
  route: function route(state) {
    return state.route;
  },
  pagination: function pagination(state) {
    if (!state.all._paging) return null;
    var links = state.all._paging.links;


    var nextPage = links.next || null;
    var prevPage = links.prev || null;

    return {
      next: nextPage ? nextPage.split('page=')[1] : null,
      prev: prevPage ? prevPage.split('page=')[1] : null
    };
  }
};

var actions = {
  getAllPosts: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var commit = _ref2.commit;
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var posts;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].posts().page(page);

            case 3:
              posts = _context.sent;


              commit('RECIEVE_POSTS', { posts: posts });
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 7]]);
    }));

    return function getAllPosts(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  getSinglePost: function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(context, _ref4) {
      var slug = _ref4.slug;
      var singlePost, categories;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              context.commit('RECIEVE_POST', {
                post: null
              });

              _context2.prev = 1;
              _context2.next = 4;
              return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].posts().slug(slug);

            case 4:
              singlePost = _context2.sent;
              _context2.next = 7;
              return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].categories().forPost(singlePost[0].id);

            case 7:
              categories = _context2.sent;


              context.commit('RECIEVE_POST', {
                post: _extends({}, singlePost[0], {
                  categories: categories
                })
              });
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2['catch'](1);

              console.log(_context2.t0);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[1, 11]]);
    }));

    return function getSinglePost(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }()
};

var mutations = {
  RECIEVE_POSTS: function RECIEVE_POSTS(state, _ref5) {
    var posts = _ref5.posts;

    state.all = posts;
  },

  RECIEVE_POST: function RECIEVE_POST(state, _ref6) {
    var post = _ref6.post;

    state.post = post;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wpapi__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wpapi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wpapi__);


/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_wpapi___default.a({
  endpoint: window.WP_API_SETTINGS.root,
  nonce: window.WP_API_SETTINGS.nonce
}));

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(153);



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

var PostList = function PostList() {
  return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 412));
};

var SinglePost = function SinglePost() {
  return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 413));
};

var routes = [{
  path: '/',
  component: PostList,
  alias: 'home'
}, {
  path: '/page/:page',
  component: PostList
}, {
  path: '/page',
  redirect: '/'
}, {
  path: '/page/1',
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

/***/ 408:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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


/***/ }),

/***/ 99:
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


/***/ })

},[154]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9BcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9BcHAudnVlPzJlYjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0FwcC52dWU/MmMyMCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy9BcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlPzFkNTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWU/OWY1OSIsIndlYnBhY2s6Ly8vaW5kZXgudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlPzdlZTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0FwcC52dWU/ZmZiOSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0b3JlL21vZHVsZXMvcG9zdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0b3JlL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcm91dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIl0sIm5hbWVzIjpbIlZ1ZSIsInVzZSIsInN5bmMiLCJlbCIsInN0b3JlIiwicm91dGVyIiwicmVuZGVyIiwiaCIsIlZ1ZXgiLCJTdG9yZSIsIm1vZHVsZXMiLCJwb3N0cyIsInN0YXRlIiwiYWxsIiwicG9zdCIsImVycm9yIiwiZ2V0dGVycyIsImFsbFBvc3RzIiwicm91dGUiLCJwYWdpbmF0aW9uIiwiX3BhZ2luZyIsImxpbmtzIiwibmV4dFBhZ2UiLCJuZXh0IiwicHJldlBhZ2UiLCJwcmV2Iiwic3BsaXQiLCJhY3Rpb25zIiwiZ2V0QWxsUG9zdHMiLCJjb21taXQiLCJwYWdlIiwiYXBpIiwiY29uc29sZSIsImxvZyIsImdldFNpbmdsZVBvc3QiLCJjb250ZXh0Iiwic2x1ZyIsInNpbmdsZVBvc3QiLCJjYXRlZ29yaWVzIiwiZm9yUG9zdCIsImlkIiwibXV0YXRpb25zIiwiUkVDSUVWRV9QT1NUUyIsIlJFQ0lFVkVfUE9TVCIsImVuZHBvaW50Iiwid2luZG93IiwiV1BfQVBJX1NFVFRJTkdTIiwicm9vdCIsIm5vbmNlIiwiUG9zdExpc3QiLCJTaW5nbGVQb3N0Iiwicm91dGVzIiwicGF0aCIsImNvbXBvbmVudCIsImFsaWFzIiwicmVkaXJlY3QiLCJtb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25ELElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGNBQWM7O0FBRWxFO0FBQ0EiLCJmaWxlIjoiYXNzZXRzL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IHsgc3luYyB9IGZyb20gJ3Z1ZXgtcm91dGVyLXN5bmMnXG5pbXBvcnQgTWV0YSBmcm9tICd2dWUtbWV0YSdcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAudnVlJ1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVyJ1xuXG5WdWUudXNlKE1ldGEpXG5cbnN5bmMoc3RvcmUsIHJvdXRlcilcblxuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3ICovXG5uZXcgVnVlKHtcbiAgZWw6ICcjYXBwJyxcbiAgc3RvcmUsXG4gIHJvdXRlcixcbiAgcmVuZGVyOiBoID0+IGgoQXBwKVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tYWluLmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi01NmY2MDcwMVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHAudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3JcXFwiXX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9BcHAudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi01NmY2MDcwMVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9BcHAudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9BcHAudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBBcHAudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTU2ZjYwNzAxXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNTZmNjA3MDFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSAxNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTU2ZjYwNzAxXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImE4NjBhMWVjXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTU2ZjYwNzAxXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTZmNjA3MDFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi01NmY2MDcwMVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3JjL2pzL0FwcC52dWVcbi8vIG1vZHVsZSBpZCA9IDE1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmZhZGUtZW50ZXItYWN0aXZlLFxcbi5mYWRlLWxlYXZlLWFjdGl2ZSB7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4ycyBlYXNlO1xcbn1cXG4uZmFkZS1lbnRlcixcXG4uZmFkZS1sZWF2ZS1hY3RpdmUge1xcbiAgb3BhY2l0eTogMFxcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3RqZm9nYXJ0eS9Db2RlL3Rqd3Avd3AtY29udGVudC90aGVtZXMvdGVlai9zcmMvanMvQXBwLnZ1ZT8xYzI4NmFkNFwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBMkJBOztFQUVBLDZCQUFBO0NBQ0E7QUFFQTs7RUFFQSxVQUFBO0NBQ0FcIixcImZpbGVcIjpcIkFwcC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgPGRpdj5cXG4gICAgPHNpdGUtaGVhZGVyPjwvc2l0ZS1oZWFkZXI+XFxuICAgIDx0cmFuc2l0aW9uIG5hbWU9XFxcImZhZGVcXFwiIGFwcGVhciBtb2RlPVxcXCJvdXQtaW5cXFwiPlxcbiAgICAgIDxyb3V0ZXItdmlldz48L3JvdXRlci12aWV3PlxcbiAgICA8L3RyYW5zaXRpb24+XFxuICA8L2Rpdj5cXG48L3RlbXBsYXRlPlxcblxcbjxzY3JpcHQ+XFxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gJ3Z1ZXgnXFxuaW1wb3J0IFNpdGVIZWFkZXIgZnJvbSAnLi9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlJ1xcblxcbmV4cG9ydCBkZWZhdWx0IHtcXG4gIG5hbWU6ICdBcHAnLFxcblxcbiAgbWV0YUluZm8oKSB7XFxuICAgIHJldHVybiB7XFxuICAgICAgdGl0bGU6IHdpbmRvdy5XUF9TRVRUSU5HUy5zaXRlTmFtZVxcbiAgICB9XFxuICB9LFxcblxcbiAgY29tcG9uZW50czogeyBTaXRlSGVhZGVyIH1cXG59XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlPlxcbi5mYWRlLWVudGVyLWFjdGl2ZSxcXG4uZmFkZS1sZWF2ZS1hY3RpdmUge1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMnMgZWFzZTtcXG59XFxuXFxuLmZhZGUtZW50ZXIsXFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDBcXG59XFxuPC9zdHlsZT5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNTZmNjA3MDFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9qcy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSAxNThcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxzaXRlLWhlYWRlcj48L3NpdGUtaGVhZGVyPlxuICAgIDx0cmFuc2l0aW9uIG5hbWU9XCJmYWRlXCIgYXBwZWFyIG1vZGU9XCJvdXQtaW5cIj5cbiAgICAgIDxyb3V0ZXItdmlldz48L3JvdXRlci12aWV3PlxuICAgIDwvdHJhbnNpdGlvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gJ3Z1ZXgnXG5pbXBvcnQgU2l0ZUhlYWRlciBmcm9tICcuL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ0FwcCcsXG5cbiAgbWV0YUluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB3aW5kb3cuV1BfU0VUVElOR1Muc2l0ZU5hbWVcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50czogeyBTaXRlSGVhZGVyIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4uZmFkZS1lbnRlci1hY3RpdmUsXG4uZmFkZS1sZWF2ZS1hY3RpdmUge1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4ycyBlYXNlO1xufVxuXG4uZmFkZS1lbnRlcixcbi5mYWRlLWxlYXZlLWFjdGl2ZSB7XG4gIG9wYWNpdHk6IDBcbn1cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEFwcC52dWU/MWMyODZhZDQiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIyZGI0ZGUyXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vaW5kZXgudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3JcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9pbmRleC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTIyZGI0ZGUyXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vaW5kZXgudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtMjJkYjRkZTJcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBpbmRleC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjJkYjRkZTJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yMmRiNGRlMlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2ZlYXR1cmVzL2hlYWRlci9pbmRleC52dWVcbi8vIG1vZHVsZSBpZCA9IDE2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjJkYjRkZTJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9pbmRleC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImY3Mjk1ZTcwXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIyZGI0ZGUyXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaW5kZXgudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIyZGI0ZGUyXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaW5kZXgudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTIyZGI0ZGUyXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlXG4vLyBtb2R1bGUgaWQgPSAxNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJpbmRleC52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0yMmRiNGRlMlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zcmMvanMvZmVhdHVyZXMvaGVhZGVyL2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIjx0ZW1wbGF0ZT5cbiAgPG5hdiBjbGFzcz1cIm5hdmJhclwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgYXJpYS1sYWJlbD1cIm1haW4gbmF2aWdhdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItYnJhbmRcIj5cbiAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzcz1cIm5hdmJhci1pdGVtXCI+SG9tZTwvcm91dGVyLWxpbms+XG4gICAgICBcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gbmF2YmFyLWJ1cmdlclwiIEBjbGljaz1cInRvZ2dsZU5hdmlnYXRpb25cIj5cbiAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItbWVudVwiIHJlZj1cIm5hdmlnYXRpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItc3RhcnRcIj5cbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdmJhci1pdGVtXCI+QWJvdXQ8L2E+XG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuYXZiYXItaXRlbVwiPkNvbnRhY3Q8L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1lbmRcIj5cbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdmJhci1pdGVtXCI+R2l0aHViPC9hPlxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwibmF2YmFyLWl0ZW1cIj5Ud2l0dGVyPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9uYXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnU2l0ZUhlYWRlcicsXG4gIFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlTmF2aWdhdGlvbiAoKSB7XG4gICAgICB0aGlzLiRyZWZzLm5hdmlnYXRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJylcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICBcbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaW5kZXgudnVlPzM1NzliYmUxIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIm5hdlwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdmJhclwiLFxuICAgICAgYXR0cnM6IHsgcm9sZTogXCJuYXZpZ2F0aW9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIm1haW4gbmF2aWdhdGlvblwiIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1icmFuZFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2YmFyLWl0ZW1cIiwgYXR0cnM6IHsgdG86IFwiL1wiIH0gfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJIb21lXCIpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBuYXZiYXItYnVyZ2VyXCIsXG4gICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0udG9nZ2xlTmF2aWdhdGlvbiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwic3BhblwiKSwgX3ZtLl92KFwiIFwiKSwgX2MoXCJzcGFuXCIpLCBfdm0uX3YoXCIgXCIpLCBfYyhcInNwYW5cIildXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcIm5hdmlnYXRpb25cIiwgc3RhdGljQ2xhc3M6IFwibmF2YmFyLW1lbnVcIiB9LCBbXG4gICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLl9tKDEpXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuYXZiYXItc3RhcnRcIiB9LCBbXG4gICAgICBfYyhcImFcIiwgeyBzdGF0aWNDbGFzczogXCJuYXZiYXItaXRlbVwiLCBhdHRyczogeyBocmVmOiBcIiNcIiB9IH0sIFtcbiAgICAgICAgX3ZtLl92KFwiQWJvdXRcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYVwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1pdGVtXCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJDb250YWN0XCIpXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibmF2YmFyLWVuZFwiIH0sIFtcbiAgICAgIF9jKFwiYVwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1pdGVtXCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJHaXRodWJcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYVwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdmJhci1pdGVtXCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJUd2l0dGVyXCIpXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0yMmRiNGRlMlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMjJkYjRkZTJcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3NyYy9qcy9mZWF0dXJlcy9oZWFkZXIvaW5kZXgudnVlXG4vLyBtb2R1bGUgaWQgPSAxNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF9jKFwic2l0ZS1oZWFkZXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidHJhbnNpdGlvblwiLFxuICAgICAgICB7IGF0dHJzOiB7IG5hbWU6IFwiZmFkZVwiLCBhcHBlYXI6IFwiXCIsIG1vZGU6IFwib3V0LWluXCIgfSB9LFxuICAgICAgICBbX2MoXCJyb3V0ZXItdmlld1wiKV0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNTZmNjA3MDFcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTU2ZjYwNzAxXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc3JjL2pzL0FwcC52dWVcbi8vIG1vZHVsZSBpZCA9IDE2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnXG5pbXBvcnQgcG9zdHMgZnJvbSAnLi9tb2R1bGVzL3Bvc3RzJ1xuXG5WdWUudXNlKFZ1ZXgpXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcbiAgbW9kdWxlczoge1xuICAgIHBvc3RzXG4gIH1cbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RvcmUvaW5kZXguanMiLCJpbXBvcnQgYXBpIGZyb20gJy4uL2FwaSdcbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbmNvbnN0IHN0YXRlID0ge1xuICBhbGw6IFtdLFxuICBwb3N0OiBudWxsLFxuICBlcnJvcjogJydcbn1cblxuY29uc3QgZ2V0dGVycyA9IHtcbiAgYWxsUG9zdHM6IHN0YXRlID0+IHN0YXRlLmFsbCxcbiAgcG9zdDogc3RhdGUgPT4gc3RhdGUucG9zdCxcbiAgcm91dGU6IHN0YXRlID0+IHN0YXRlLnJvdXRlLFxuICBwYWdpbmF0aW9uOiBzdGF0ZSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5hbGwuX3BhZ2luZykgcmV0dXJuIG51bGxcbiAgICBsZXQgeyBsaW5rcyB9ID0gc3RhdGUuYWxsLl9wYWdpbmdcblxuICAgIGxldCBuZXh0UGFnZSA9IGxpbmtzLm5leHQgfHwgbnVsbFxuICAgIGxldCBwcmV2UGFnZSA9IGxpbmtzLnByZXYgfHwgbnVsbFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IG5leHRQYWdlID8gbmV4dFBhZ2Uuc3BsaXQoJ3BhZ2U9JylbMV0gOiBudWxsLFxuICAgICAgcHJldjogcHJldlBhZ2UgPyBwcmV2UGFnZS5zcGxpdCgncGFnZT0nKVsxXSA6IG51bGxcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgYWN0aW9ucyA9IHtcbiAgZ2V0QWxsUG9zdHM6IGFzeW5jICh7IGNvbW1pdCB9LCBwYWdlID0gMSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcG9zdHMgPSBhd2FpdCBhcGkucG9zdHMoKS5wYWdlKHBhZ2UpXG5cbiAgICAgIGNvbW1pdCgnUkVDSUVWRV9QT1NUUycsIHsgcG9zdHMgfSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9XG4gIH0sXG5cbiAgZ2V0U2luZ2xlUG9zdDogYXN5bmMgKGNvbnRleHQsIHsgc2x1ZyB9KSA9PiB7XG4gICAgY29udGV4dC5jb21taXQoJ1JFQ0lFVkVfUE9TVCcsIHtcbiAgICAgIHBvc3Q6IG51bGxcbiAgICB9KVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBzaW5nbGVQb3N0ID0gYXdhaXQgYXBpLnBvc3RzKCkuc2x1ZyhzbHVnKVxuICAgICAgbGV0IGNhdGVnb3JpZXMgPSBhd2FpdCBhcGkuY2F0ZWdvcmllcygpLmZvclBvc3Qoc2luZ2xlUG9zdFswXS5pZClcblxuICAgICAgY29udGV4dC5jb21taXQoJ1JFQ0lFVkVfUE9TVCcsIHtcbiAgICAgICAgcG9zdDoge1xuICAgICAgICAgIC4uLnNpbmdsZVBvc3RbMF0sXG4gICAgICAgICAgY2F0ZWdvcmllc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBtdXRhdGlvbnMgPSB7XG4gIFJFQ0lFVkVfUE9TVFM6IChzdGF0ZSwgeyBwb3N0cyB9KSA9PiB7XG4gICAgc3RhdGUuYWxsID0gcG9zdHNcbiAgfSxcblxuICBSRUNJRVZFX1BPU1Q6IChzdGF0ZSwgeyBwb3N0IH0pID0+IHtcbiAgICBzdGF0ZS5wb3N0ID0gcG9zdFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3RhdGUsXG4gIGdldHRlcnMsXG4gIGFjdGlvbnMsXG4gIG11dGF0aW9uc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0b3JlL21vZHVsZXMvcG9zdHMuanMiLCJpbXBvcnQgV1BBUEkgZnJvbSAnd3BhcGknXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXUEFQSSh7XG4gIGVuZHBvaW50OiB3aW5kb3cuV1BfQVBJX1NFVFRJTkdTLnJvb3QsXG4gIG5vbmNlOiB3aW5kb3cuV1BfQVBJX1NFVFRJTkdTLm5vbmNlXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0b3JlL2FwaS5qcyIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd2dWUtcm91dGVyJ1xuXG5WdWUudXNlKFZ1ZVJvdXRlcilcblxuY29uc3QgUG9zdExpc3QgPSAoKSA9PiB7XG4gIHJldHVybiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJwb3N0LWxpc3RcIiAqLyAnLi9mZWF0dXJlcy9wb3N0cy9Qb3N0TGlzdC52dWUnKVxufVxuXG5jb25zdCBTaW5nbGVQb3N0ID0gKCkgPT4ge1xuICByZXR1cm4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwic2luZ2xlLXBvc3RcIiAqLyAnLi9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZScpXG59XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICcvJyxcbiAgICBjb21wb25lbnQ6IFBvc3RMaXN0LFxuICAgIGFsaWFzOiAnaG9tZSdcbiAgfSxcbiAge1xuICAgIHBhdGg6ICcvcGFnZS86cGFnZScsXG4gICAgY29tcG9uZW50OiBQb3N0TGlzdFxuICB9LFxuICB7XG4gICAgcGF0aDogJy9wYWdlJyxcbiAgICByZWRpcmVjdDogJy8nXG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnL3BhZ2UvMScsXG4gICAgcmVkaXJlY3Q6ICcvJ1xuICB9LFxuICB7XG4gICAgcGF0aDogJy86c2x1ZycsXG4gICAgY29tcG9uZW50OiBTaW5nbGVQb3N0XG4gIH1cbl1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZVJvdXRlcih7XG4gIG1vZGU6ICdoaXN0b3J5JyxcbiAgcm91dGVzXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3JvdXRlci5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gdGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJzb3VyY2VSb290IjoiIn0=