import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw new Error("We could not find that recipe. Please try another one!");
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((record) => {
      return {
        id: record.id,
        title: record.title,
        publisher: record.publisher,
        image: record.image_url,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
