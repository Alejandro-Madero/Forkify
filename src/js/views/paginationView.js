import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _renderPreviousBtn() {
    return `
    <button class="btn--inline pagination__btn--prev" data-page= ${
      this._data.currentPage - 1
    }>
       <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${this._data.currentPage - 1}</span>
   </button>`;
  }

  _renderNextBtn() {
    return `
     <button class="btn--inline pagination__btn--next" data-page= ${
       this._data.currentPage + 1
     }>
              <span>Page ${this._data.currentPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`;
  }

  _generateMarkup() {
    //Page 1 && no other pages
    if (this._data.currentPage === 1 && this._data.pages === 1) return;

    //Page 1 && there are more pages
    if (this._data.currentPage === 1 && this._data.pages > 1)
      return this._renderNextBtn();

    //page X && more pages
    if (
      this._data.currentPage > 1 &&
      this._data.currentPage < this._data.pages
    ) {
      const prev = this._renderPreviousBtn();
      const next = this._renderNextBtn();
      return `${prev}${next}`;
    }

    //Page X && Page X is the last page
    if (this._data.currentPage === this._data.pages)
      return this._renderPreviousBtn();
  }

  addHandlerBtn(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.page);
    });
  }
}

export default new PaginationView();
