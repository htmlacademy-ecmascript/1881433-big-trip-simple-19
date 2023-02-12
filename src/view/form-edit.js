import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const getCurrentId = (point, destinations) => {
  const destinationIds = destinations.map((item) => item.id);
  const currentId = destinationIds.find((item) => item === point.destination);

  return currentId;
};

const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const renderTypes = (type) => {
  let result = '';
  types.map((item) => {
    result +=
     `<div class="event__type-item">
        <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${type === item.toLowerCase() ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
      </div>`;
  });

  return result;
};

const renderCurrentType = (point, offersDetails) => {
  const offersTypes = offersDetails.map((item) => item.type);

  const currentType = offersTypes.find((item) => item === point.type);

  return currentType;
};

const renderNameOptions = (destinations) => {
  let listOptions = '';
  destinations.map((destination) => {
    listOptions += `<option value="${destination.name}"></option>`;
  });

  return listOptions;
};

const renderDestinationName = (point, destinations) => {
  for (let i = 0; i < destinations.length; i++) {
    const destination = destinations[i];
    if (point.destination === destination.id) {
      return destination.name;
    }
  }
};

const renderDataFrom = (point, destinations) => {
  const eventStartTime = point.dateFrom;
  if (getCurrentId(point, destinations)) {return dayjs(eventStartTime).format('D/MM/YY HH:mm');}
};

const renderDataTo = (point, destinations) => {
  const eventEndTime = point.dateTo;
  if (getCurrentId(point, destinations)) {return dayjs(eventEndTime).format('D/MM/YY HH:mm');}
};

const renderBasePrice = (point, destinations) => {
  const formBasePrice = point.basePrice;
  if (getCurrentId(point, destinations)) {return formBasePrice;}
};


const createFormHeader =
(point, destinations, offersDetails) => (
  `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${renderTypes(point.type)}
          </fieldset>
        </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">${renderCurrentType(point, offersDetails)}</label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${renderDestinationName(point, destinations)}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${renderNameOptions(destinations)}
        </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${renderDataFrom(point, destinations)}">
        &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${renderDataTo(point, destinations)}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${renderBasePrice(point, destinations)}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`
);

const renderOffers = (point, offersDetails) => {
  const pointTypeOffer = offersDetails.find((detail) => detail.type === point.type);
  let listTypeOffers = '';
  let index = 0;

  if (pointTypeOffer.offers) {

    pointTypeOffer.offers.map((offer) => {

      const checked = point.offers.includes(offer.id) ? 'checked' : '';

      listTypeOffers += (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${index}" type="checkbox" ${checked} name="event-offer-seats">
          <label class="event__offer-label" for="event-offer-seats-${index}">
            <span class="event__offer-title">Offer #${index + 1}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );

      index++;

    });
  } else {
    listTypeOffers += '';
  }

  return listTypeOffers;
};


const createSectionOffers = (point, offersDetails) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${renderOffers(point, offersDetails)}
    </div>
  </section>`
);

const getDestinationDescription = (point, destinations) => {
  for (let i = 0; i < destinations.length; i++) {
    const destination = destinations[i];
    if(point.destination === destination.id) {return destination.description;}
  }
};

const createSectionDescriptions = (point, destinations) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${getDestinationDescription(point, destinations)}</p>
  </section>`
);

const createFormEditTemplate = (destinations, offersDetails, point) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createFormHeader(point, destinations, offersDetails)}
      <section class="event__details">
        ${createSectionOffers(point, offersDetails)}
        ${createSectionDescriptions(point, destinations)}
      </section>
    </form>
  </li>`
);

export default class FormEdit extends AbstractView {

  #destinations = null;
  #offersDetails = null;
  #point = null;
  #handleFormClickExit = null;

  constructor({destinations, offersDetails, point, onFormClickExit}) {
    super();
    this.#destinations = destinations;
    this.#offersDetails = offersDetails;
    this.#point = point;
    this.#handleFormClickExit = onFormClickExit;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formClickExitHandler);
  }


  get template() {
    return createFormEditTemplate(this.#destinations, this.#offersDetails, this.#point);
  }

  #formClickExitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClickExit();
  };

}
