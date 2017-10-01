<template>
  <div v-if="post" class="section">
    <h1 class="title is-1">{{ post.title.rendered }}</h1>
    
    <div v-if="post.categories && post.categories.length">
        <span v-for="cat in post.categories" :key="cat.slug" class="tag is-warning">
          {{ cat.name }}
        </span>
    </div>

    <div class="content" v-html="post.content.rendered"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SinglePost',
  
  metaInfo () {
    return {
      title: this.post ? this.post.title.rendered : 'TJ Fogarty'
    }
  },

  computed: mapGetters(['post']),

  mounted() {
    this.$store.dispatch('getSinglePost', { slug: this.$route.params.slug })
  }
}
</script>

