import View from "./View";

export default class ErrorView extends View {
  constructor(msg) {
    super(document.querySelector(".recipe"));
    this.msg = msg;
  }

  #generateHTMLTemplate() {
    return `
        <div class="error">
            <div>
                <svg>
                    <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${this.msg}</p>
        </div>
      `;
  }

  render() {
    const HTMLTemplate = this.#generateHTMLTemplate(this.msg);

    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", HTMLTemplate);
  }
}
