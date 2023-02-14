import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerLoadBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `  
    <div class="message">
        <div class = "bookmarks__icon">
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
            <p> ${message}
            </p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new BookmarksView();

//////////////////////////////////////////////////
