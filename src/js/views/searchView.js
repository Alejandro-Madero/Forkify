import View from './view.js';

class SaerchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearSearchInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }

  _clearSearchInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SaerchView();
