// eslint-disable-next-line import/named
import moment from "moment";

export function generateMonthList(dateForward, dateBack, direction) {
  const MONTH_LIST_SIZE = 13;
  const result = [];
  const initialDate = moment().startOf("month");

  for (let i = 0; i < MONTH_LIST_SIZE; i++) {
    result.push(generateMonth(initialDate, dateForward, dateBack, direction));
    initialDate.add(1, "month");
  }

  return result;
}

function generateMonth(month, dateForward, dateBack, direction) {
  const initialDate = month.clone().startOf("month").startOf("week");
  const finalDate = month.clone().endOf("month");
  const monthValue = month.clone().startOf("month").format("MMMM YYYY");

  const days = [];

  while (initialDate.isSameOrBefore(finalDate)) {
    days.push({
      disabled: isDisabled(initialDate, dateForward, direction),
      selected: isSelected(initialDate, dateForward, dateBack),
      isBetween: isBetween(initialDate, dateForward, dateBack),
      isVisible: isSameMonth(initialDate, finalDate),
      value: initialDate.format("DD"),
      dateStr: initialDate.toISOString(),
    });
    initialDate.add(1, "day");
  }
  return {
    value: monthValue,
    days,
  };
}

function isBetween(date, dateForward, dateBack) {
  if (!dateForward || !dateBack) {
    return false;
  }
  return moment(date).isBetween(moment(dateForward), moment(dateBack));
}

function isSelected(date, dateForward, dateBack) {
  if (!dateForward && !dateBack) {
    return false;
  }
  return date.isSame(moment(dateForward)) || date.isSame(moment(dateBack));
}

function isDisabled(initialDate, dateForward, direction) {
  const today = moment().startOf("day");
  if (dateForward !== null) {
    return (
      initialDate.isBefore(today) ||
      (initialDate.isBefore(moment(dateForward)) && direction === "back")
    );
  }
  return initialDate.isBefore(today);
}

function isSameMonth(date, month) {
  return date.isSame(month, "month");
}
