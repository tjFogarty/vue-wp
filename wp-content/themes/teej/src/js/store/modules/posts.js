import api from '../api'

const state = {
  all: [],
  post: null,
  error: ''
}

const getters = {
  allPosts: state => state.all,
  post: state => state.post
}

const actions = {
  getAllPosts ({ commit }) {
    api.posts().then((data, err) => {
      if (err) {
        console.log(err)
      }

      commit('RECIEVE_POSTS', { posts: data })
    })
  },

  getSinglePost (context, { slug }) {
    let post = context.state.all.find(post => post.slug === slug)

    if (post) {
      context.commit('RECIEVE_POST', { post })
    } else {
      api.posts().slug(slug).then((data, err) => {
        if (err) {
          console.log(err)
        }

        context.commit('RECIEVE_POST', { post: data[0] })
      })
    }
  }
}

const mutations = {
  RECIEVE_POSTS: (state, { posts }) => {
    state.all = posts
  },

  RECIEVE_POST: (state, { post }) => {
    state.post = post
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
