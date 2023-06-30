import moment from 'moment';
import React from 'react';

import { generateMonthList } from './utils';

/** dirty shit */

const CalendarContext = React.createContext(null);

export const useCalendar = () => React.useContext(CalendarContext);



export const CalendareProvider = React.memo(
  ({ children, ...props }) => {
    const [months, setMonths] = React.useState(
      generateMonthList(null, null, props.direction)
    );

    const [dates, setDates] = React.useState({
      dateForward: props.values[0]
        ? moment(props.values[0]).toISOString()
        : null,
      dateBack: props.values[1] ? moment(props.values[1]).toISOString() : null,
    });


    React.useEffect(() => {
      setMonths(
        generateMonthList(dates.dateForward, dates.dateBack, props.direction)
      );
    }, [props.direction]);

    const setDate = (dateStr, direction) => {
      const datesClone = { ...dates };

      if (direction === 'forward') {
        datesClone.dateForward = dateStr;
        props.setDirection('backward');
      } else {
        datesClone.dateBack = dateStr;
        if (
          datesClone.dateBack &&
          datesClone.dateForward &&
          datesClone.dateBack >= datesClone.dateForward
        ) {
          props.onChange &&
            props.onChange([
              moment(datesClone.dateForward),
              datesClone.dateBack ? moment(datesClone.dateBack) : null,
            ]);

          props.setDirection(null);
        } else if (dateStr === null) {
          props.onChange &&
            props.onChange([
              moment(datesClone.dateForward),
              datesClone.dateBack ? moment(datesClone.dateBack) : null,
            ]);

          props.setDirection(null); 
        }
      }
      setDates(datesClone);
      setMonths(
        generateMonthList(
          datesClone.dateForward,
          datesClone.dateBack,
          direction === 'forward' ? 'back' : 'forward'
        )
      );
    };


    return (
      <CalendarContext.Provider
        value={{
          ...props,
          months,
          ...dates,
          setDate,
        }}
      >
        {children}
      </CalendarContext.Provider>
    );
  }
);
