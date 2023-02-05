import {render} from '../framework/render.js';
import MainTripSortItems from '../view/sorting.js';
import UserViewContainer from '../view/user-view-container.js';
import ListEmpty from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import HeaderFiltersContainer from '../view/filters-container-view.js';

export default class ContentPresenter {
  #appHeaderContainer = null;
  #appContainer = null;
  #destinationsModel = null;
  #offersTypeModel = null;
  #pointModel = null;

  #mainTripSortItems = new MainTripSortItems();
  #userViewContainer = new UserViewContainer();
  #headerFiltersContainer = new HeaderFiltersContainer();
  #listEmpty = new ListEmpty();

  #destinations = [];
  #offersDetails = [];
  #points = [];

  constructor({
    appHeaderContainer,
    appContainer,
    destinationsModel,
    offersTypeModel,
    pointModel
  }) {
    this.#appHeaderContainer = appHeaderContainer;
    this.#appContainer = appContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersTypeModel = offersTypeModel;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offersDetails = [...this.#offersTypeModel.offersType];
    this.#points = [...this.#pointModel.points];


    render(this.#mainTripSortItems, this.#appContainer);
    render(this.#userViewContainer, this.#appContainer);
    render(this.#headerFiltersContainer, this.#appHeaderContainer);

    if (this.#points.length === 0) {
      render(this.#listEmpty, this.#userViewContainer.element);
    } else {
      this.#filtersInitialize();
      this.#pointsInitialize();
    }

  };

  #filtersInitialize() {
    const filterPresenter = new FilterPresenter({
      points: this.#points,
      destinations: this.#destinations,
      offersDetails: this.#offersDetails,
      appContainer: this.#appContainer,
      headerFiltersContainer: this.#headerFiltersContainer,
      userViewContainer: this.#userViewContainer
    });
    return filterPresenter.init();
  }

  #pointsInitialize() {
    let i = 0;
    this.#points.slice().forEach((point) => {
      const pointPresenter = new PointPresenter({
        destination: this.#destinations[i],
        offerDetails: this.#offersDetails[i],
        destinations: this.#destinations,
        offersDetails: this.#offersDetails,
        userViewContainer: this.#userViewContainer
      });
      i++;
      return pointPresenter.init(point);
    });
  }

}
