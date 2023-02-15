import ContentPresenter from './presenter/content-presenter.js';

import DestinationsModel from './model/destinations-model.js';
import OffersTypeModel from './model/offers-type-model.js';
import PointModel from './model/point-model.js';
import { destinationsArr } from './mock/model-utils.js';
import { offersByTypeArr } from './mock/model-utils';
import { mockPointsArr } from './mock/model-utils';

const appHeaderElement = document.querySelector('.trip-controls__filters');
const appMainElement = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel(destinationsArr);
const offersTypeModel = new OffersTypeModel(offersByTypeArr);
const pointModel = new PointModel(mockPointsArr);

const contentPresenter = new ContentPresenter({
  appHeaderContainer: appHeaderElement,
  appContainer: appMainElement,
  destinationsModel,
  offersTypeModel,
  pointModel
});

contentPresenter.init();
