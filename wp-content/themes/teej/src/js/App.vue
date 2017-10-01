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
      title: window.WP_SETTINGS.siteName
    }
  },

  components: { SiteHeader }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease, transform ease 0.2s;
  will-change: opacity, transform;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(5px);
}

.wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
</style>