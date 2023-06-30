import React, { useMemo } from 'react';
import { BaseCalendar } from './baseCalendar';
import { Arrow } from './arrow';
import { DoubleViewWrapper } from './styles';
import { useCalendareContext, MonthProvider } from './context';

export const DoubleView = () => {
  const {
    date,
    handleMonthIncrement,
    handleMonthDecrement,
    monthState,
  } = useCalendareContext();
  const secondMonth = useMemo(() => {
    return date.clone().add(1, 'month');
  }, [date]);

  return (
    <DoubleViewWrapper>
      <Arrow reverse onClick={handleMonthDecrement} />
      <MonthProvider month={date}>
        <BaseCalendar
          month={{
            list: monthState.list[0],
            index: 0,
          }}
          className="calendar-first-table"
        />
      </MonthProvider>
      <MonthProvider month={secondMonth}>
        <BaseCalendar
          month={{
            list: monthState.list[0],
            index: 1,
          }}
        />
      </MonthProvider>
      <Arrow onClick={handleMonthIncrement} />
    </DoubleViewWrapper>
  );
};
