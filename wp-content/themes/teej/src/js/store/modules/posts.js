import api from '../api'
import 'babel-polyfill'

const state = {
  all: [],
  post: null,
  error: '',
  categories: [],
  isLoading: false
}

const getters = {
  allPosts: state => state.all,
  post: state => state.post,
  route: state => state.route,
  isLoading: state => state.isLoading,
  categories: state => state.categories,
  currentCategories: ({ categories, post }) => {
    if (!post || !post.categories.length) return []

    return categories.filter(c => post.categories.includes(c.id))
  },
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
  async getAllPosts ({ commit }, page = 1) {
    commit('SET_LOADING', { isLoading: true })

    try {
      let posts = await api.posts().page(page)
      commit('RECIEVE_POSTS', { posts })
    } catch (err) {
      console.log(err)
    }

    commit('SET_LOADING', { isLoading: false })
  },

  async getSinglePost ({ commit }, { slug }) {
    commit('SET_LOADING', { isLoading: true })

    commit('RECIEVE_POST', {
      post: null
    })

    try {
      let singlePost = await api.posts().slug(slug)
      commit('RECIEVE_POST', {
        post: singlePost[0]
      })
    } catch (err) {
      console.log(err)
    }

    commit('SET_LOADING', { isLoading: false })
  },

  async getCategories ({ commit }) {
    let categories = await api.categories()
    commit('RECIEVE_CATEGORIES', { categories })
  }
}

const mutations = {
  RECIEVE_POSTS: (state, { posts }) => {
    state.all = posts
  },

  RECIEVE_POST: (state, { post }) => {
    state.post = post
  },

  RECIEVE_CATEGORIES: (state, { categories }) => {
    state.categories = categories
  },

  SET_LOADING: (state, { isLoading }) => {
    state.isLoading = isLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
