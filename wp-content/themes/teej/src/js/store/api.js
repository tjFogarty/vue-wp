import WPAPI from 'wpapi'

export default new WPAPI({
  endpoint: window.WP_API_SETTINGS.root,
  nonce: window.WP_API_SETTINGS.nonce
})
