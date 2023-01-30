import View from "./View";

class SearchView extends View {
    // #parentElement = document.querySelector('.search');
    constructor() {
        super(document.querySelector('.search'));
        this.queryElement = this.parentElement.querySelector('.search__field');
    }

    getQuery() {
        return this.queryElement.value;
    }

    addHandlerSearch(handler) {
        this.parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            handler();
        })
    }

    clearQuery() {
        this.queryElement.value = '';
    }
}

export default new SearchView();
