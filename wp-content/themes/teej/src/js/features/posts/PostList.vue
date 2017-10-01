<template>
  <div class="section" v-if="allPosts.length">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Posts
          </h1>
        </div>
      </div>
    </section>
    
    <div class="container">
      <div v-for="post in allPosts" :key="post.id">
        <h2 class="title is-4">{{ post.title.rendered }}</h2>
        
        <div v-html="post.excerpt.rendered"></div>
  
        <router-link class="button is-primary" :to="'/' + post.slug">
          View Post
        </router-link>
        
        <hr />
      </div>
    </div>
    
    <div class="level container">
      <router-link to="/" class="button">Previous Page</router-link>
      <router-link to="/page/2" class="button">Next Page</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PostList',
  
  computed: mapGetters(['allPosts']),
  
  watch: {
    '$route' (to, from) {
      this.loadPage(to.params.page || 1)
    }
  },

  mounted() {
    this.loadPage(this.$route.params.page || 1)
  },
  
  methods: {
    loadPage(page) {
      this.$store.dispatch('getAllPosts', page)
      window.scrollTo(0, 0)
    }
  }
}
</script>

