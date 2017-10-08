export const allPosts = state => state.all

export const post = state => state.post

export const route = state => state.route

export const isLoading = state => state.isLoading

export const categories = state => state.categories

export const currentCategories = ({ categories, post }) => {
  if (!post || !post.categories.length) return []

  return categories.filter(c => post.categories.includes(c.id))
}

export const pagination = state => {
  if (!state.all._paging) return null

  let { links } = state.all._paging
  let nextPage = links.next || null
  let prevPage = links.prev || null

  return {
    next: nextPage ? nextPage.split('page=')[1] : null,
    prev: prevPage ? prevPage.split('page=')[1] : null
  }
}
