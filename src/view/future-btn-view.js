import AbstractView from '../framework/view/abstract-view.js';

const createFutureFilterButtonTemplate =
() => (
  `<div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>`
);

export default class FutureFilterButton extends AbstractView {
  #handleFutureChange = null;

  constructor({onFutureChange}) {
    super();
    this.#handleFutureChange = onFutureChange;

    this.element.querySelector('#filter-future')
      .addEventListener('change', this.#futureChangeHandler);
  }

  get template() {
    return createFutureFilterButtonTemplate();
  }

  #futureChangeHandler = () => {
    this.#handleFutureChange();
  };
}
