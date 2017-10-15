webpackJsonp([0],{

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(98)
/* script */
var __vue_script__ = __webpack_require__(426)
/* template */
var __vue_template__ = __webpack_require__(428)
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
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
Component.options.__file = "src/js/features/posts/SinglePost.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_helpers__ = __webpack_require__(427);
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


  computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['post', 'currentCategories']),

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

/***/ 427:
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

/***/ }),

/***/ 428:
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
          _vm.currentCategories && _vm.currentCategories.length
            ? _c(
                "div",
                _vm._l(_vm.currentCategories, function(cat) {
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
    require("vue-hot-reload-api")      .rerender("data-v-00ea30f6", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvcG9zdC1oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZT9mNGI1Il0sIm5hbWVzIjpbImxvYWRTY3JpcHQiLCJzcmMiLCJzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImFzeW5jIiwieCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImxvYWRTdHlsZSIsInJlbCIsImhyZWYiLCJsb2FkQ29kZVBlbkVtYmVkcyIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkU3ludGF4SGlnaGxpZ2h0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsNENBQW1UO0FBQ25UO0FBQ0EsOENBQWdMO0FBQ2hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usd0RBQXdELElBQUk7O0FBRTNJO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTs7QUFFQTtRQUdBOztnQ0FDQTs7dUVBR0E7QUFGQTtBQUlBOzs7OEVBRUE7OztBQUNBOzt1QkFDQTtxRUFDQSx5QkFDQTtBQUVBOzsrQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBckJBLEc7Ozs7Ozs7OztBQzdCQTtBQUFBLFNBQVNBLFVBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQ3hCLE1BQUlDLElBQUlDLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUjtBQUNBRixJQUFFRyxJQUFGLEdBQVMsaUJBQVQ7QUFDQUgsSUFBRUksS0FBRixHQUFVLElBQVY7QUFDQUosSUFBRUQsR0FBRixHQUFRQSxHQUFSO0FBQ0EsTUFBSU0sSUFBSUosU0FBU0ssb0JBQVQsQ0FBOEIsUUFBOUIsRUFBd0MsQ0FBeEMsQ0FBUjtBQUNBRCxJQUFFRSxVQUFGLENBQWFDLFlBQWIsQ0FBMEJSLENBQTFCLEVBQTZCSyxDQUE3QjtBQUNEOztBQUVELFNBQVNJLFNBQVQsQ0FBb0JWLEdBQXBCLEVBQXlCO0FBQ3ZCLE1BQUlDLElBQUlDLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUjtBQUNBRixJQUFFVSxHQUFGLEdBQVEsWUFBUjtBQUNBVixJQUFFVyxJQUFGLEdBQVNaLEdBQVQ7QUFDQSxNQUFJTSxJQUFJSixTQUFTSyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFSO0FBQ0FELElBQUVFLFVBQUYsQ0FBYUMsWUFBYixDQUEwQlIsQ0FBMUIsRUFBNkJLLENBQTdCO0FBQ0Q7O0FBRU0sU0FBU08saUJBQVQsR0FBOEI7QUFDbkMsTUFBSVgsU0FBU1ksYUFBVCxDQUF1QixVQUF2QixDQUFKLEVBQXdDO0FBQ3RDZixlQUFXLHlEQUFYO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTZ0IscUJBQVQsR0FBa0M7QUFDdkNoQixhQUFXLGlFQUFYO0FBQ0FXLFlBQ0Usd0ZBREY7QUFHRCxDOzs7Ozs7O0FDNUJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQ0FBc0M7QUFDN0QscUJBQXFCLDJCQUEyQjtBQUNoRCx1QkFBdUIsNkNBQTZDO0FBQ3BFLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwrQ0FBK0M7QUFDcEU7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiYXNzZXRzL2pzL2NodW5rcy9zaW5nbGUtcG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInN5bnRheC1keW5hbWljLWltcG9ydFxcXCIsXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFxcXCJ0cmFuc2Zvcm0tYXN5bmMtdG8tZ2VuZXJhdG9yXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL1NpbmdsZVBvc3QudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wMGVhMzBmNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9TaW5nbGVQb3N0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xuICB2YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7ICByZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkgeyAgY29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMDBlYTMwZjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wMGVhMzBmNlwiLCBDb21wb25lbnQub3B0aW9ucylcbicgKyAnICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWVcbi8vIG1vZHVsZSBpZCA9IDQyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gIDxkaXYgdi1pZj1cInBvc3RcIj5cbiAgICA8c2VjdGlvbiBjbGFzcz1cImhlcm8gaXMtYm9sZCBpcy1kYXJrXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVyby1ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaGFzLXRleHQtY2VudGVyZWRcIj5cbiAgICAgICAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAge3sgcG9zdC50aXRsZS5yZW5kZXJlZCB9fVxuICAgICAgICAgIDwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uIHdyYXBwZXJcIj5cbiAgICAgIDxkaXYgdi1pZj1cImN1cnJlbnRDYXRlZ29yaWVzICYmIGN1cnJlbnRDYXRlZ29yaWVzLmxlbmd0aFwiPlxuICAgICAgICAgIDxzcGFuIHYtZm9yPVwiY2F0IGluIGN1cnJlbnRDYXRlZ29yaWVzXCIgOmtleT1cImNhdC5zbHVnXCIgY2xhc3M9XCJ0YWcgaXMtd2FybmluZ1wiPlxuICAgICAgICAgICAge3sgY2F0Lm5hbWUgfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIHYtaHRtbD1cInBvc3QuY29udGVudC5yZW5kZXJlZFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSAndnVleCdcbmltcG9ydCB7IGxvYWRDb2RlUGVuRW1iZWRzLCBsb2FkU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICcuL3Bvc3QtaGVscGVycydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnU2luZ2xlUG9zdCcsXG4gIFxuICBtZXRhSW5mbyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnBvc3QgPyB0aGlzLnBvc3QudGl0bGUucmVuZGVyZWQgOiB3aW5kb3cuV1BfU0VUVElOR1Muc2l0ZU5hbWVcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IG1hcEdldHRlcnMoWydwb3N0JywgJ2N1cnJlbnRDYXRlZ29yaWVzJ10pLFxuXG4gIG1vdW50ZWQoKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2dldFNpbmdsZVBvc3QnLCB7IHNsdWc6IHRoaXMuJHJvdXRlLnBhcmFtcy5zbHVnIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvYWRDb2RlUGVuRW1iZWRzKClcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdwcmUgY29kZScpKSB7XG4gICAgICAgICAgbG9hZFN5bnRheEhpZ2hsaWdodGVyKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWU/ZTIxODJjZmMiLCJmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMpIHtcbiAgbGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICBzLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICBzLmFzeW5jID0gdHJ1ZVxuICBzLnNyYyA9IHNyY1xuICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXVxuICB4LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHMsIHgpXG59XG5cbmZ1bmN0aW9uIGxvYWRTdHlsZSAoc3JjKSB7XG4gIGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gIHMucmVsID0gJ3N0eWxlc2hlZXQnXG4gIHMuaHJlZiA9IHNyY1xuICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJylbMF1cbiAgeC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzLCB4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvZGVQZW5FbWJlZHMgKCkge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvZGVwZW4nKSkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vcHJvZHVjdGlvbi1hc3NldHMuY29kZXBlbi5pby9hc3NldHMvZW1iZWQvZWkuanMnKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU3ludGF4SGlnaGxpZ2h0ZXIgKCkge1xuICBsb2FkU2NyaXB0KCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9wcmlzbS8xLjguMS9wcmlzbS5taW4uanMnKVxuICBsb2FkU3R5bGUoXG4gICAgJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3ByaXNtLzEuOC4xL3RoZW1lcy9wcmlzbS1zb2xhcml6ZWRsaWdodC5taW4uY3NzJ1xuICApXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvcG9zdC1oZWxwZXJzLmpzIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0ucG9zdFxuICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJoZXJvIGlzLWJvbGQgaXMtZGFya1wiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlcm8tYm9keVwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyIGhhcy10ZXh0LWNlbnRlcmVkXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImgxXCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnBvc3QudGl0bGUucmVuZGVyZWQpICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzZWN0aW9uIHdyYXBwZXJcIiB9LCBbXG4gICAgICAgICAgX3ZtLmN1cnJlbnRDYXRlZ29yaWVzICYmIF92bS5jdXJyZW50Q2F0ZWdvcmllcy5sZW5ndGhcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLmN1cnJlbnRDYXRlZ29yaWVzLCBmdW5jdGlvbihjYXQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBjYXQuc2x1Zywgc3RhdGljQ2xhc3M6IFwidGFnIGlzLXdhcm5pbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgIFwiICsgX3ZtLl9zKGNhdC5uYW1lKSArIFwiXFxuICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5wb3N0LmNvbnRlbnQucmVuZGVyZWQpIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICA6IF92bS5fZSgpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTAwZWEzMGY2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wMGVhMzBmNlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWVcbi8vIG1vZHVsZSBpZCA9IDQyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9