import View from "./View";

class ResultView extends View {
  constructor() {
    super(document.querySelector(".search-results").querySelector(".results"));
    this.data = [];
  }

  render(data) {
    this.parentElement.innerHTML = "";
    this.data = data;
    let HTMLTemplate = this.#generateHTMLTemplate();
    this.parentElement.insertAdjacentHTML("afterbegin", HTMLTemplate);
  }

  #generateHTMLTemplate() {
    return this.data
      .map((recipe) => {
        return `
        <li class="preview">
            <a class="preview__link preview__link--active" href=#${recipe.id}>
            <figure class="preview__fig">
                <img src=${recipe.image} alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>
        `;
      })
      .join("");
  }
}

export default new ResultView();
