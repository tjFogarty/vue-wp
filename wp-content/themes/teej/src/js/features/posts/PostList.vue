<template>
  <div class="section">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Posts
          </h1>
        </div>
      </div>
    </section>
    
    <div v-for="post in allPosts" :key="post.id" class="container">
      <h2 class="title is-4">{{ post.title.rendered }}</h2>
      
      <div v-html="post.excerpt.rendered"></div>

      <router-link class="button is-primary" :to="'/' + post.slug">
        View Post
      </router-link>
      
      <hr />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PostList',
  
  computed: mapGetters(['allPosts']),

  mounted() {
    this.$store.dispatch('getAllPosts')
  }
}
</script>

