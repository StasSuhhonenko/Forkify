import View from '../views/view.js';
// import icons from '../img/icons'; //// Parcel 1
import icons from 'url:../../img/icons.svg'; //// Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    const buttonNext = `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
    const buttonPrev = `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
        <span>Page ${curPage - 1}</span>
        </button>
    `;

    // We are on Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) return buttonNext;
    // We are on Last Page
    if (curPage === numPages && numPages > 1) return buttonPrev;
    // We are on some other page (in between)
    if (curPage < numPages) return [buttonPrev, buttonNext];
    // We are on Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
