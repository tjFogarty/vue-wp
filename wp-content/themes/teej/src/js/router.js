import Vue from 'vue'
import VueRouter from 'vue-router'
import PostList from './features/posts/PostList.vue'
import SinglePost from './features/posts/SinglePost.vue'

Vue.use(VueRouter)

// const PostList = () => {
//   return import(/* webpackChunkName: "post-list" */ './features/posts/PostList.vue')
// }

// const SinglePost = () => {
//   return import(/* webpackChunkName: "single-post" */ './features/posts/SinglePost.vue')
// }

const routes = [
  {
    path: '/',
    component: PostList,
    alias: 'home'
  },
  {
    path: '/page/1',
    redirect: '/'
  },
  {
    path: '/page/:page',
    component: PostList
  },
  {
    path: '/page',
    redirect: '/'
  },
  {
    path: '/:slug',
    component: SinglePost
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
