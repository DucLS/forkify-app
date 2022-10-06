import * as model from "./model";
import recipeView from "./views/recipeView";



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Before load recipe
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err.message);
    recipeView.renderError(err.message);
  }
};

const init = function() {
  recipeView.addHandleRender(showRecipe);
}


init();