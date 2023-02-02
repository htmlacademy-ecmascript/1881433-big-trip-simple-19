import AbstractView from '../framework/view/abstract-view.js';

const createEverythingFilterButtonTemplate =
() => (
  `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>`
);

export default class EverythingFilterButton extends AbstractView {
  #handleEverythingChange = null;

  constructor({onEverythingChange}) {
    super();
    this.#handleEverythingChange = onEverythingChange;

    this.element.querySelector('#filter-everything')
      .addEventListener('change', this.#everythingChangeHandler);
  }

  get template() {
    return createEverythingFilterButtonTemplate();
  }

  #everythingChangeHandler = () => {
    this.#handleEverythingChange();
  };
}
