import AbstractView from '../framework/view/abstract-view.js';

const createUserViewContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class UserViewContainer extends AbstractView{

  get template() {
    return createUserViewContainerTemplate();
  }
}
