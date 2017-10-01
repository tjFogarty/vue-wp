import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const PostList = () => {
  return import(/* webpackChunkName: "post-list" */ './features/posts/PostList.vue')
}

const SinglePost = () => {
  return import(/* webpackChunkName: "single-post" */ './features/posts/SinglePost.vue')
}

const routes = [
  {
    path: '/',
    component: PostList,
    alias: 'home'
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
    path: '/page/1',
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
