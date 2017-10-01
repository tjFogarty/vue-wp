webpackJsonp([1],{

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(96)
/* script */
var __vue_script__ = __webpack_require__(414)
/* template */
var __vue_template__ = __webpack_require__(415)
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
Component.options.__file = "src/js/features/posts/PostList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PostList.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 414:
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

/***/ 415:
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
     require("vue-hot-reload-api").rerender("data-v-483fb3cc", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvUG9zdExpc3QudnVlIiwid2VicGFjazovLy9Qb3N0TGlzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ZlYXR1cmVzL3Bvc3RzL1Bvc3RMaXN0LnZ1ZT8wMTMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsNENBQWtSO0FBQ2xSO0FBQ0EsOENBQWtKO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUE7O0FBRUE7UUFHQTs7QUFDQSw2R0FFQTt3Q0FDQTt3Q0FDQTtBQUdBOzs7O3dDQUVBO3NDQUNBO0FBR0E7QUFMQTs7OEJBTUE7NkNBQ0E7QUFFQTs7OztzQ0FFQTswQ0FDQTt5QkFDQTtBQUVBO0FBTEE7QUFyQkEsRzs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUNBQWlDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBLDBCQUEwQiw0QkFBNEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQ0FBZ0MsZUFBZSxFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdDQUFnQyxlQUFlLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHlDQUF5QztBQUNuRSxpQkFBaUIsMkJBQTJCO0FBQzVDLG1CQUFtQiw2Q0FBNkM7QUFDaEUsb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InBvc3QtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsXFxcInRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3JcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Qb3N0TGlzdC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTQ4M2ZiM2NjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1Bvc3RMaXN0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9mZWF0dXJlcy9wb3N0cy9Qb3N0TGlzdC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFBvc3RMaXN0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00ODNmYjNjY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTQ4M2ZiM2NjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvUG9zdExpc3QudnVlXG4vLyBtb2R1bGUgaWQgPSA0MTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiPHRlbXBsYXRlPlxuICA8ZGl2IHYtaWY9XCJhbGxQb3N0cy5sZW5ndGggJiYgIWlzTG9hZGluZ1wiPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwiaGVybyBpcy1ib2xkIGlzLXdhcm5pbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBoYXMtdGV4dC1jZW50ZXJlZFwiPlxuICAgICAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgICAgICBQb3N0c1xuICAgICAgICAgIDwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyIHNlY3Rpb25cIj5cbiAgICAgIDxkaXYgdi1mb3I9XCJwb3N0IGluIGFsbFBvc3RzXCIgOmtleT1cInBvc3QuaWRcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwidGl0bGUgaXMtNFwiPnt7IHBvc3QudGl0bGUucmVuZGVyZWQgfX08L2gyPlxuICAgICAgICBcbiAgICAgICAgPGRpdiB2LWh0bWw9XCJwb3N0LmV4Y2VycHQucmVuZGVyZWRcIj48L2Rpdj5cbiAgXG4gICAgICAgIDxyb3V0ZXItbGluayBjbGFzcz1cImJ1dHRvbiBpcy13YXJuaW5nXCIgOnRvPVwiJy8nICsgcG9zdC5zbHVnXCI+XG4gICAgICAgICAgVmlldyBQb3N0XG4gICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgIFxuICAgICAgICA8aHIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uIHdyYXBwZXJcIj4gIFxuICAgICAgPGRpdiBjbGFzcz1cImxldmVsXCIgdi1pZj1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cIicvcGFnZS8nICsgcGFnaW5hdGlvbi5wcmV2XCIgY2xhc3M9XCJidXR0b24gaXMtcHJldlwiIHYtaWY9XCJwYWdpbmF0aW9uLnByZXZcIj5cbiAgICAgICAgICBQcmV2aW91cyBQYWdlXG4gICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgIDxidXR0b24gdi1lbHNlIGNsYXNzPVwiYnV0dG9uXCIgZGlzYWJsZWQ+UHJldmlvdXMgUGFnZTwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPHNwYW4+UGFnZSB7eyBjdXJyZW50UGFnZSB9fSBvZiB7eyBhbGxQb3N0cy5fcGFnaW5nLnRvdGFsUGFnZXMgfX08L3NwYW4+XG4gICAgICAgIFxuICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9wYWdlLycgKyBwYWdpbmF0aW9uLm5leHRcIiBjbGFzcz1cImJ1dHRvbiBpcy1uZXh0XCIgdi1pZj1cInBhZ2luYXRpb24ubmV4dFwiPlxuICAgICAgICAgIE5leHQgUGFnZVxuICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICA8YnV0dG9uIHYtZWxzZSBjbGFzcz1cImJ1dHRvblwiIGRpc2FibGVkPk5leHQgUGFnZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEdldHRlcnMgfSBmcm9tICd2dWV4J1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdQb3N0TGlzdCcsXG4gIFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcEdldHRlcnMoWydhbGxQb3N0cycsICdwYWdpbmF0aW9uJywgJ2lzTG9hZGluZyddKSxcblxuICAgIGN1cnJlbnRQYWdlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRyb3V0ZS5wYXJhbXMucGFnZSB8fCAxXG4gICAgfVxuICB9LFxuICBcbiAgd2F0Y2g6IHtcbiAgICAnJHJvdXRlJyAodG8sIGZyb20pIHtcbiAgICAgIHRoaXMubG9hZFBhZ2UodG8ucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmxvYWRQYWdlKHRoaXMuJHJvdXRlLnBhcmFtcy5wYWdlIHx8IDEpXG4gIH0sXG4gIFxuICBtZXRob2RzOiB7XG4gICAgbG9hZFBhZ2UocGFnZSkge1xuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2dldEFsbFBvc3RzJywgcGFnZSlcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gUG9zdExpc3QudnVlPzMwNWU4N2M4IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0uYWxsUG9zdHMubGVuZ3RoICYmICFfdm0uaXNMb2FkaW5nXG4gICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIndyYXBwZXIgc2VjdGlvblwiIH0sXG4gICAgICAgICAgX3ZtLl9sKF92bS5hbGxQb3N0cywgZnVuY3Rpb24ocG9zdCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGtleTogcG9zdC5pZCB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIGlzLTRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHBvc3QudGl0bGUucmVuZGVyZWQpKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MocG9zdC5leGNlcnB0LnJlbmRlcmVkKSB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIGlzLXdhcm5pbmdcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdG86IFwiL1wiICsgcG9zdC5zbHVnIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICBWaWV3IFBvc3RcXG4gICAgICBcIildXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiaHJcIilcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VjdGlvbiB3cmFwcGVyXCIgfSwgW1xuICAgICAgICAgIF92bS5wYWdpbmF0aW9uXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJsZXZlbFwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLnBhZ2luYXRpb24ucHJldlxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gaXMtcHJldlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcGFnZS9cIiArIF92bS5wYWdpbmF0aW9uLnByZXYgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgIFByZXZpb3VzIFBhZ2VcXG4gICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYnV0dG9uXCIsIGF0dHJzOiB7IGRpc2FibGVkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJQcmV2aW91cyBQYWdlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiUGFnZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmN1cnJlbnRQYWdlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBvZiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmFsbFBvc3RzLl9wYWdpbmcudG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLnBhZ2luYXRpb24ubmV4dFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gaXMtbmV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcGFnZS9cIiArIF92bS5wYWdpbmF0aW9uLm5leHQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgIE5leHQgUGFnZVxcbiAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJidXR0b25cIiwgYXR0cnM6IHsgZGlzYWJsZWQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk5leHQgUGFnZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgOiBfdm0uX2UoKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJzZWN0aW9uXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVybyBpcy1ib2xkIGlzLXdhcm5pbmdcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlcm8tYm9keVwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXIgaGFzLXRleHQtY2VudGVyZWRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJoMVwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgICAgIFBvc3RzXFxuICAgICAgICBcIilcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNDgzZmIzY2NcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTQ4M2ZiM2NjXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc3JjL2pzL2ZlYXR1cmVzL3Bvc3RzL1Bvc3RMaXN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=