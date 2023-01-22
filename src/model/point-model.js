export default class PointModel {
  #pointsArray = null;

  constructor(mockPointsArr) {
    this.#pointsArray = mockPointsArr;
  }

  get points() {
    return this.#pointsArray;
  }
}
