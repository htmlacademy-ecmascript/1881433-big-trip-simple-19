import { destinationsArr } from '../mock/fish-data';

export default class DestinationsModel {
  #destinationsArray = null;

  constructor() {
    this.#destinationsArray = destinationsArr;
  }

  get destinations() {
    return this.#destinationsArray;
  }
}
