import { offersByTypeArr } from '../mock/fish-data';

export default class OffersTypeModel {
  offersTypeArray = offersByTypeArr;

  getOffersType = () => this.offersTypeArray;
}
