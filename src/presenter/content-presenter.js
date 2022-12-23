import HeaderFilterButtons from '../view/filters.js';
import MainTripSortItems from '../view/sorting.js';
import UserViewContainer from '../view/user-view-container.js';
import TripPoint from '../view/trip-point.js';
import FormEdit from '../view/form-edit.js';
import {render} from '../render.js';
import { GLOBAL_INTEGER } from '../mock/fish-data.js';

export default class ContentPresenter {

  headerFilterButtons = new HeaderFilterButtons();
  mainTripSortItems = new MainTripSortItems();

  userViewContainer = new UserViewContainer();

  init = (appContainer, destinationsModel, offersTypeModel, pointModel) => {
    this.appContainer = appContainer;
    this.appContainer.headerFilterButtons = document.querySelector('.trip-controls__filters');
    this.appContainer.mainTripSortItems = document.querySelector('.trip-events');

    this.destinationsModel = destinationsModel;
    this.destinations = [...this.destinationsModel.getDestinations()];

    this.offersTypeModel = offersTypeModel;
    this.offersDetails = [...this.offersTypeModel.getOffersType()];

    this.pointModel = pointModel;
    this.points = [...this.pointModel.getPoints()];

    render(this.headerFilterButtons, this.appContainer.headerFilterButtons);
    render(this.mainTripSortItems, this.appContainer.mainTripSortItems);

    render(this.userViewContainer, this.appContainer.mainTripSortItems);
    this.appContainer.userViewContainer = document.querySelector('.trip-events__list');


    render(new FormEdit(this.destinations, this.offersDetails, this.points[0]), this.appContainer.userViewContainer);


    for (let i = 0; i < GLOBAL_INTEGER; i++) {
      render(new TripPoint(this.destinations[i], this.offersDetails[i], this.points[i]), this.appContainer.userViewContainer);
    }

  };

}
