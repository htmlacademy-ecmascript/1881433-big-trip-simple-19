import {render} from './framework/render.js';
import ContentPresenter from './presenter/content-presenter.js';

import HeaderFilterButtons from './view/filters.js';

import DestinationsModel from './model/destinations-model.js';
import OffersTypeModel from './model/offers-type-model.js';
import PointModel from './model/point-model.js';
import { destinationsArr } from './mock/fish-data.js';
import { offersByTypeArr } from './mock/fish-data';
import { mockPointsArr } from './mock/fish-data';

const appHeaderElement = document.querySelector('.trip-controls__filters');
const appMainElement = document.querySelector('.trip-events');

render(new HeaderFilterButtons(), appHeaderElement);

const destinationsModel = new DestinationsModel(destinationsArr);
const offersTypeModel = new OffersTypeModel(offersByTypeArr);
const pointModel = new PointModel(mockPointsArr);

const contentPresenter = new ContentPresenter({
  appContainer: appMainElement,
  destinationsModel,
  offersTypeModel,
  pointModel
});

contentPresenter.init();
