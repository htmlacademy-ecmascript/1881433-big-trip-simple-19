import dayjs from 'dayjs';

const MAX_MINUTES = 60;
const MAX_HOURS = 24;
const SOME_DAYS = 10;
const MAX_DAYS = 31;
const MIN_MONTHS = -1;
const MAX_MONTHS = 1;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizedDateTo = (dateTo) => dayjs(dateTo).format('D MMMM');
const humanizedDateFrom = (dateFrom) => dayjs(dateFrom).format('D MMMM');

const detalizedDateFrom = (dateFrom) => dayjs(dateFrom).format('D/MM/YY HH:mm');

const detalizedHoursMinutesTo = (dateTo) => dayjs(dateTo).format('HH:mm');
const detalizedHoursMinutesFrom = (dateFrom) => dayjs(dateFrom).format('HH:mm');

const generateTodayDate = () => {
  const localContainer = {};

  const timefromBeginning = dayjs().subtract(getRandomInteger(MIN_MONTHS, 0), 'month').subtract(getRandomInteger(0, SOME_DAYS), 'day').subtract(getRandomInteger(0, MAX_HOURS), 'hour').subtract(getRandomInteger(0, MAX_MINUTES), 'minute').format();
  const timeToEnd = dayjs().add(getRandomInteger(0, MAX_MONTHS), 'month').add(getRandomInteger(SOME_DAYS, MAX_DAYS), 'day').add(getRandomInteger(0, MAX_HOURS), 'hour').add(getRandomInteger(0, MAX_MINUTES), 'minute').format();

  localContainer.beginning = timefromBeginning;
  localContainer.end = timeToEnd;

  return localContainer;
};

export { getRandomInteger, humanizedDateTo, humanizedDateFrom, detalizedDateFrom, detalizedHoursMinutesTo, detalizedHoursMinutesFrom, generateTodayDate };
