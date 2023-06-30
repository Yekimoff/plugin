import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { useCalendareContext } from './context';
import { Day } from './day';
import { getDateStatus } from './utilities';
import { TableContainer, Body, Head, DayOfWeek } from './styles';



export const Table = ({ index }) => {
  const { monthState } = useCalendareContext();
  const today = useMemo(
    () => moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
    []
  );

  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const startDay = monthState.date[index]
      .clone()
      .startOf('month')
      .startOf('week');
    const endDay = monthState.date[index]
      .clone()
      .endOf('month')
      .startOf('week');
    const day = startDay.clone().subtract(1, 'day');
    const arr = [];

    while (day.isBefore(endDay, 'day')) {
      arr.push(
        Array(7).fill({}).map(() => {
          const newDay = day.add(1, 'day').clone();
          return {
            status: getDateStatus(newDay, monthState.date[index], today),
            date: newDay,
          };
        })
      );
    }
    setCalendar(arr);
  }, [monthState, today]);

  return (
    <TableContainer>
      <Head>
        <tr>
          <DayOfWeek>пн</DayOfWeek>
          <DayOfWeek>вт</DayOfWeek>
          <DayOfWeek>ср</DayOfWeek>
          <DayOfWeek>чт</DayOfWeek>
          <DayOfWeek>пт</DayOfWeek>
          <DayOfWeek>сб</DayOfWeek>
          <DayOfWeek>вс</DayOfWeek>
        </tr>
      </Head>
      <Body>
        {calendar.map((week, key) => (
          <tr key={key}>
            {week.map((props, key) => (
              <Day key={key} {...props} />
            ))}
          </tr>
        ))}
      </Body>
    </TableContainer>
  );
};
