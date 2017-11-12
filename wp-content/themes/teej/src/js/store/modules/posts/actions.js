import api from '../../api'
import * as types from './mutation-types'

export const getAllPosts = async ({ commit }, page = 1) => {
  commit(types.SET_LOADING, { isLoading: true })

  try {
    let posts = await api.posts().page(page)
    commit(types.RECIEVE_POSTS, { posts })
  } catch (err) {
    console.log(err)
  }

  commit(types.SET_LOADING, { isLoading: false })
}

export const getSinglePost = async ({ commit }, { slug }) => {
  commit(types.SET_LOADING, { isLoading: true })

  commit(types.RECIEVE_POST, {
    post: null
  })

  try {
    let singlePost = await api.posts().slug(slug)
    commit(types.RECIEVE_POST, {
      post: singlePost[0]
    })
  } catch (err) {
    console.log(err)
  }

  commit(types.SET_LOADING, { isLoading: false })
}

export const getCategories = async ({ commit }) => {
  let categories = await api.categories()
  commit(types.RECIEVE_CATEGORIES, { categories })
}
