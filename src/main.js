import ContentPresenter from './presenter/content-presenter.js';

const appMainElement = document.querySelector('.trip-events');

const contentPresenter = new ContentPresenter();

contentPresenter.init(appMainElement);
