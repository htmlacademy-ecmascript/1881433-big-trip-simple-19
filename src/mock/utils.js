import dayjs from 'dayjs';

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
  //'2019-07-11T11:22:13.375Z'
  let localContainer = {};

  let days = dayjs().format('D');
  let months = dayjs().format('MM');
  let years = dayjs().format('YYYY');
  let hours = dayjs().format('HH');
  let minutes = dayjs().format('mm');
  let seconds = dayjs().format('ss');
  let milliseconds = getRandomInteger(0, 999);

  localContainer.today = `${years}-${months}-${days}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  const timefromBeginning = `${Number(years)}-${Number(months) - getRandomInteger(Number(0), Number(months) - Number(1)) < Number(10) ? `0${Number(months) - getRandomInteger(Number(0), Number(months) - Number(1))}` : `${Number(months) - getRandomInteger(Number(0), Number(months) - Number(1))}`}-${Number(days) - getRandomInteger(Number(0), Number(days) - Number(1)) < Number(10) ? `0${Number(days) - getRandomInteger(Number(0), Number(days) - Number(1))}` : `${Number(days) - getRandomInteger(Number(0), Number(days) - Number(1))}`}T${Number(hours) - getRandomInteger(Number(0), Number(hours) - Number(1)) < Number(10) ? `0${Number(hours) - getRandomInteger(Number(0), Number(hours) - Number(1))}` : `${Number(hours) - getRandomInteger(Number(0), Number(hours) - Number(1))}`}:${Number(minutes) - getRandomInteger(Number(0), Number(minutes) - Number(1)) < Number(10) ? `0${Number(minutes) - getRandomInteger(Number(0), Number(minutes) - Number(1))}` : `${Number(minutes) - getRandomInteger(Number(0), Number(minutes) - Number(1))}`}:${seconds}.${Number(milliseconds)}Z`;
  const timeToEnd = `${Number(years)}-${Number(months) + getRandomInteger(Number(0), Number(12) - Number(months)) < Number(10) ? `0${Number(months) + getRandomInteger(Number(0), Number(12) - Number(months))}` : `${Number(months) + getRandomInteger(Number(0), Number(12) - Number(months))}`}-${Number(days) + getRandomInteger(Number(0), Number(28) - Number(days)) < Number(10) ? `0${Number(days) + getRandomInteger(Number(0), Number(28) - Number(days))}` : `${Number(days) + getRandomInteger(Number(0), Number(28) - Number(days))}`}T${Number(hours) + getRandomInteger(Number(0), Number(23) - Number(hours)) < Number(10) ? `0${Number(hours) + getRandomInteger(Number(0), Number(23) - Number(hours))}` : `${Number(hours) + getRandomInteger(Number(0), Number(23) - Number(hours))}`}:${Number(minutes) + getRandomInteger(Number(0), Number(59) - Number(minutes)) < Number(10) ? `0${Number(minutes) + getRandomInteger(Number(0), Number(59) - Number(minutes))}` : `${Number(minutes) + getRandomInteger(Number(0), Number(59) - Number(minutes))}`}:${seconds}.${Number(milliseconds)}Z`;

  localContainer.beginning = timefromBeginning;
  localContainer.end = timeToEnd;

  return localContainer;
}

const times = generateTodayDate();

console.log(times);


export { getRandomInteger, humanizedDateTo, detalizedDateTo, detalizedDateFrom, detalizedHoursMinutesTo, detalizedHoursMinutesFrom, times };
