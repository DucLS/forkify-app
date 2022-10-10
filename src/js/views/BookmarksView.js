import View from "./View";
import PreviewView from "./PreviewView";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmart it";

  _generateMarkup() {
    return this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
