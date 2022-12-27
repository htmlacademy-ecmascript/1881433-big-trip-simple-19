import { createElement } from '../render.js';

const createUserViewContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class UserViewContainer {
  #element = null;

  get template() {
    return createUserViewContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
