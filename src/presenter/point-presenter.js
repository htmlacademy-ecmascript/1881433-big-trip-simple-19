import {render} from '../framework/render.js';
import TripPoint from '../view/trip-point.js';
import FormEdit from '../view/form-edit.js';

export default class PointPresenter {
  #destination = null;
  #offerDetails = null;
  #destinations = null;
  #offersDetails = null;
  #userViewContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor({
    destination,
    offerDetails,
    destinations,
    offersDetails,
    userViewContainer
  }) {
    this.#destination = destination;
    this.#offerDetails = offerDetails;
    this.#destinations = destinations;
    this.#offersDetails = offersDetails;
    this.#userViewContainer = userViewContainer;
  }

  init(point) {
    this.point = point;

    this.#pointComponent = new TripPoint({
      destination: this.#destination,
      offerDetails: this.#offerDetails,
      point,
      onEditClick: () => {
        this.#replacePointToForm.call(this);
        document.addEventListener('keydown', this.#onEscKeyDown);
      }
    });

    this.#pointEditComponent = new FormEdit({
      destinations: this.#destinations,
      offersDetails: this.#offersDetails,
      point,
      onFormClickExit: () =>{
        this.#replaceFormToPoint.call(this);
        document.removeEventListener('keydown', this.#onEscKeyDown);
      }
    });

    this.#renderPoint();
  }


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault(evt);
      this.#replaceFormToPoint.call(this);
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderPoint(){
    render(this.#pointComponent, this.#userViewContainer.element);
  }

  #replacePointToForm() {
    this.#userViewContainer.element.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
  }

  #replaceFormToPoint() {
    this.#userViewContainer.element.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
  }
}
