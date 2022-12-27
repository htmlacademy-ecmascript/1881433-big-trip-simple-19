import { offersByTypeArr } from '../mock/fish-data';

export default class OffersTypeModel {
  #offersTypeArray = offersByTypeArr;

  get offersType() {
    return this.#offersTypeArray;
  }
}
