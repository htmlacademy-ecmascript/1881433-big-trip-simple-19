import AbstractView from '../framework/view/abstract-view.js';
import { humanizedDateFrom, detalizedHoursMinutesTo, detalizedHoursMinutesFrom} from '../mock/time-utils.js';

const destinationTitlePrice = (offers, type, id) => {
  let listOffers = '';
  id = 1;

  if (offers && offers.length > 0) {
    offers.map((offer) => {

      listOffers +=
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title} ${type} #${id}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;

      id++;
    });
  } else {
    listOffers =
    `<li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
    </li>`;
  }

  return listOffers;
};

const createTripPointTemplate = (destination, offerDetails, point) => {
  const { name } = destination;
  const { type, offers } = offerDetails;
  const { basePrice, dateTo, dateFrom, id } = point;
  const titlePrice = destinationTitlePrice(offers, type, id);
  const fromDate = humanizedDateFrom(dateFrom);
  const toDateHoursMinutes = detalizedHoursMinutesTo(dateTo);
  const fromDateHoursMinutes = detalizedHoursMinutesFrom(dateFrom);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${fromDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${fromDateHoursMinutes}</time>
            —
            <time class="event__end-time" datetime="2019-03-18T11:00">${toDateHoursMinutes}</time>
          </p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${titlePrice}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class TripPoint extends AbstractView {
  #element = null;
  #destination = null;
  #offerDetails = null;
  #point = null;
  #handleEditClick = null;

  constructor({destination, offerDetails, point, onEditClick}) {
    super();
    this.#destination = destination;
    this.#offerDetails = offerDetails;
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }


  get template() {
    return createTripPointTemplate(this.#destination, this.#offerDetails, this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

}
