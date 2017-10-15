webpackJsonp([1],{

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(98)
/* script */
var __vue_script__ = __webpack_require__(424)
/* template */
var __vue_template__ = __webpack_require__(425)
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
Component.options.__file = "src/js/features/posts/PostList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-483fb3cc", Component.options)
  } else {
    hotAPI.reload("data-v-483fb3cc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(67);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  name: 'PostList',

  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['allPosts', 'pagination', 'isLoading']), {
    currentPage: function currentPage() {
      return this.$route.params.page || 1;
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.loadPage(to.params.page || 1);
    }
  },

  mounted: function mounted() {
    this.loadPage(this.$route.params.page || 1);
  },


  methods: {
    loadPage: function loadPage(page) {
      this.$store.dispatch('getAllPosts', page);
      window.scrollTo(0, 0);
    }
  }
});

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.allPosts.length && !_vm.isLoading
    ? _c("div", [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "wrapper section" },
          _vm._l(_vm.allPosts, function(post) {
            return _c(
              "div",
              { key: post.id },
              [
                _c("h2", { staticClass: "title is-4" }, [
                  _vm._v(_vm._s(post.title.rendered))
                ]),
                _vm._v(" "),
                _c("div", {
                  domProps: { innerHTML: _vm._s(post.excerpt.rendered) }
                }),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "button is-warning",
                    attrs: { to: "/" + post.slug }
                  },
                  [_vm._v("\n        View Post\n      ")]
                ),
                _vm._v(" "),
                _c("hr")
              ],
              1
            )
          })
        ),
        _vm._v(" "),
        _c("div", { staticClass: "section wrapper" }, [
          _vm.pagination
            ? _c(
                "div",
                { staticClass: "level" },
                [
                  _vm.pagination.prev
                    ? _c(
                        "router-link",
                        {
                          staticClass: "button is-prev",
                          attrs: { to: "/page/" + _vm.pagination.prev }
                        },
                        [_vm._v("\n        Previous Page\n      ")]
                      )
                    : _c(
                        "button",
                        { staticClass: "button", attrs: { disabled: "" } },
                        [_vm._v("Previous Page")]
                      ),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(
                      "Page " +
                        _vm._s(_vm.currentPage) +
                        " of " +
                        _vm._s(_vm.allPosts._paging.totalPages)
                    )
                  ]),
                  _vm._v(" "),
                  _vm.pagination.next
                    ? _c(
                        "router-link",
                        {
                          staticClass: "button is-next",
                          attrs: { to: "/page/" + _vm.pagination.next }
                        },
                        [_vm._v("\n        Next Page\n      ")]
                      )
                    : _c(
                        "button",
                        { staticClass: "button", attrs: { disabled: "" } },
                        [_vm._v("Next Page")]
                      )
                ],
                1
              )
            : _vm._e()
        ])
      ])
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "hero is-bold is-warning" }, [
      _c("div", { staticClass: "hero-body" }, [
        _c("div", { staticClass: "container has-text-centered" }, [
          _c("h1", { staticClass: "title" }, [
            _vm._v("\n          Posts\n        ")
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-483fb3cc", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvUG9zdExpc3QudnVlIiwid2VicGFjazovLy9zcmMvanMvZmVhdHVyZXMvcG9zdHMvUG9zdExpc3QudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9Qb3N0TGlzdC52dWU/YmNlYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFtVDtBQUNuVDtBQUNBLDhDQUFnTDtBQUNoTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHdEQUF3RCxJQUFJOztBQUUzSTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSUE7O0FBRUE7UUFHQTs7QUFDQSw2R0FFQTt3Q0FDQTt3Q0FDQTtBQUdBOzs7O3dDQUVBO3NDQUNBO0FBR0E7QUFMQTs7OEJBTUE7NkNBQ0E7QUFFQTs7OztzQ0FFQTswQ0FDQTt5QkFDQTtBQUVBO0FBTEE7QUFyQkEsRzs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUNBQWlDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBLDBCQUEwQiw0QkFBNEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQ0FBZ0MsZUFBZSxFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdDQUFnQyxlQUFlLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHlDQUF5QztBQUNuRSxpQkFBaUIsMkJBQTJCO0FBQzVDLG1CQUFtQiw2Q0FBNkM7QUFDaEUsb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImFzc2V0cy9qcy9jaHVua3MvcG9zdC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3JcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vUG9zdExpc3QudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00ODNmYjNjY1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9Qb3N0TGlzdC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbiAgdmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvZmVhdHVyZXMvcG9zdHMvUG9zdExpc3QudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHsgIHJldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7ICBjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00ODNmYjNjY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTQ4M2ZiM2NjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuJyArICcgIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9Qb3N0TGlzdC52dWVcbi8vIG1vZHVsZSBpZCA9IDQyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCI8dGVtcGxhdGU+XG4gIDxkaXYgdi1pZj1cImFsbFBvc3RzLmxlbmd0aCAmJiAhaXNMb2FkaW5nXCI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJoZXJvIGlzLWJvbGQgaXMtd2FybmluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImhlcm8tYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGhhcy10ZXh0LWNlbnRlcmVkXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgIFBvc3RzXG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXIgc2VjdGlvblwiPlxuICAgICAgPGRpdiB2LWZvcj1cInBvc3QgaW4gYWxsUG9zdHNcIiA6a2V5PVwicG9zdC5pZFwiPlxuICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZSBpcy00XCI+e3sgcG9zdC50aXRsZS5yZW5kZXJlZCB9fTwvaDI+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IHYtaHRtbD1cInBvc3QuZXhjZXJwdC5yZW5kZXJlZFwiPjwvZGl2PlxuICBcbiAgICAgICAgPHJvdXRlci1saW5rIGNsYXNzPVwiYnV0dG9uIGlzLXdhcm5pbmdcIiA6dG89XCInLycgKyBwb3N0LnNsdWdcIj5cbiAgICAgICAgICBWaWV3IFBvc3RcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgXG4gICAgICAgIDxociAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24gd3JhcHBlclwiPiAgXG4gICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxcIiB2LWlmPVwicGFnaW5hdGlvblwiPlxuICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9wYWdlLycgKyBwYWdpbmF0aW9uLnByZXZcIiBjbGFzcz1cImJ1dHRvbiBpcy1wcmV2XCIgdi1pZj1cInBhZ2luYXRpb24ucHJldlwiPlxuICAgICAgICAgIFByZXZpb3VzIFBhZ2VcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgPGJ1dHRvbiB2LWVsc2UgY2xhc3M9XCJidXR0b25cIiBkaXNhYmxlZD5QcmV2aW91cyBQYWdlPC9idXR0b24+XG4gICAgICAgIFxuICAgICAgICA8c3Bhbj5QYWdlIHt7IGN1cnJlbnRQYWdlIH19IG9mIHt7IGFsbFBvc3RzLl9wYWdpbmcudG90YWxQYWdlcyB9fTwvc3Bhbj5cbiAgICAgICAgXG4gICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3BhZ2UvJyArIHBhZ2luYXRpb24ubmV4dFwiIGNsYXNzPVwiYnV0dG9uIGlzLW5leHRcIiB2LWlmPVwicGFnaW5hdGlvbi5uZXh0XCI+XG4gICAgICAgICAgTmV4dCBQYWdlXG4gICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgIDxidXR0b24gdi1lbHNlIGNsYXNzPVwiYnV0dG9uXCIgZGlzYWJsZWQ+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gJ3Z1ZXgnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ1Bvc3RMaXN0JyxcbiAgXG4gIGNvbXB1dGVkOiB7XG4gICAgLi4ubWFwR2V0dGVycyhbJ2FsbFBvc3RzJywgJ3BhZ2luYXRpb24nLCAnaXNMb2FkaW5nJ10pLFxuXG4gICAgY3VycmVudFBhZ2UgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlLnBhcmFtcy5wYWdlIHx8IDFcbiAgICB9XG4gIH0sXG4gIFxuICB3YXRjaDoge1xuICAgICckcm91dGUnICh0bywgZnJvbSkge1xuICAgICAgdGhpcy5sb2FkUGFnZSh0by5wYXJhbXMucGFnZSB8fCAxKVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkKCkge1xuICAgIHRoaXMubG9hZFBhZ2UodGhpcy4kcm91dGUucGFyYW1zLnBhZ2UgfHwgMSlcbiAgfSxcbiAgXG4gIG1ldGhvZHM6IHtcbiAgICBsb2FkUGFnZShwYWdlKSB7XG4gICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0QWxsUG9zdHMnLCBwYWdlKVxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvZmVhdHVyZXMvcG9zdHMvUG9zdExpc3QudnVlPzMwNWU4N2M4IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0uYWxsUG9zdHMubGVuZ3RoICYmICFfdm0uaXNMb2FkaW5nXG4gICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIndyYXBwZXIgc2VjdGlvblwiIH0sXG4gICAgICAgICAgX3ZtLl9sKF92bS5hbGxQb3N0cywgZnVuY3Rpb24ocG9zdCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGtleTogcG9zdC5pZCB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIGlzLTRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHBvc3QudGl0bGUucmVuZGVyZWQpKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MocG9zdC5leGNlcnB0LnJlbmRlcmVkKSB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIGlzLXdhcm5pbmdcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdG86IFwiL1wiICsgcG9zdC5zbHVnIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICBWaWV3IFBvc3RcXG4gICAgICBcIildXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiaHJcIilcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VjdGlvbiB3cmFwcGVyXCIgfSwgW1xuICAgICAgICAgIF92bS5wYWdpbmF0aW9uXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJsZXZlbFwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLnBhZ2luYXRpb24ucHJldlxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gaXMtcHJldlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcGFnZS9cIiArIF92bS5wYWdpbmF0aW9uLnByZXYgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgIFByZXZpb3VzIFBhZ2VcXG4gICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYnV0dG9uXCIsIGF0dHJzOiB7IGRpc2FibGVkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJQcmV2aW91cyBQYWdlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiUGFnZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmN1cnJlbnRQYWdlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBvZiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmFsbFBvc3RzLl9wYWdpbmcudG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLnBhZ2luYXRpb24ubmV4dFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gaXMtbmV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcGFnZS9cIiArIF92bS5wYWdpbmF0aW9uLm5leHQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgIE5leHQgUGFnZVxcbiAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJidXR0b25cIiwgYXR0cnM6IHsgZGlzYWJsZWQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk5leHQgUGFnZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgOiBfdm0uX2UoKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJzZWN0aW9uXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVybyBpcy1ib2xkIGlzLXdhcm5pbmdcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlcm8tYm9keVwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXIgaGFzLXRleHQtY2VudGVyZWRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJoMVwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgICAgIFBvc3RzXFxuICAgICAgICBcIilcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi00ODNmYjNjY1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNDgzZmIzY2NcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vc3JjL2pzL2ZlYXR1cmVzL3Bvc3RzL1Bvc3RMaXN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=