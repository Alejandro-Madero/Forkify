import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes were found for your query 😢. Please try again!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  _markActiveRecipe(id) {
    const results = Array.from(this._parentElement.querySelectorAll('*'));
    results.forEach(el => {
      if (el.getAttribute('href')) {
        el.getAttribute('href').slice(1) === id
          ? el.classList.add('preview__link--active')
          : el.classList.remove('preview__link--active');
      }
    });
  }
}

export default new ResultsView();

//////////////////////////////////////////////////
