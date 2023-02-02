import AbstractView from '../framework/view/abstract-view.js';

const createHeaderFilterContainerTemplate =
() => (
  '<form class="trip-filters" action="#" method="get"></form>'
);

export default class HeaderFiltersContainer extends AbstractView {

  get template() {
    return createHeaderFilterContainerTemplate();
  }
}
