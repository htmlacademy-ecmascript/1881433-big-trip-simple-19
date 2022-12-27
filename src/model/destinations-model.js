import { destinationsArr } from '../mock/fish-data';

export default class DestinationsModel {
  #destinationsArray = destinationsArr;

  get destinations() {
    return this.#destinationsArray;
  }
}
