import icons from 'url:../../img/icons.svg'; // --> path al nuevo archivo con los iconos
import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _errorMessage = '';
  _message = 'Recipe was successfully uploaded! :)';
  _clearBtn = document.querySelector('.clear__btn');

  constructor() {
    super();
    this._init();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._recipeWindow.classList.toggle('hidden');
  }

  _clearFields(e) {
    if (e) e.preventDefault();
    Array.from(this._parentElement).forEach(el => (el.value = ''));
  }

  _addHandlerOpenModal() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseModal() {
    this._btnClose.addEventListener('click', e => {
      this.toggleWindow();
      this.resetForm();
    });

    this._overlay.addEventListener('click', e => {
      this.toggleWindow();
      this.resetForm();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !this._overlay.classList.contains('hidden')) {
        this.toggleWindow();
        this.resetForm();
      }
    });
  }
  _addHandlerClear() {
    this._clearBtn.addEventListener('click', this._clearFields.bind(this));
  }

  _generateMarkup() {
    return `<div class="upload__column">
   <h3 class="upload__heading">Recipe data</h3>

  <div class="upload__column--data">
     <label for="title" class="label__data">Title</label>   
     <input id="title" value="" name="title" type="text" placeholder="Enter recipe title" required/>
 </div>
 
 <div class="upload__column--data">
   <label for="url"  class="label__data">URL</label> 
   <input id="url" value="" name="sourceUrl" type="text" placeholder="Enter recipe URL" required/>
 </div>

 <div class="upload__column--data">
   <label for="imageUrl" class="label__data">Image URL</label>
   <input id="imageUrl" value="" name="image" type="text" placeholder="Enter recipe image URL" required />
 </div>
 
 <div class="upload__column--data">
   <label for="publisher" class="label__data">Publisher</label>
   <input id="publisher" value="" name="publisher" type="text" placeholder="Enter publisher name" required/>
 </div>
 
 <div class="upload__column--data">
   <label for="cookingTime" class="label__data">Prep time</label>
   <input id="cookingTime" value=""  name="cookingTime" type="number" placeholder="Enter preparation time in minutes" required />
 </div>
 
 <div class="upload__column--data">
   <label for="servings" class="label__data">Servings</label>
   <input id="servings" value="" name="servings" type="number" placeholder="Enter number of servings" required />
 </div>
 </div>

 <div class="upload__column">
   <h3 class="upload__heading">Ingredients</h3> 

   <div class="ingredients__container">
     <label for="qty1">Quantity</label>
     <input
       id="qty1"
       class="input__ing"
       value=""
       type="text"
       required
       name="qty-1"
       placeholder="e.g. 1"
     />
     <label for="unit1">Unit</label>
     <input
     class="input__ing"
       id="unit1"
       value=""
       type="text"
       required
       name="unit-1"
       placeholder="e.g. kg"
     />
     <label for="description1">Description</label>
     <input
       id="description1"
       class="input__ing--description"
       value=""
       type="text"
       required
       name="description-1"
       placeholder="Ingredient description"
     />
 </div>

 <div class="ingredients__container">
   <label for="qty2">Quantity</label>
   <input
     id="qty2"
     class="input__ing"
     value=""
     type="text"            
     name="qty-2"
     placeholder="e.g. 2"
   />

   <label for="unit2">Unit</label>
   <input
   class="input__ing"
     id="unit2"
     value=""
     type="text"            
     name="unit-2"
     placeholder="e.g. kg"
   />
   <label for="description2">Description</label>
   <input
     id="description2"
     class="input__ing--description"
     value=""
     type="text"            
     name="description-2"
     placeholder="Ingredient description"
   />
 </div>

 <div class="ingredients__container">
   <label for="qty3">Quantity</label>
   <input
     id="qty3"
     class="input__ing"
     value=""
     type="text"            
     name="qty-3"
     placeholder="e.g. 3"
   />

   <label for="unit3">Unit</label>
   <input
   class="input__ing"
     id="unit3"
     value=""
     type="text"            
     name="unit-3"
     placeholder="e.g. kg"
   />
   <label for="description3">Description</label>
   <input
     id="description3"
     class="input__ing--description"
     value=""
     type="text"            
     name="description-3"
     placeholder="Ingredient description"
   />
 </div>

 <div class="ingredients__container">
   <label for="qty4">Quantity</label>
   <input
     id="qty4"
     class="input__ing"
     value=""
     type="text"            
     name="qty-4"
     placeholder="e.g. 4"
   />

   <label for="unit4">Unit</label>
   <input
   class="input__ing"
     id="unit4"
     value=""
     type="text"            
     name="unit-4"
     placeholder="e.g. kg"
   />
   <label for="description4">Description</label>
   <input
     id="description4"
     class="input__ing--description"
     value=""
     type="text"            
     name="description-4"
     placeholder="Ingredient description"
   />
 </div>

 <div class="ingredients__container">
   <label for="qty5">Quantity</label>
   <input
     id="qty5"
     class="input__ing"
     value=""
     type="text"            
     name="qty-5"
     placeholder="e.g. 5"
   />

   <label for="unit5">Unit</label>
   <input
   class="input__ing"
     id="unit5"
     value=""
     type="text"            
     name="unit-5"
     placeholder="e.g. kg"
   />
   <label for="description5">Description</label>
   <input
     id="description5"
     class="input__ing--description"
     value=""
     type="text"            
     name="description-5"
     placeholder="Ingredient description"
   />
 </div>

 <div class="ingredients__container">
   <label for="qty6">Quantity</label>
   <input
     id="qty6"
     class="input__ing"
     value=""
     type="text"            
     name="qty-6"
     placeholder="e.g. 6"
   />

   <label for="unit6">Unit</label>
   <input
   class="input__ing"
     id="unit6"
     value=""
     type="text"            
     name="unit-6"
     placeholder="e.g. kg"
   />
   <label for="description6">Description</label>
   <input
     id="description6"
     class="input__ing--description"
     value=""
     type="text"            
     name="description-6"
     placeholder="Ingredient description"
   />
 </div>
</div>

 <div class="btns__container upload__btn">
   <button class="btn clear__btn">
     <svg>
       <use href="src/img/icons.svg#icon-clear"></use>
     </svg>
     <span>Clear fields</span>
   </button>     
   <button class="btn upload__btn">
     <svg>
       <use href="src/img/icons.svg#icon-upload-cloud"></use>
     </svg>
     <span>Upload</span>
   </button>               
 </div>`;
  }

  resetForm() {
    const isForm = document.querySelector('.upload__column') ?? false;
    isForm ? this._clearFields() : this.render();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this._parentElement)]);
      this._parentElement.style.gridTemplateColumns = '1fr';
      handler(data);
    });
  }

  _init() {
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
    this._addHandlerClear();
  }
}

export default new AddRecipeView();
