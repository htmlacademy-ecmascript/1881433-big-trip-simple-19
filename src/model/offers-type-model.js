export default class OffersTypeModel {
  #offersTypeArray = null;

  constructor(offersByTypeArr) {
    this.#offersTypeArray = offersByTypeArr;
  }

  get offersType() {
    return this.#offersTypeArray;
  }
}
