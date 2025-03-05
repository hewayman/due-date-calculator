const WORKDAY_START_HOUR = 9;
const WORKDAY_END_HOUR = 17;
const SUNDAY = 0;
const SATURDAY = 6;

const isValidInput = (submitDate: Date, turnaroundTime: number): boolean =>
  submitDate instanceof Date &&
  !isNaN(submitDate.getTime()) &&
  turnaroundTime >= 0;

const isWorkingDay = (date: Date): boolean =>
  date.getDay() !== SUNDAY && date.getDay() !== SATURDAY;

const setWorkdayStartTime = (date: Date): Date => {
  const startTime = new Date(date);
  startTime.setHours(WORKDAY_START_HOUR, 0, 0, 0);
  return startTime;
};

const setWorkdayEndTime = (date: Date): Date => {
  const endTime = new Date(date);
  endTime.setHours(WORKDAY_END_HOUR, 0, 0, 0);
  return endTime;
};

const getNextWorkingDay = (date: Date): Date => {
  let nextDate = new Date(date);

  while (!isWorkingDay(nextDate)) {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  return nextDate;
};

export const adjustDateToBusinessHours = (date: Date): Date => {
  let adjustedDate = new Date(date);
  const currentHour = adjustedDate.getHours();

  if (currentHour < WORKDAY_START_HOUR) {
    adjustedDate = setWorkdayStartTime(adjustedDate);
  } else if (currentHour >= WORKDAY_END_HOUR) {
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    adjustedDate = setWorkdayStartTime(adjustedDate);
  }

  if (!isWorkingDay(adjustedDate)) {
    adjustedDate = getNextWorkingDay(adjustedDate);
    adjustedDate = setWorkdayStartTime(adjustedDate);
  }

  return adjustedDate;
};

const calculateTimeToEndOfDay = (date: Date): number => {
  const currentMilliseconds = date.getTime();
  const endOfDayMilliseconds = setWorkdayEndTime(date).getTime();
  return endOfDayMilliseconds - currentMilliseconds;
};

const processRemainingTime = (
  date: Date,
  remainingMilliseconds: number
): { date: Date; remainingMilliseconds: number } => {
  const currentMilliseconds = date.getTime();
  const millisecondsToEndOfDay = calculateTimeToEndOfDay(date);

  if (remainingMilliseconds <= millisecondsToEndOfDay) {
    date.setTime(currentMilliseconds + remainingMilliseconds);
    remainingMilliseconds = 0;
  } else {
    remainingMilliseconds -= millisecondsToEndOfDay;
    date.setDate(date.getDate() + 1);
    date = getNextWorkingDay(date);
    date = setWorkdayStartTime(date);
  }

  return { date, remainingMilliseconds };
};

export const calculateDueDate = (
  submitDate: Date,
  turnaroundTime: number
): Date | null => {
  if (!isValidInput(submitDate, turnaroundTime)) {
    return null;
  }

  let dueDate = adjustDateToBusinessHours(new Date(submitDate));
  let remainingMilliseconds = turnaroundTime * 60 * 60 * 1000;

  while (remainingMilliseconds > 0) {
    const result = processRemainingTime(dueDate, remainingMilliseconds);
    dueDate = result.date;
    remainingMilliseconds = result.remainingMilliseconds;
  }

  return dueDate;
};
