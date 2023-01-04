import { getRandomInteger, generateTodayDate } from './utils.js';

const GLOBAL_INTEGER = 3;
const PRICE_MIN = 100;
const PRICE_MEDIUM = 250;
const PRICE_MAX = 500;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const PLACES = [
  'Dubay',
  'Tirane',
  'Chaco',
  'Vienna',
  'Lankaran',
  'Flanders',
  'Moscow',
  'Paris',
  'New-York'
];

const VEHICLE_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const createDestination = () => ({
  id: 1,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  name: PLACES[getRandomInteger(0, PLACES.length - 1)],
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]
    }
  ]
});

const createDestinationIdPlus = () => {
  const setDestinations = [];
  for (let i = 0; i < GLOBAL_INTEGER; i++) {
    const nextDestination = createDestination();
    setDestinations.push(nextDestination);
    nextDestination.id += i;
  }
  return setDestinations;
};

const destinationsArr = createDestinationIdPlus();

const createOffer = () => ({
  id: 1,
  title: 'offer title',
  price: getRandomInteger(PRICE_MIN, PRICE_MEDIUM)
});

const chooseOffer = () => {

  const setOffers = [];
  const randomOffersInt = getRandomInteger(0, GLOBAL_INTEGER);

  for (let i = 0; i < GLOBAL_INTEGER - randomOffersInt; i++) {
    const nextOffer = createOffer();
    setOffers.push(nextOffer);
    nextOffer.id += i;
  }

  if (setOffers.length > 0) {
    return setOffers;
  }

};

const createOffersByType = () => ({
  type: VEHICLE_TYPE[getRandomInteger(0, VEHICLE_TYPE.length - 1)],
  offers: chooseOffer()
});

const createOffersByTypeArr = () => {
  const localOffersByTypeArr = [];
  for (let i = 0; i < GLOBAL_INTEGER; i++) {
    const oneArr = createOffersByType();
    localOffersByTypeArr.push(oneArr);
  }
  return localOffersByTypeArr;
};
const offersByTypeArr = createOffersByTypeArr();

const getOffersArr = () => {
  const offersArr = [];

  offersByTypeArr.forEach((element) => {
    if (!element.offers) {
      offersArr.push('');
    } else {
      const elementId = element.offers.map((item) => item.id);
      offersArr.push(elementId);
    }
  });

  return offersArr;
};

const idOffersArray = getOffersArr();

const createPoint = () => ({
  basePrice: getRandomInteger(PRICE_MIN, PRICE_MAX),
  dateFrom: generateTodayDate().beginning,
  dateTo: generateTodayDate().end,
  destination: '$Destination.id$',
  id: 1,
  offers: 'offers',
  type: 'type'
});

const createPointIdPlus = () => {
  const setPoints = [];

  for (let i = 0; i < GLOBAL_INTEGER; i++) {
    const offerObject = offersByTypeArr[i];
    const idOfferArray = idOffersArray[i];
    const nextPoint = createPoint();
    setPoints.push(nextPoint);
    nextPoint.id += i;
    nextPoint.offers = idOfferArray;
    nextPoint.type = offerObject.type;
  }
  return setPoints;
};

const mockPointsArr = createPointIdPlus();

export { destinationsArr, offersByTypeArr, mockPointsArr, GLOBAL_INTEGER };
