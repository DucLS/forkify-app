import * as model from "./model";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Before load recipe
    RecipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Render recipe
    RecipeView.render(model.state.recipe);
  } catch (error) {
    RecipeView.renderError(error.message);
  }
};

const searchResults = async function () {
  try {
    ResultsView.renderSpinner();

    const query = SearchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    ResultsView.render(model.getSearchResultsPage());

    PaginationView.render(model.state.search);
  } catch (error) {
    RecipeView.renderError(error.message);
  }
};

const pagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));
  PaginationView.render(model.state.search);
};

const init = function () {
  RecipeView.addHandleRender(showRecipe);
  SearchView.addHandlerSearch(searchResults);
  PaginationView.addHandlerClick(pagination);
};

init();
