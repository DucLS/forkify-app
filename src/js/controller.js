import { loadRecipe, loadSearchResults } from "./model";
import { state } from "./model";
import recipeView from "./views/recipeView";
import errorView from "./views/errorView";
import searchView from "./views/searchView";
import resultView from "./views/resultView";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    await loadRecipe(id);

    recipeView.render(state.recipe);
  } catch (err) {
    new errorView(err.message).render();
  }
};

function init() {
  recipeView.addHandlerView(recipeController);
  searchView.addHandlerSearch(searchController);
}

const searchController = async () => {
  try {
    const query = searchView.getQuery();

    if (!query) return;

    await loadSearchResults(query);

    searchView.clearQuery();

    resultView.renderSpinner();
    resultView.render(state.search.results);
  } catch (err) {
    console.log(err);
  }
};

init();
