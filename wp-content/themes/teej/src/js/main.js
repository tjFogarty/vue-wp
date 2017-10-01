import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import Meta from 'vue-meta'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(Meta)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
