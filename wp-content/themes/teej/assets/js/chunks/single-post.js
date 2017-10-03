webpackJsonp([0],{

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(96)
/* script */
var __vue_script__ = __webpack_require__(416)
/* template */
var __vue_template__ = __webpack_require__(418)
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_helpers__ = __webpack_require__(417);
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

/***/ 418:
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

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWUiLCJ3ZWJwYWNrOi8vL1NpbmdsZVBvc3QudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9wb3N0LWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ZlYXR1cmVzL3Bvc3RzL1NpbmdsZVBvc3QudnVlPzIxNzAiXSwibmFtZXMiOlsibG9hZFNjcmlwdCIsInNyYyIsInMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYXN5bmMiLCJ4IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibG9hZFN0eWxlIiwicmVsIiwiaHJlZiIsImxvYWRDb2RlUGVuRW1iZWRzIiwicXVlcnlTZWxlY3RvciIsImxvYWRTeW50YXhIaWdobGlnaHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBa1I7QUFDbFI7QUFDQSw4Q0FBa0o7QUFDbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBOztBQUVBO1FBR0E7O2dDQUNBOzt1RUFHQTtBQUZBO0FBSUE7OztzRUFFQTs7O0FBQ0E7O3VCQUNBO3FFQUNBLHlCQUNBO0FBRUE7OytDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyQkEsRzs7Ozs7Ozs7O0FDN0JBO0FBQUEsU0FBU0EsVUFBVCxDQUFxQkMsR0FBckIsRUFBMEI7QUFDeEIsTUFBSUMsSUFBSUMsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0FGLElBQUVHLElBQUYsR0FBUyxpQkFBVDtBQUNBSCxJQUFFSSxLQUFGLEdBQVUsSUFBVjtBQUNBSixJQUFFRCxHQUFGLEdBQVFBLEdBQVI7QUFDQSxNQUFJTSxJQUFJSixTQUFTSyxvQkFBVCxDQUE4QixRQUE5QixFQUF3QyxDQUF4QyxDQUFSO0FBQ0FELElBQUVFLFVBQUYsQ0FBYUMsWUFBYixDQUEwQlIsQ0FBMUIsRUFBNkJLLENBQTdCO0FBQ0Q7O0FBRUQsU0FBU0ksU0FBVCxDQUFvQlYsR0FBcEIsRUFBeUI7QUFDdkIsTUFBSUMsSUFBSUMsU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFSO0FBQ0FGLElBQUVVLEdBQUYsR0FBUSxZQUFSO0FBQ0FWLElBQUVXLElBQUYsR0FBU1osR0FBVDtBQUNBLE1BQUlNLElBQUlKLFNBQVNLLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQVI7QUFDQUQsSUFBRUUsVUFBRixDQUFhQyxZQUFiLENBQTBCUixDQUExQixFQUE2QkssQ0FBN0I7QUFDRDs7QUFFTSxTQUFTTyxpQkFBVCxHQUE4QjtBQUNuQyxNQUFJWCxTQUFTWSxhQUFULENBQXVCLFVBQXZCLENBQUosRUFBd0M7QUFDdENmLGVBQVcseURBQVg7QUFDRDtBQUNGOztBQUVNLFNBQVNnQixxQkFBVCxHQUFrQztBQUN2Q2hCLGFBQVcsaUVBQVg7QUFDQVcsWUFDRSx3RkFERjtBQUdELEM7Ozs7Ozs7QUM1QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNDQUFzQztBQUM3RCxxQkFBcUIsMkJBQTJCO0FBQ2hELHVCQUF1Qiw2Q0FBNkM7QUFDcEUsd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQ0FBaUM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLCtDQUErQztBQUNwRTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJhc3NldHMvanMvY2h1bmtzL3NpbmdsZS1wb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJzeW50YXgtZHluYW1pYy1pbXBvcnRcXFwiLFxcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixcXFwidHJhbnNmb3JtLWFzeW5jLXRvLWdlbmVyYXRvclxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1NpbmdsZVBvc3QudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wMGVhMzBmNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TaW5nbGVQb3N0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gU2luZ2xlUG9zdC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMDBlYTMwZjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wMGVhMzBmNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2ZlYXR1cmVzL3Bvc3RzL1NpbmdsZVBvc3QudnVlXG4vLyBtb2R1bGUgaWQgPSA0MTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuICA8ZGl2IHYtaWY9XCJwb3N0XCI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJoZXJvIGlzLWJvbGQgaXMtZGFya1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImhlcm8tYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGhhcy10ZXh0LWNlbnRlcmVkXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgIHt7IHBvc3QudGl0bGUucmVuZGVyZWQgfX1cbiAgICAgICAgICA8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbiB3cmFwcGVyXCI+XG4gICAgICA8ZGl2IHYtaWY9XCJwb3N0LmNhdGVnb3JpZXMgJiYgcG9zdC5jYXRlZ29yaWVzLmxlbmd0aFwiPlxuICAgICAgICAgIDxzcGFuIHYtZm9yPVwiY2F0IGluIHBvc3QuY2F0ZWdvcmllc1wiIDprZXk9XCJjYXQuc2x1Z1wiIGNsYXNzPVwidGFnIGlzLXdhcm5pbmdcIj5cbiAgICAgICAgICAgIHt7IGNhdC5uYW1lIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gIFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIiB2LWh0bWw9XCJwb3N0LmNvbnRlbnQucmVuZGVyZWRcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gJ3Z1ZXgnXG5pbXBvcnQgeyBsb2FkQ29kZVBlbkVtYmVkcywgbG9hZFN5bnRheEhpZ2hsaWdodGVyIH0gZnJvbSAnLi9wb3N0LWhlbHBlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ1NpbmdsZVBvc3QnLFxuICBcbiAgbWV0YUluZm8gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5wb3N0ID8gdGhpcy5wb3N0LnRpdGxlLnJlbmRlcmVkIDogd2luZG93LldQX1NFVFRJTkdTLnNpdGVOYW1lXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiBtYXBHZXR0ZXJzKFsncG9zdCddKSxcblxuICBtb3VudGVkKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdnZXRTaW5nbGVQb3N0JywgeyBzbHVnOiB0aGlzLiRyb3V0ZS5wYXJhbXMuc2x1ZyB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2FkQ29kZVBlbkVtYmVkcygpXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy4kZWwucXVlcnlTZWxlY3RvcigncHJlIGNvZGUnKSkge1xuICAgICAgICAgIGxvYWRTeW50YXhIaWdobGlnaHRlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gU2luZ2xlUG9zdC52dWU/MmE2NDdlYTIiLCJmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMpIHtcbiAgbGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICBzLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICBzLmFzeW5jID0gdHJ1ZVxuICBzLnNyYyA9IHNyY1xuICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXVxuICB4LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHMsIHgpXG59XG5cbmZ1bmN0aW9uIGxvYWRTdHlsZSAoc3JjKSB7XG4gIGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gIHMucmVsID0gJ3N0eWxlc2hlZXQnXG4gIHMuaHJlZiA9IHNyY1xuICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJylbMF1cbiAgeC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzLCB4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvZGVQZW5FbWJlZHMgKCkge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvZGVwZW4nKSkge1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vcHJvZHVjdGlvbi1hc3NldHMuY29kZXBlbi5pby9hc3NldHMvZW1iZWQvZWkuanMnKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU3ludGF4SGlnaGxpZ2h0ZXIgKCkge1xuICBsb2FkU2NyaXB0KCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9wcmlzbS8xLjguMS9wcmlzbS5taW4uanMnKVxuICBsb2FkU3R5bGUoXG4gICAgJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3ByaXNtLzEuOC4xL3RoZW1lcy9wcmlzbS1zb2xhcml6ZWRsaWdodC5taW4uY3NzJ1xuICApXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvcG9zdC1oZWxwZXJzLmpzIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0ucG9zdFxuICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJoZXJvIGlzLWJvbGQgaXMtZGFya1wiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlcm8tYm9keVwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyIGhhcy10ZXh0LWNlbnRlcmVkXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImgxXCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnBvc3QudGl0bGUucmVuZGVyZWQpICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzZWN0aW9uIHdyYXBwZXJcIiB9LCBbXG4gICAgICAgICAgX3ZtLnBvc3QuY2F0ZWdvcmllcyAmJiBfdm0ucG9zdC5jYXRlZ29yaWVzLmxlbmd0aFxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIF92bS5fbChfdm0ucG9zdC5jYXRlZ29yaWVzLCBmdW5jdGlvbihjYXQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBjYXQuc2x1Zywgc3RhdGljQ2xhc3M6IFwidGFnIGlzLXdhcm5pbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgIFwiICsgX3ZtLl9zKGNhdC5uYW1lKSArIFwiXFxuICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5wb3N0LmNvbnRlbnQucmVuZGVyZWQpIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICA6IF92bS5fZSgpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wMGVhMzBmNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMDBlYTMwZjZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWVcbi8vIG1vZHVsZSBpZCA9IDQxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9