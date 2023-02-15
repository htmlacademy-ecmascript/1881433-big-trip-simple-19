import {render, replace, remove} from '../framework/render.js';
import TripPoint from '../view/trip-point.js';
import FormEdit from '../view/form-edit.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #destination = null;
  #offerDetails = null;
  #destinations = null;
  #offersDetails = null;
  #userViewContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleModeChange = null;
  point = null;

  #mode = Mode.DEFAULT;

  constructor({
    destination,
    offerDetails,
    destinations,
    offersDetails,
    userViewContainer,
    onModeChange
  }) {
    this.#destination = destination;
    this.#offerDetails = offerDetails;
    this.#destinations = destinations;
    this.#offersDetails = offersDetails;
    this.#userViewContainer = userViewContainer;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

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


    if (prevPointComponent === null || prevPointEditComponent === null) {
      this.#renderPoint();
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint.call(this);
    }
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    this.#userViewContainer.element.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
    this.#mode = Mode.DEFAULT;
  }
}
