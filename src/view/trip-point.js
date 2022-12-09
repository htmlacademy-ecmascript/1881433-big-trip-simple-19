import { createElement } from '../render.js';

const createTripPointTemplate = () =>
  (`<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">toDate</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">type name</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">fromDateHoursMinutes</time>
            —
            <time class="event__end-time" datetime="2019-03-18T11:00">toDateHoursMinutes</time>
          </p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">basePrice</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          titlePrice
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );


export default class TripPoint {

  getTemplate() {
    return createTripPointTemplate();
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
