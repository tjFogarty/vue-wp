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
    this.$store.dispatch('getSinglePost', { slug: this.$route.params.slug });
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
    ? _c("div", { staticClass: "section" }, [
        _c("h1", { staticClass: "title is-1" }, [
          _vm._v(_vm._s(_vm.post.title.rendered))
        ]),
        _vm._v(" "),
        _vm.post.categories && _vm.post.categories.length
          ? _c(
              "div",
              _vm._l(_vm.post.categories, function(cat) {
                return _c(
                  "span",
                  { key: cat.slug, staticClass: "tag is-warning" },
                  [_vm._v("\n        " + _vm._s(cat.name) + "\n      ")]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWUiLCJ3ZWJwYWNrOi8vL1NpbmdsZVBvc3QudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZT8yMTcwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsNENBQWtSO0FBQ2xSO0FBQ0EsOENBQWtKO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTs7QUFFQTtRQUdBOztnQ0FDQTs7dUVBR0E7QUFGQTtBQUlBOzs7c0VBRUE7OzhCQUNBO3FFQUNBO0FBQ0E7QUFiQSxHOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDLGtCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtDQUErQztBQUNsRTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2luZ2xlLXBvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInN5bnRheC1keW5hbWljLWltcG9ydFxcXCIsXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFxcXCJ0cmFuc2Zvcm0tYXN5bmMtdG8tZ2VuZXJhdG9yXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU2luZ2xlUG9zdC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTAwZWEzMGY2XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1NpbmdsZVBvc3QudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2pzL2ZlYXR1cmVzL3Bvc3RzL1NpbmdsZVBvc3QudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBTaW5nbGVQb3N0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wMGVhMzBmNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTAwZWEzMGY2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZmVhdHVyZXMvcG9zdHMvU2luZ2xlUG9zdC52dWVcbi8vIG1vZHVsZSBpZCA9IDQxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gIDxkaXYgdi1pZj1cInBvc3RcIiBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICA8aDEgY2xhc3M9XCJ0aXRsZSBpcy0xXCI+e3sgcG9zdC50aXRsZS5yZW5kZXJlZCB9fTwvaDE+XG4gICAgXG4gICAgPGRpdiB2LWlmPVwicG9zdC5jYXRlZ29yaWVzICYmIHBvc3QuY2F0ZWdvcmllcy5sZW5ndGhcIj5cbiAgICAgICAgPHNwYW4gdi1mb3I9XCJjYXQgaW4gcG9zdC5jYXRlZ29yaWVzXCIgOmtleT1cImNhdC5zbHVnXCIgY2xhc3M9XCJ0YWcgaXMtd2FybmluZ1wiPlxuICAgICAgICAgIHt7IGNhdC5uYW1lIH19XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCIgdi1odG1sPVwicG9zdC5jb250ZW50LnJlbmRlcmVkXCI+PC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEdldHRlcnMgfSBmcm9tICd2dWV4J1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdTaW5nbGVQb3N0JyxcbiAgXG4gIG1ldGFJbmZvICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMucG9zdCA/IHRoaXMucG9zdC50aXRsZS5yZW5kZXJlZCA6IHdpbmRvdy5XUF9TRVRUSU5HUy5zaXRlTmFtZVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDogbWFwR2V0dGVycyhbJ3Bvc3QnXSksXG5cbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0U2luZ2xlUG9zdCcsIHsgc2x1ZzogdGhpcy4kcm91dGUucGFyYW1zLnNsdWcgfSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBTaW5nbGVQb3N0LnZ1ZT81MTQ5Y2E2YSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX3ZtLnBvc3RcbiAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VjdGlvblwiIH0sIFtcbiAgICAgICAgX2MoXCJoMVwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIGlzLTFcIiB9LCBbXG4gICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0ucG9zdC50aXRsZS5yZW5kZXJlZCkpXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfdm0ucG9zdC5jYXRlZ29yaWVzICYmIF92bS5wb3N0LmNhdGVnb3JpZXMubGVuZ3RoXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5wb3N0LmNhdGVnb3JpZXMsIGZ1bmN0aW9uKGNhdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgeyBrZXk6IGNhdC5zbHVnLCBzdGF0aWNDbGFzczogXCJ0YWcgaXMtd2FybmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICBcIiArIF92bS5fcyhjYXQubmFtZSkgKyBcIlxcbiAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIixcbiAgICAgICAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0ucG9zdC5jb250ZW50LnJlbmRlcmVkKSB9XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIDogX3ZtLl9lKClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTAwZWEzMGY2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wMGVhMzBmNlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3NyYy9qcy9mZWF0dXJlcy9wb3N0cy9TaW5nbGVQb3N0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=