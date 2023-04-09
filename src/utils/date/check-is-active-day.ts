import { createDate } from './create-date';

export const checkIsActiveDay = (dayData: number, monthIndexData: number, yearData: number) => {
  const { dayNumber, monthIndex, year, dayNumberInWeek } = createDate();

  if (year === yearData && monthIndex === monthIndexData) {
    if (dayNumberInWeek === 1 && dayData === dayNumber + 1) return true;
    if (dayNumberInWeek <= 5 && dayData === dayNumber + 1) return true;

    if (dayNumberInWeek === 6 && dayData === dayNumber + 3) return true;
    if (dayNumberInWeek === 7 && dayData === dayNumber + 2) return true;
  }

  return false;
};
