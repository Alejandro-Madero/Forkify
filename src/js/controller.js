//Polyfills
import 'core-js/stable';
//Async-await
import 'regenerator-runtime/runtime';
//JS Modules
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Get hash
    const url = window.location.hash.slice(1);
    if (!url) return;

    // 0- Mark active result search:
    resultsView._markActiveRecipe(url);
    bookmarksView.update(model.state.bookmarks);

    // 1- Loading Recipe:
    await model.loadRecipe(url);

    // 2- Rendering recipe:
    recipeView.render(model.state.recipe);
  } catch (err) {
    //Render error message :
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render search results:
    const page = model.getSearchResultPage(model.state.search.currentPage);
    resultsView.render(page);

    //4) Render pagination:
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderErrorMessage();
  }
};

const controlPagination = function (page) {
  const currentRes = model.getSearchResultPage(page);
  console.log(model.state);
  resultsView.render(currentRes);
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  //Update recipe servings:
  model.updateServings(servings);

  //Update recipe view:
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  recipeView.update(model.state.recipe);

  // Render bookmarks:
  model.state.bookmarks.length === 0
    ? bookmarksView.renderErrorMessage()
    : bookmarksView.render(model.state.bookmarks);
};

const controlLoadBookmarks = function () {
  if (model.state.bookmarks.length > 0) {
    bookmarksView.render(model.state.bookmarks);
  }
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Render spinner
    addRecipeView.renderSpinner();

    //Upload recipe
    await model.uploadRecipe(newRecipe);

    //Render sucess message
    addRecipeView.renderMessage();

    //Render recipe
    recipeView.render(model.state.recipe);

    //Update bookmarks
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL:

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Clear and hide form
    setTimeout(() => {
      addRecipeView.toggleWindow();
      addRecipeView.resetForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderErrorMessage(err);
  }
};

//EVENTS
const init = function () {
  bookmarksView.addHandlerLoadBookmarks(controlLoadBookmarks);
  recipeView.renderMessage();
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtn(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
