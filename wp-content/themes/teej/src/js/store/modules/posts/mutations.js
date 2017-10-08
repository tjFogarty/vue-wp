import * as types from './mutation-types'

export default {
  [types.RECIEVE_POSTS]: (state, { posts }) => {
    state.all = posts
  },

  [types.RECIEVE_POST]: (state, { post }) => {
    state.post = post
  },

  [types.RECIEVE_CATEGORIES]: (state, { categories }) => {
    state.categories = categories
  },

  [types.SET_LOADING]: (state, { isLoading }) => {
    state.isLoading = isLoading
  }
}
