//import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // --> path al nuevo archivo con los iconos
import { Fraction } from 'fractional';
import View from './view.js';

//Con parcel podemos importar todo tipo de assets, incluyendo imagenes. Para static assets (no codigo) se agrega "url:"

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try again.';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  // renderSuccessMessage(msg = this.#errorMessage) {
  //   const markup = `<div class="message">
  //   <div>
  //     <svg>
  //       <use href="${icons}#icon-smile"></use>
  //     </svg>
  //   </div>
  //   <p>Start by searching for a recipe or an ingredient. Have fun!</p>`;
  //   console.log(this.#parentElement);
  //   this.#clear();
  //   this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  addHandlerRender(handler) {
    //Publisher-subscriber pattern.
    // En el controller (desde el que tenemos acceso al view) llamamos a la funcion addhandler y pasamos la funcion handler como arg. Permitimos de esta manera al view recibir una funcion que de otra manera no conoceria, porque el view no tiene conexion con el controller.
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      const { serving } = btn.dataset;
      if (+serving > 0) handler(+serving);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `      
       <figure class="recipe__fig">
         <img src=${this._data.image} alt=${
      this._data.title
    } class="recipe__img" />
         <h1 class="recipe__title">
           <span>${this._data.title}</span>
         </h1>
        </figure>
 
     <div class="recipe__details">
       <div class="recipe__info">
           <svg class="recipe__info-icon">
             <use href="${icons}#icon-clock"></use>
           </svg>
           <span class="recipe__info-data recipe__info-data--minutes">
           ${this._data.cookingTime}</span>
           <span class="recipe__info-text">minutes</span>
       </div>
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${
           this._data.servings
         }</span>
         <span class="recipe__info-text">servings</span>
 
         <div class="recipe__info-buttons">
           <button class="btn--tiny btn--increase-servings" data-serving = ${
             this._data.servings - 1
           }>
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button class="btn--tiny btn--increase-servings" data-serving = ${
             this._data.servings + 1
           }>
             <svg>
               <use href="${icons}#icon-plus-circle"></use>
             </svg>
           </button>
         </div>
       </div>
 
       <div class ="recipe__bookmarks--container">
        <div title="Recipe created by you!" class="recipe__user-generated ${
          this._data.key ? '' : 'hidden'
        } ">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>

        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
       </div>
     </div>
 
     <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">    
        ${this._data.ingredients.map(this._generateIngredient).join('')}      
        </ul>
     </div>
 
     <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           this._data.publisher
         }</span>. Please check out
         directions at their website.
       </p>
       <a
         class="btn--small recipe__btn"
         href=${this._data.sourceUrl}
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </a>
     </div>`;
  }

  _generateIngredient(ing) {
    return `
       <li class="recipe__ingredient">
         <svg class="recipe__icon">
           <use href="${icons}#icon-check"></use>
         </svg>
           <div class="recipe__quantity">${
             ing.quantity ? new Fraction(ing.quantity).toString() : ''
           }</div>
           <div class="recipe__description">
           
           <span class="recipe__unit">${ing.unit ?? ''}</span>
           ${ing.description}
         </div>
       </li>`;
  }
}

export default new RecipeView();
