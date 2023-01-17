import {render} from '../framework/render.js';
import MainTripSortItems from '../view/sorting.js';
import UserViewContainer from '../view/user-view-container.js';
import TripPoint from '../view/trip-point.js';
import FormEdit from '../view/form-edit.js';
import ListEmpty from '../view/list-empty-view.js';

export default class ContentPresenter {

  #appContainer = null;
  #destinationsModel = null;
  #offersTypeModel = null;
  #pointModel = null;

  #mainTripSortItems = new MainTripSortItems();
  #userViewContainer = new UserViewContainer();
  #listEmpty = new ListEmpty();

  #destinations = [];
  #offersDetails = [];
  #points = [];

  constructor({ appContainer, destinationsModel, offersTypeModel, pointModel }) {
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

    if (this.#points.length === 0) {
      render(this.#listEmpty, this.#userViewContainer.element);
    } else {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#destinations[i], this.#offersDetails[i], this.#points[i], this.#destinations, this.#offersDetails);
      }
    }

  };

  #renderPoint (destination, offerDetails, point, destinations, offersDetails){

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const pointComponent = new TripPoint({
      destination,
      offerDetails,
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const pointEditComponent = new FormEdit({
      destinations,
      offersDetails,
      point,
      onFormClickExit:() =>{
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });

    function replacePointToForm() {
      this.#userViewContainer.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceFormToPoint() {
      this.#userViewContainer.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#userViewContainer.element);
  }

}
