export const DayStatus = {
  today : 'today',
  hidden : 'hidden',
  disabled : 'disabled',
}

export function isToday(day, today, current) {
  return day.diff(today) === 0 && day.month() === current.month();
}

export function getDateStatus(day, current, today) {
  const currentMonth = current.month();
  if (isToday(day, today, current)) {
    return DayStatus.today;
  }
  if (day.month() !== currentMonth) {
    return DayStatus.hidden;
  }
  if (day.isBefore(today, 'day')) {
    return DayStatus.disabled;
  } else {
    return '';
  }
}

export function isTupleOfNull(arr) {
  return !arr[0] && !arr[1];
}

export function isBefore(date, arr) {
  if (!arr[1]) {
    return date.isBefore(arr[0]);
  } else {
    return date.isBefore(arr[1]);
  }
}
