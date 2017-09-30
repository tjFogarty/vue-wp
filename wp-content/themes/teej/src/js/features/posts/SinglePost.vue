<template>
  <div v-if="post" class="section">
    <h1 class="title is-1">{{ post.title.rendered }}</h1>

    <div class="content" v-html="post.content.rendered"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SinglePost',

  computed: mapGetters(['post']),

  mounted() {
    this.$store.dispatch('getSinglePost', { slug: this.$route.params.slug })
  }
}
</script>

