import {render, remove} from '../framework/render.js';
import EverythingFilterButton from '../view/everything-btn-wiew.js';
import FutureFilterButton from '../view/future-btn-view.js';
import PointPresenter from './point-presenter.js';
import ListEmpty from '../view/list-empty-view.js';
import dayjs from 'dayjs';

const today = new Date();

export default class FilterPresenter {
  #points = null;
  #destinations = null;
  #offersDetails = null;
  #appContainer = null;
  #headerFiltersContainer = null;
  #userViewContainer = null;

  #listEmpty = new ListEmpty();

  constructor({
    points,
    destinations,
    offersDetails,
    appContainer,
    headerFiltersContainer,
    userViewContainer
  }) {
    this.#points = points;
    this.#destinations = destinations;
    this.#offersDetails = offersDetails;
    this.#appContainer = appContainer;
    this.#headerFiltersContainer = headerFiltersContainer;
    this.#userViewContainer = userViewContainer;
  }

  init() {
    render(this.#everythingFilterButton, this.#headerFiltersContainer.element);
    render(this.#futureFilterButton, this.#headerFiltersContainer.element);
  }

  #clearBoard(){
    remove(this.#userViewContainer);
  }

  #restoreBoard(){
    render(this.#userViewContainer, this.#appContainer);
  }

  #renderPointsEverything() {
    let i = 0;
    this.#points.slice().forEach((point) => {
      const everythingPointsFilter = new PointPresenter({
        destination: this.#destinations[i],
        offerDetails: this.#offersDetails[i],
        destinations: this.#destinations,
        offersDetails: this.#offersDetails,
        userViewContainer: this.#userViewContainer
      });
      i++;
      return everythingPointsFilter.init(point);
    });
  }

  #renderPointsFuture() {
    this.#points.slice().filter((point) => Number(dayjs(point.dateFrom)) >= Number(today)).forEach((point) => {
      const futurePointsFilter = new PointPresenter({
        destination: this.#destinations[point.id - 1],
        offerDetails: this.#offersDetails[point.id - 1],
        destinations: this.#destinations,
        offersDetails: this.#offersDetails,
        userViewContainer: this.#userViewContainer
      });
      return futurePointsFilter.init(point);
    });
  }

  #everythingFilterButton = new EverythingFilterButton({
    onEverythingChange: () => {
      this.#clearBoard();
      this.#restoreBoard();
      this.#renderPointsEverything();
    }
  });

  #futureFilterButton = new FutureFilterButton({
    onFutureChange: () => {
      this.#clearBoard();
      this.#restoreBoard();
      this.#renderPointsFuture();
      if (!this.#points.slice().some((point) => Number(dayjs(point.dateFrom)) >= Number(today))) {
        render(this.#listEmpty, this.#userViewContainer.element);
      }
    }
  });
}
