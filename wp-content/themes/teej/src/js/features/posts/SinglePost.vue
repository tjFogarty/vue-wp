<template>
  <div v-if="post">
    <section class="hero is-bold is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            {{ post.title.rendered }}
          </h1>
        </div>
      </div>
    </section>
    
    <div class="section wrapper">
      <div v-if="post.categories && post.categories.length">
          <span v-for="cat in post.categories" :key="cat.slug" class="tag is-warning">
            {{ cat.name }}
          </span>
      </div>
  
      <div class="content" v-html="post.content.rendered"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SinglePost',
  
  metaInfo () {
    return {
      title: this.post ? this.post.title.rendered : window.WP_SETTINGS.siteName
    }
  },

  computed: mapGetters(['post']),

  mounted() {
    this.$store.dispatch('getSinglePost', { slug: this.$route.params.slug })
  }
}
</script>

