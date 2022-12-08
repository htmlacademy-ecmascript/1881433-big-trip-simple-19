import { createElement } from '../render.js';

const createUserViewContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class UserViewContainer {
  getTemplate() {
    return createUserViewContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
