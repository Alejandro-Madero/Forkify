import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _parentElement;

  /**
   * Renders the recieved object to the DOM
   * @param {Object | Object[]} data data to be render (e.g. recipe)
   * @param {boolean} [render] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is return if render = false
   * @this {Object} View instance
   * @author Alejandro Madero
   */
  render(data, render = true) {
    this._data = data;
    console.log(this._data);
    const markup = this._generateMarkup();
    if (!markup) return;
    if (!render) return markup;
    //Clear previous markup
    this._clear();
    // Display new markup
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //Updates changes in text

      if (!newEl.isEqualNode(curEl) && curEl.firstChild?.nodeValue.trim()) {
        curEl.textContent = newEl.textContent;
      }

      //Updates changes in attributes

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          if (curEl.getAttribute(attr.name) !== attr.value) {
            curEl.setAttribute(attr.name, attr.value);
          }
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    console.log(this._parentElement);
    const spinner = `
              <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
              </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `  
      <div class="error">
        <div class = "error__icon">
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class= "message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
