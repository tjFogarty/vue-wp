import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
