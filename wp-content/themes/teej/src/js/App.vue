<template>
  <div>
    <site-header></site-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteHeader from './features/header/index.vue'

export default {
  name: 'App',
  components: { SiteHeader }
}
</script>

