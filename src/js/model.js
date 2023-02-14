import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pages: 0,
    currentPage: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObj = function (data) {
  const { recipe } = data;
  return {
    id: recipe.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    publisher: recipe.publisher,
    key: recipe.key ?? null,
  };
};

export const loadRecipe = async function (url) {
  try {
    const res = await AJAX(`${API_URL}/${url}?key=${API_KEY} `);
    //Renaming some propertie names
    console.log(url, res);
    state.recipe = createRecipeObj(res.data);

    // Check if recipe was already bookmarked
    state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)
      ? (state.recipe.bookmarked = true)
      : (state.recipe.bookmarked = false);
  } catch (err) {
    console.log('Lo relanzo en el model');
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const res = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    const { recipes } = res.data;

    console.log(recipes);
    if (!res.results) throw new Error();

    const parsedRecipes = recipes.map(rec => {
      return {
        publisher: rec.publisher,
        image: rec.image_url,
        title: rec.title,
        id: rec.id,
        key: rec.key ?? null,
      };
    });

    state.search = {
      query,
      results: [...parsedRecipes],
      pages: Math.ceil(res.results / RES_PER_PAGE),
      resultsPerPage: RES_PER_PAGE,
      currentPage: 1,
      currentResults: [],
    };
    console.log(state);
  } catch (err) {
    console.log('Se acabo la joda!');
    throw err;
  }
};

export const getSearchResultPage = function (page) {
  state.search.currentPage = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  const resArr = state.search.results.slice(start, end);
  state.search.currentResults = resArr;
  return resArr;
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  saveToLocalStorage('bookmarks', JSON.stringify(state.bookmarks));
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  saveToLocalStorage('bookmarks', JSON.stringify(state.bookmarks));
};

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);
    const ingredients = Object.entries(newRecipe).filter(el => {
      return (
        el[0].startsWith('qty') ||
        el[0].startsWith('unit') ||
        el[0].startsWith('description')
      );
    });

    const ingredientsArr = [];

    for (let i = 1; i < 7; i++) {
      const ingridient = ingredients.filter(el => el[0].endsWith(i));

      const [quantity, unit, description] = ingridient;
      if (!description[1]) continue;

      ingredientsArr.push({
        quantity: +quantity[1] || null,
        unit: unit[1],
        description: description[1],
      });
    }

    if (ingredientsArr.length === 0)
      throw new Error('The recipe does not have any ingredients!');

    const recipe = {
      id: newRecipe.id,
      title: newRecipe.title,
      ingredients: ingredientsArr,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
    };

    const res = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObj(res.data);
    addBookmark(state.recipe);

    return 'hola puto';
  } catch (err) {
    throw err;
  }
};

const saveToLocalStorage = function (key, bookmarks) {
  localStorage.setItem(key, bookmarks);
};

const loadBookmarks = function () {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
};

const init = function () {
  console.log(state);
  loadBookmarks();
};

init();
