import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import PostList from './features/posts/PostList.vue'
import SinglePost from './features/posts/SinglePost.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: PostList },
  { path: '/:slug', component: SinglePost }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
