webpackJsonp([0],{

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(96)
/* script */
var __vue_script__ = __webpack_require__(416)
/* template */
var __vue_template__ = __webpack_require__(417)
/* styles */
var __vue_styles__ = null
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
Component.options.__file = "src/js/features/posts/SinglePost.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SinglePost.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00ea30f6", Component.options)
  } else {
    hotAPI.reload("data-v-00ea30f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_helpers__ = __webpack_require__(424);
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
  name: 'SinglePost',

  metaInfo: function metaInfo() {
    return {
      title: this.post ? this.post.title.rendered : window.WP_SETTINGS.siteName
    };
  },


  computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['post']),

  mounted: function mounted() {
    var _this = this;

    window.scrollTo(0, 0);
    this.$store.dispatch('getSinglePost', { slug: this.$route.params.slug }).then(function () {
      Object(__WEBPACK_IMPORTED_MODULE_1__post_helpers__["a" /* loadCodePenEmbeds */])();

      if (_this.$el.querySelector('pre code')) {
        Object(__WEBPACK_IMPORTED_MODULE_1__post_helpers__["b" /* loadSyntaxHighlighter */])();
      }
    });
  }
});

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.post
    ? _c("div", [
        _c("section", { staticClass: "hero is-bold is-dark" }, [
          _c("div", { staticClass: "hero-body" }, [
            _c("div", { staticClass: "container has-text-centered" }, [
              _c("h1", { staticClass: "title" }, [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.post.title.rendered) +
                    "\n        "
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "section wrapper" }, [
          _vm.post.categories && _vm.post.categories.length
            ? _c(
                "div",
                _vm._l(_vm.post.categories, function(cat) {
                  return _c(
                    "span",
                    { key: cat.slug, staticClass: "tag is-warning" },
                    [_vm._v("\n          " + _vm._s(cat.name) + "\n        ")]
                  )
                })
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", {
            staticClass: "content",
            domProps: { innerHTML: _vm._s(_vm.post.content.rendered) }
          })
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-00ea30f6", module.exports)
  }
}

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadCodePenEmbeds;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadSyntaxHighlighter;
function loadScript(src) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = src;
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
}

function loadStyle(src) {
  var s = document.createElement('link');
  s.rel = 'stylesheet';
  s.href = src;
  var x = document.getElementsByTagName('link')[0];
  x.parentNode.insertBefore(s, x);
}

function loadCodePenEmbeds() {
  if (document.querySelector('.codepen')) {
    loadScript('https://production-assets.codepen.io/assets/embed/ei.js');
  }
}

function loadSyntaxHighlighter() {
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/prism.min.js');
  loadStyle('https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/themes/prism-solarizedlight.min.css');
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWUiLCJ3ZWJwYWNrOi8vL1NpbmdsZVBvc3QudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZT8yMTcwIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9wb3N0LWhlbHBlcnMuanMiXSwibmFtZXMiOlsibG9hZFNjcmlwdCIsInNyYyIsInMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYXN5bmMiLCJ4IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibG9hZFN0eWxlIiwicmVsIiwiaHJlZiIsImxvYWRDb2RlUGVuRW1iZWRzIiwicXVlcnlTZWxlY3RvciIsImxvYWRTeW50YXhIaWdobGlnaHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBa1I7QUFDbFI7QUFDQSw4Q0FBa0o7QUFDbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBOztBQUVBO1FBR0E7O2dDQUNBOzt1RUFHQTtBQUZBO0FBSUE7OztzRUFFQTs7O0FBQ0E7O3VCQUNBO3FFQUNBLHlCQUNBO0FBRUE7OytDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyQkEsRzs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0NBQXNDO0FBQzdELHFCQUFxQiwyQkFBMkI7QUFDaEQsdUJBQXVCLDZDQUE2QztBQUNwRSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlDQUFpQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsK0NBQStDO0FBQ3BFO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7QUNsREE7QUFBQSxTQUFTQSxVQUFULENBQXFCQyxHQUFyQixFQUEwQjtBQUN4QixNQUFJQyxJQUFJQyxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQVI7QUFDQUYsSUFBRUcsSUFBRixHQUFTLGlCQUFUO0FBQ0FILElBQUVJLEtBQUYsR0FBVSxJQUFWO0FBQ0FKLElBQUVELEdBQUYsR0FBUUEsR0FBUjtBQUNBLE1BQUlNLElBQUlKLFNBQVNLLG9CQUFULENBQThCLFFBQTlCLEVBQXdDLENBQXhDLENBQVI7QUFDQUQsSUFBRUUsVUFBRixDQUFhQyxZQUFiLENBQTBCUixDQUExQixFQUE2QkssQ0FBN0I7QUFDRDs7QUFFRCxTQUFTSSxTQUFULENBQW9CVixHQUFwQixFQUF5QjtBQUN2QixNQUFJQyxJQUFJQyxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQVI7QUFDQUYsSUFBRVUsR0FBRixHQUFRLFlBQVI7QUFDQVYsSUFBRVcsSUFBRixHQUFTWixHQUFUO0FBQ0EsTUFBSU0sSUFBSUosU0FBU0ssb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBUjtBQUNBRCxJQUFFRSxVQUFGLENBQWFDLFlBQWIsQ0FBMEJSLENBQTFCLEVBQTZCSyxDQUE3QjtBQUNEOztBQUVNLFNBQVNPLGlCQUFULEdBQThCO0FBQ25DLE1BQUlYLFNBQVNZLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBSixFQUF3QztBQUN0Q2YsZUFBVyx5REFBWDtBQUNEO0FBQ0Y7O0FBRU0sU0FBU2dCLHFCQUFULEdBQWtDO0FBQ3ZDaEIsYUFBVyxpRUFBWDtBQUNBVyxZQUNFLHdGQURGO0FBR0QsQyIsImZpbGUiOiJzaW5nbGUtcG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3JcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TaW5nbGVQb3N0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDBlYTMwZjZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU2luZ2xlUG9zdC52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFNpbmdsZVBvc3QudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTAwZWEzMGY2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMDBlYTMwZjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiB2LWlmPVwicG9zdFwiPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwiaGVybyBpcy1ib2xkIGlzLWRhcmtcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBoYXMtdGV4dC1jZW50ZXJlZFwiPlxuICAgICAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgICAgICB7eyBwb3N0LnRpdGxlLnJlbmRlcmVkIH19XG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24gd3JhcHBlclwiPlxuICAgICAgPGRpdiB2LWlmPVwicG9zdC5jYXRlZ29yaWVzICYmIHBvc3QuY2F0ZWdvcmllcy5sZW5ndGhcIj5cbiAgICAgICAgICA8c3BhbiB2LWZvcj1cImNhdCBpbiBwb3N0LmNhdGVnb3JpZXNcIiA6a2V5PVwiY2F0LnNsdWdcIiBjbGFzcz1cInRhZyBpcy13YXJuaW5nXCI+XG4gICAgICAgICAgICB7eyBjYXQubmFtZSB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICBcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCIgdi1odG1sPVwicG9zdC5jb250ZW50LnJlbmRlcmVkXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEdldHRlcnMgfSBmcm9tICd2dWV4J1xuaW1wb3J0IHsgbG9hZENvZGVQZW5FbWJlZHMsIGxvYWRTeW50YXhIaWdobGlnaHRlciB9IGZyb20gJy4vcG9zdC1oZWxwZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdTaW5nbGVQb3N0JyxcbiAgXG4gIG1ldGFJbmZvICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMucG9zdCA/IHRoaXMucG9zdC50aXRsZS5yZW5kZXJlZCA6IHdpbmRvdy5XUF9TRVRUSU5HUy5zaXRlTmFtZVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDogbWFwR2V0dGVycyhbJ3Bvc3QnXSksXG5cbiAgbW91bnRlZCgpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0U2luZ2xlUG9zdCcsIHsgc2x1ZzogdGhpcy4kcm91dGUucGFyYW1zLnNsdWcgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9hZENvZGVQZW5FbWJlZHMoKVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ3ByZSBjb2RlJykpIHtcbiAgICAgICAgICBsb2FkU3ludGF4SGlnaGxpZ2h0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG59XG48L3NjcmlwdD5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFNpbmdsZVBvc3QudnVlPzJhNjQ3ZWEyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0ucG9zdFxuICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJoZXJvIGlzLWJvbGQgaXMtZGFya1wiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlcm8tYm9keVwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyIGhhcy10ZXh0LWNlbnRlcmVkXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImgxXCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnBvc3QudGl0bGUucmVuZGVyZWQpICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzZWN0aW9uIHdyYXBwZXJcIiB9LCBbXG4gICAgICAgICAgX3ZtLnBvc3QuY2F0ZWdvcmllcyAmJiBfdm0ucG9zdC5jYXRlZ29yaWVzLmxlbmd0aFxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIF92bS5fbChfdm0ucG9zdC5jYXRlZ29yaWVzLCBmdW5jdGlvbihjYXQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBjYXQuc2x1Zywgc3RhdGljQ2xhc3M6IFwidGFnIGlzLXdhcm5pbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgIFwiICsgX3ZtLl9zKGNhdC5uYW1lKSArIFwiXFxuICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5wb3N0LmNvbnRlbnQucmVuZGVyZWQpIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICA6IF92bS5fZSgpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wMGVhMzBmNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMDBlYTMwZjZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWVcbi8vIG1vZHVsZSBpZCA9IDQxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMpIHtcbiAgbGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICBzLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICBzLmFzeW5jID0gdHJ1ZVxuICBzLnNyYyA9IHNyY1xuICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXVxuICB4LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHMsIHgpXG59XG5cbmZ1bmN0aW9uIGxvYWRTdHlsZSAoc3JjKSB7XG4gIGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gIHMucmVsID0gJ3N0eWxlc2hlZXQnXG4gIHMuaHJlZiA9IHNyY1xuICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJylbMF1cbiAgeC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzLCB4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvZGVQZW5FbWJlZHMgKCkge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvZGVwZW4nKSkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vcHJvZHVjdGlvbi1hc3NldHMuY29kZXBlbi5pby9hc3NldHMvZW1iZWQvZWkuanMnKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU3ludGF4SGlnaGxpZ2h0ZXIgKCkge1xuICBsb2FkU2NyaXB0KCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9wcmlzbS8xLjguMS9wcmlzbS5taW4uanMnKVxuICBsb2FkU3R5bGUoXG4gICAgJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3ByaXNtLzEuOC4xL3RoZW1lcy9wcmlzbS1zb2xhcml6ZWRsaWdodC5taW4uY3NzJ1xuICApXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvcG9zdC1oZWxwZXJzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==