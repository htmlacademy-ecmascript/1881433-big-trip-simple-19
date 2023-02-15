import {render, remove} from '../framework/render.js';
import MainTripSortItems from '../view/sorting.js';
import EverythingFilterButton from '../view/everything-btn-wiew.js';
import FutureFilterButton from '../view/future-btn-view.js';
import UserViewContainer from '../view/user-view-container.js';
import ListEmpty from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import HeaderFiltersContainer from '../view/filters-container-view.js';
import dayjs from 'dayjs';

const today = new Date();

export default class ContentPresenter {
  #appHeaderContainer = null;
  #appContainer = null;
  #destinationsModel = null;
  #offersTypeModel = null;
  #pointModel = null;
  everythingFilterButton = null;
  futureFilterButton = null;

  #mainTripSortItems = new MainTripSortItems();
  #userViewContainer = new UserViewContainer();
  #headerFiltersContainer = new HeaderFiltersContainer();
  #listEmpty = new ListEmpty();

  #everythingFilterButton = new EverythingFilterButton({
    onEverythingChange: () => {
      this.#clearPointsList();
      this.#clearBoard();
      this.#restoreBoard();
      this.#pointsInitialize();
    }
  });

  #futureFilterButton = new FutureFilterButton({
    onFutureChange: () => {
      this.#clearPointsList();
      this.#clearBoard();
      this.#restoreBoard();
      this.#renderPointsFuture();
      if (!this.#points.slice().some((point) => Number(dayjs(point.dateFrom)) >= Number(today))) {
        render(this.#listEmpty, this.#userViewContainer.element);
      }
    }
  });

  #destinations = [];
  #offersDetails = [];
  #points = [];

  #pointPresenter = new Map();

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
    render(this.#everythingFilterButton, this.#headerFiltersContainer.element);
    render(this.#futureFilterButton, this.#headerFiltersContainer.element);

    if (this.#points.length === 0) {
      render(this.#listEmpty, this.#userViewContainer.element);
    } else {
      this.#pointsInitialize();
    }

  };

  #clearBoard(){
    remove(this.#userViewContainer);
  }

  #restoreBoard(){
    render(this.#userViewContainer, this.#appContainer);
  }

  #clearPointsList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #pointsInitialize() {
    let i = 0;
    this.#points.slice().forEach((point) => {
      const pointPresenter = new PointPresenter({
        destination: this.#destinations[i],
        offerDetails: this.#offersDetails[i],
        destinations: this.#destinations,
        offersDetails: this.#offersDetails,
        userViewContainer: this.#userViewContainer,
        onModeChange: this.#handleModeChange
      });
      i++;
      pointPresenter.init(point);
      this.#pointPresenter.set(point.id, pointPresenter);
    });
  }

  #renderPointsFuture() {
    this.#points.slice().filter((point) => Number(dayjs(point.dateFrom)) >= Number(today)).forEach((point) => {
      const futurePointsFilter = new PointPresenter({
        destination: this.#destinations[point.destination - 1],
        offerDetails: this.#offersDetails[point.destination - 1],
        destinations: this.#destinations,
        offersDetails: this.#offersDetails,
        userViewContainer: this.#userViewContainer,
        onModeChange: this.#handleModeChange
      });
      futurePointsFilter.init(point);
      this.#pointPresenter.set(point.id, futurePointsFilter);
    });
  }
}
