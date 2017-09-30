<template>
  <div class="section">
    <h1 class="title is-1">Posts</h1>
    
    <div v-for="post in allPosts" :key="post.id">
      <router-link :to="'/' + post.slug">
        {{ post.title.rendered }}
      </router-link>
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

