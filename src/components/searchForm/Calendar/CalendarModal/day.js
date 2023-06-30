import React, { useMemo } from 'react';
import { useCalendareContext } from './context';
import { DayStatus } from './utilities';
import { DayCell } from './styles';


export const Day = ({ date, status }) => {
  const {
    setValue,
    values,
    setDirection,
    setByIndex,
    sendChanges,
    type,
    direction,
  } = useCalendareContext();

  /** Проверяет можно ли выбрать или нет */
  const isBefore = values[0] !== null ? date.isBefore(values[0]) : false;
  const isDisabled =
    status === DayStatus.disabled ||
    status === DayStatus.hidden ||
    (direction === 'backward' && isBefore);

  // useMemo хреново работает
  // const isDisabled = useMemo(() => {
  //   const isBefore = values[0] !== null ? date.isBefore(values[0]) : false;
  //   return (
  //     status === DayStatus.disabled ||
  //     status === DayStatus.hidden ||
  //     (direction === 'backward' && isBefore)
  //   );
  // }, [status, values]);

  /** Является ли дата выбранной на текущий момент */
  const isActive = useMemo(() => {
    if (isDisabled) {
      return false;
    }
    // return true;
    return (
      values.find((val) => {
        return val ? date.isSame(val) : undefined;
      }) !== undefined
    );
  }, [values, date, isDisabled]);

  /** Находится ли дата между двума выбранными  датами, только для range типа*/
  const isBetween = useMemo(() => {
    if (direction === 'forward' && values[1] === null) {
      return false;
    }
    return Array.isArray(values)
      ? date.isBetween(values[0], values[1]) && !isDisabled
      : false;
  }, [values, date, isDisabled]);

  const handleMouseMove = () => {
    if (!isDisabled) {
      switch (direction) {
        case 'forward':
          if (date.isAfter(values[1])) {
            setValue([date, null]);
          } else {
            setByIndex(date, 0);
          }
          break;
        case 'backward':
          if (date.isBefore(values[0])) {
            return;
          } else {
            setByIndex(date, 1);
          }
          break;
      }
    }
  };

  const handleClick = () => {
    if (!direction) {
      return;
    }
    if (!isDisabled) {
      setValue(date);
      if (direction === 'forward') {
        if (type === 'default') {
          setDirection(null);
        } else {
          setDirection('backward');
        }
      } else {
        setByIndex(date, 1);

        setDirection(null);
      }
      sendChanges();
    }
  };

  return (
    <DayCell
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      disabled={isDisabled}
      today={status === DayStatus.today}
      active={isActive}
      isBetween={isBetween}
    >
      {status === DayStatus.hidden ? '' : date.format('D')}
    </DayCell>
  );
};
