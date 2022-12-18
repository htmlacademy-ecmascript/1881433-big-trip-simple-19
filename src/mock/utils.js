import dayjs from 'dayjs';

const MONTHS_12 = 12;
const DAYS_28 = 28;
const HOURS_23 = 23;
const MINUTES_59 = 59;
const NORMAL_AMOUNT = 10;
const NORMAL_LENGTH = 2;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizedDateTo = (dateTo) => dayjs(dateTo).format('D MMMM');

const detalizedDateFrom = (dateFrom) => dayjs(dateFrom).format('D/MM/YY HH:mm');
const detalizedDateTo = (dateTo) => dayjs(dateTo).format('D/MM/YY HH:mm');

const detalizedHoursMinutesTo = (dateTo) => dayjs(dateTo).format('HH:mm');
const detalizedHoursMinutesFrom = (dateFrom) => dayjs(dateFrom).format('HH:mm');

const generateTodayDate = () => {
  const localContainer = {};

  const days = dayjs().format('D');
  const months = dayjs().format('MM');
  const years = dayjs().format('YYYY');
  const hours = dayjs().format('HH');
  const minutes = dayjs().format('mm');
  const seconds = dayjs().format('ss');
  const milliseconds = getRandomInteger(0, 999);

  localContainer.today = `${years}-${months}-${days}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  const decreasedMonth = Number(months) - getRandomInteger(0, Number(months) - 1);
  const decreasedDay = Number(days) - getRandomInteger(0, Number(days) - 1);
  const decreasedHour = Number(hours) - getRandomInteger(0, Number(hours) - 1);
  const decreasedMinute = Number(minutes) - getRandomInteger(0, Number(minutes) - 1);

  const timefromBeginning = `${years}-${String(decreasedMonth).length < NORMAL_LENGTH ? `0${String(decreasedMonth)}` : `${String(decreasedMonth)}`}-${String(decreasedDay).length < NORMAL_LENGTH ? `0${String(decreasedDay)}` : `${String(decreasedDay)}`}T${String(decreasedHour).length < NORMAL_LENGTH ? `0${String(decreasedHour)}` : `${String(decreasedHour)}`}:${String(decreasedMinute).length < NORMAL_LENGTH ? `0${String(decreasedMinute)}` : `${String(decreasedMinute)}`}:${seconds}.${Number(milliseconds)}Z`;
  const timeToEnd = `${years}-${Number(months) + getRandomInteger(0, MONTHS_12 - Number(months)) < NORMAL_AMOUNT ? `0${Number(months) + getRandomInteger(0, MONTHS_12 - Number(months))}` : `${Number(months) + getRandomInteger(0, MONTHS_12 - Number(months))}`}-${Number(days) + getRandomInteger(0, DAYS_28 - Number(days)) < NORMAL_AMOUNT ? `0${Number(days) + getRandomInteger(0, DAYS_28 - Number(days))}` : `${Number(days) + getRandomInteger(0, DAYS_28 - Number(days))}`}T${Number(hours) + getRandomInteger(0, HOURS_23 - Number(hours)) < NORMAL_AMOUNT ? `0${Number(hours) + getRandomInteger(0, HOURS_23 - Number(hours))}` : `${Number(hours) + getRandomInteger(0, HOURS_23 - Number(hours))}`}:${Number(minutes) + getRandomInteger(0, MINUTES_59 - Number(minutes)) < NORMAL_AMOUNT ? `0${Number(minutes) + getRandomInteger(0, MINUTES_59 - Number(minutes))}` : `${Number(minutes) + getRandomInteger(0, MINUTES_59 - Number(minutes))}`}:${seconds}.${Number(milliseconds)}Z`;

  localContainer.beginning = timefromBeginning;
  localContainer.end = timeToEnd;

  return localContainer;
};

export { getRandomInteger, humanizedDateTo, detalizedDateTo, detalizedDateFrom, detalizedHoursMinutesTo, detalizedHoursMinutesFrom, generateTodayDate };
