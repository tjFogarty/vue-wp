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
    
    <div class="level container" v-if="pagination">
      <router-link :to="'/page/' + pagination.prev" class="button is-prev" v-if="pagination.prev">
        Previous Page
      </router-link>
      <button v-else class="button" disabled>Previous Page</button>
      
      <span>Page {{ currentPage }} of {{ allPosts._paging.totalPages }}</span>
      
      <router-link :to="'/page/' + pagination.next" class="button is-next" v-if="pagination.next">
        Next Page
      </router-link>
      <button v-else class="button" disabled>Next Page</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PostList',
  
  computed: {
    ...mapGetters(['allPosts', 'pagination']),

    currentPage () {
      return this.$route.params.page || 1
    }
  },
  
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
