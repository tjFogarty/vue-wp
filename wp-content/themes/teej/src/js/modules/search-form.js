const SearchForm = {
  openButton: document.querySelector('.js-search'),
  form: document.querySelector('.js-search-form'),
  searchInput: document.getElementById('search'),
  closeButton: document.querySelector('.js-search-close'),
  visibleClass: 'is-visible',

  /**
   * Bind event listeners
   */
  init () {
    this.closeButton.addEventListener('click', this.handleClose.bind(this));

    this.openButton.addEventListener('click', this.handleOpen.bind(this));

    this.form.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
  },

  /**
   * Closes the search form
   */
  handleClose () {
    this.form.classList.remove(this.visibleClass);
  },

  /**
   * Opens the search form
   */
  handleOpen () {
    this.form.classList.add(this.visibleClass);
  },

  /**
   * Handles the end of a transition
   */
  handleTransitionEnd () {
    if (this.isVisible()) {
      this.searchInput.focus();
    }
  },

  /**
   * Checks if the search form is visible
   * @returns {boolean}
   */
  isVisible () {
    return this.form.classList.contains(this.visibleClass);
  }
};

export default SearchForm;
