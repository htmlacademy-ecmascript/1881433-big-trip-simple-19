import { createElement } from '../render.js';
import { humanizedDateTo, detalizedHoursMinutesTo} from '../mock/utils.js';

const destructionTitlePrice = (offers) => {
  let listOffers = '';

  if (offers && offers.length > 0) {
    offers.forEach((offer) => {
      listOffers +=
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
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

  const {basePrice, dateTo, dateFrom} = point;

  const titlePrice = destructionTitlePrice(offers);

  const toDate = humanizedDateTo(dateTo);
  const toDateHoursMinutes = detalizedHoursMinutesTo(dateTo);
  const fromDateHoursMinutes = detalizedHoursMinutesTo(dateFrom);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${toDate}</time>
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


export default class TripPoint {

  constructor(destination, offerDetails, point) {
    this.destination = destination;
    this.offerDetails = offerDetails;
    this.point = point;
  }

  getTemplate() {
    return createTripPointTemplate(this.destination, this.offerDetails, this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
