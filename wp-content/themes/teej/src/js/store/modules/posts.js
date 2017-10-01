import api from '../api'
import 'babel-polyfill'

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
  getAllPosts: async ({ commit }) => {
    try {
      let posts = await api.posts()
      commit('RECIEVE_POSTS', { posts })
    } catch (err) {
      console.log(err)
    }
  },

  getSinglePost: async (context, { slug }) => {
    let singlePost = null
    let categories = null

    context.commit('RECIEVE_POST', {
      post: null
    })

    try {
      singlePost = await api.posts().slug(slug)
      categories = await api.categories().forPost(singlePost[0].id)

      context.commit('RECIEVE_POST', {
        post: {
          ...singlePost[0],
          categories
        }
      })
    } catch (err) {
      console.log(err)
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
