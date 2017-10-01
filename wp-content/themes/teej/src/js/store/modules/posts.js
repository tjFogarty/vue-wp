import api from '../api'
import 'babel-polyfill'

const state = {
  all: [],
  post: null,
  error: ''
}

const getters = {
  allPosts: state => state.all,
  post: state => state.post,
  route: state => state.route,
  pagination: state => {
    if (!state.all._paging) return null
    let { links } = state.all._paging

    let nextPage = links.next || null
    let prevPage = links.prev || null

    return {
      next: nextPage ? nextPage.split('page=')[1] : null,
      prev: prevPage ? prevPage.split('page=')[1] : null
    }
  }
}

const actions = {
  getAllPosts: async ({ commit }, page = 1) => {
    try {
      let posts = await api.posts().page(page)

      commit('RECIEVE_POSTS', { posts })
    } catch (err) {
      console.log(err)
    }
  },

  getSinglePost: async (context, { slug }) => {
    context.commit('RECIEVE_POST', {
      post: null
    })

    try {
      let singlePost = await api.posts().slug(slug)
      let categories = await api.categories().forPost(singlePost[0].id)

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
