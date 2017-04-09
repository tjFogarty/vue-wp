const SearchForm = {
  openButton: document.querySelector('.js-search'),
  form: document.querySelector('.js-search-form'),
  searchInput: document.getElementById('search'),
  closeButton: document.querySelector('.js-search-close'),
  visibleClass: 'is-visible',

  init () {
    this.closeButton.addEventListener('click', this.handleClose.bind(this));

    this.openButton.addEventListener('click', this.handleOpen.bind(this));

    this.form.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
  },

  handleClose () {
    this.form.classList.remove(this.visibleClass);
  },

  handleOpen () {
    this.form.classList.add(this.visibleClass);
  },

  handleTransitionEnd () {
    if (this.isVisible()) {
      this.searchInput.focus();
    }
  },

  isVisible () {
    return this.form.classList.contains(this.visibleClass);
  }
};

export default SearchForm;
