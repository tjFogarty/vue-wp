webpackJsonp([1],{405:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e(67);s.default={name:"PostList",computed:Object(n.mapGetters)(["allPosts"]),mounted:function(){this.$store.dispatch("getAllPosts")}}},406:function(t,s){var e=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"section"},[t._m(0),t._v(" "),e("div",{staticClass:"container"},t._l(t.allPosts,function(s){return e("div",{key:s.id},[e("h2",{staticClass:"title is-4"},[t._v(t._s(s.title.rendered))]),t._v(" "),e("div",{domProps:{innerHTML:t._s(s.excerpt.rendered)}}),t._v(" "),e("router-link",{staticClass:"button is-primary",attrs:{to:"/"+s.slug}},[t._v("\n        View Post\n      ")]),t._v(" "),e("hr")],1)}))])},n=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"hero"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container"},[e("h1",{staticClass:"title"},[t._v("\n          Posts\n        ")])])])])}];t.exports={render:e,staticRenderFns:n}},409:function(t,s,e){var n=e(96),i=e(405),r=e(406),a=n(i,r,null,null,null);t.exports=a.exports}});
//# sourceMappingURL=post-list.js.map