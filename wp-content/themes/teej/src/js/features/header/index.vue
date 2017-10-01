<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Home</router-link>
      
      <button class="button navbar-burger" @click="toggleNavigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    
    <div class="navbar-menu" ref="navigation">
      <div class="navbar-start">
        <a href="#" class="navbar-item">About</a>
        <a href="#" class="navbar-item">Contact</a>
      </div>
      
      <div class="navbar-end">
        <a href="#" class="navbar-item">Github</a>
        <a href="#" class="navbar-item">Twitter</a>
      </div>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'SiteHeader',
  
  methods: {
    toggleNavigation () {
      this.$refs.navigation.classList.toggle('is-active')
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  z-index: 1;
  top: 0;
}
</style>
