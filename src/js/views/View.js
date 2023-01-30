export default class View {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  renderSpinner() {
    const HTMLTemplate = `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", HTMLTemplate);
  }

  addHandlerView(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
}
