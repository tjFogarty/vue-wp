<template>
  <div>
    <site-header></site-header>
    <transition name="fade" appear mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteHeader from './features/header/index.vue'

export default {
  name: 'App',

  metaInfo() {
    return {
      title: 'TJ Fogarty | Web Developer'
    }
  },

  components: { SiteHeader }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>