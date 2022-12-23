import { setPointsArr } from '../mock/fish-data';

export default class PointModel {
  pointsArray = setPointsArr;

  getPoints = () => this.pointsArray;
}
