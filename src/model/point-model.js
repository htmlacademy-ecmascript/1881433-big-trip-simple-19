import { setPointsArr } from '../mock/fish-data';

export default class PointModel {
  #pointsArray = setPointsArr;

  get points() {
    return this.#pointsArray;
  }
}
