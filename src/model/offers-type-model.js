import { offersByTypeArr } from '../mock/fish-data';

export default class OffersTypeModel {
  #offersTypeArray = null;

  constructor() {
    this.#offersTypeArray = offersByTypeArr;
  }

  get offersType() {
    return this.#offersTypeArray;
  }
}
