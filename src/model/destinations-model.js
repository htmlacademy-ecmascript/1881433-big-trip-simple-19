import { destinationsArr } from '../mock/fish-data';

export default class DestinationsModel {
  destinationsArray = destinationsArr;

  getDestinations = () => this.destinationsArray;
}
