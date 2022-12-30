import { mockPointsArr } from '../mock/fish-data';

export default class PointModel {
  #pointsArray = null;

  constructor() {
    this.#pointsArray = mockPointsArr;
  }

  get points() {
    return this.#pointsArray;
  }
}
