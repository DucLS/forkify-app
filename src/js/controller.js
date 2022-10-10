import * as model from "./model";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";
import BookmarksView from "./views/BookmarksView";

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Before load recipe
    RecipeView.renderSpinner();

    ResultsView.update(model.getSearchResultsPage());
    BookmarksView.update(model.state.bookmarks);

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

const controlServings = function (newServings) {
  model.updateServings(newServings);

  RecipeView.update(model.state.recipe);
  // RecipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  RecipeView.update(model.state.recipe);
  BookmarksView.render(model.state.bookmarks);
};

const init = function () {
  RecipeView.addHandleRender(showRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(searchResults);
  PaginationView.addHandlerClick(pagination);
};

init();
