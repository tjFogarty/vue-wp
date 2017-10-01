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
    window.scrollTo(0, 0)
    this.$store.dispatch('getSinglePost', { slug: this.$route.params.slug })
      .then(() => {
        // https://production-assets.codepen.io/assets/embed/ei.js
        if (document.querySelector('.codepen')) {
          let s = document.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = 'https://production-assets.codepen.io/assets/embed/ei.js'
          var x = document.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
        }
      })
  }
}
</script>

