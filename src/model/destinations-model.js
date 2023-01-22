export default class DestinationsModel {
  #destinationsArray = null;

  constructor(destinationsArr) {
    this.#destinationsArray = destinationsArr;
  }

  get destinations() {
    return this.#destinationsArray;
  }
}
