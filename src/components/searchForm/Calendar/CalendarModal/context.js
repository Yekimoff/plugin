import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
//eslint-disable-next-line
import moment from 'moment';
import { isTupleOfNull, isBefore } from './utilities';
import map from 'lodash/map';
import flow from 'lodash/flow';
const MainContext = createContext(null);

export const useCalendareContext = () => useContext(MainContext);




/** Month */

const changeMonth = (date, index) => (state) => ({
  ...state,
  date: state.date.map((item, key) => {
    return index === key ? date : item;
  }),
});
const incrementMonth = (state) => {
  return {
    ...state,
    date: map(state.date, (date) => {
      const newDate = date.clone().add(1, 'month');
      return newDate;
    }),
  };
};
const decrementMonth = (state) => {
  return {
    ...state,
    date: map(state.date, (date) => {
      date.subtract(1, 'month');
      return date;
    }),
  };
};

const updateMonthList = (state) => {
  const list = Object.entries(state.date).map(([index, date]) => {
    const arr = {};
    const startDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    date.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    for (let i = 0; i < 9; i++) {
      if (typeof arr[startDate.format('YYYY')] === 'undefined') {
        arr[startDate.format('YYYY')] = [];
      }
      arr[startDate.format('YYYY')].push({
        date: startDate.clone(),
        selected: startDate.isSame(date),
      });
      startDate.add(1, 'month');
    }
    return arr;
  }, state.date);
  return {
    ...state,
    list,
  };
};


export const CalendarProvider = ({
  children,
  type = 'default',
  onChange,
  ...props
}) => {
  const [monthState, setMonthState] = useState({
    date: [moment(), moment()],
    list: [],
  });

  useEffect(() => {
    const newState = flow(
      changeMonth(moment().add(1, 'month'), 1),
      updateMonthList
    )(monthState);
    setMonthState(newState);
  }, []);

  const handleMonthChange = (month, index) => {
    setMonthState(flow(changeMonth(month, index), updateMonthList)(monthState));
  };

  const handleMonthIncrement = () => {
    setMonthState(flow(incrementMonth, updateMonthList)(monthState));
  };

  const handleMonthDecrement = () =>
    setMonthState(flow(decrementMonth, updateMonthList)(monthState));

  const [date, setDate] = useState(
    moment(props.date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  );
  const valuesOfParent = props.values;

  const [values, setValues] = useState([null, null]);
  const [movedDateIndex, setMovedDateIndex] = useState(null);

  const setByIndex = (date, index) => {
    const arr = values;
    arr[index] = date;
    setValues([...arr]);
  };

  const sendChanges = useCallback(
    (val) => {
      typeof onChange === 'function' && onChange(val || values);
    },
    [onChange, type, values, valuesOfParent]
  );

  const handleSetValues = useCallback(
    (value) => {
      const setValuesWithMIddleware = (val) => {
        setValues(val);
        sendChanges(val);
      };

      if (type === 'default') {
        setValuesWithMIddleware([value, null]);
      } else if (type === 'range' && Array.isArray(values)) {
        if (Array.isArray(value)) {
          setValuesWithMIddleware(value);
        } else if (isTupleOfNull(values)) {
          setValuesWithMIddleware([value, null]);
        } else if (isBefore(value, values)) {
          setValuesWithMIddleware([value, values[1]]);
        } else {
          setValuesWithMIddleware([values[0], value]);
        }
      }
      setMovedDateIndex(null);
    },
    [values, type, setValues, sendChanges]
  );

  useEffect(() => {
    if (!valuesOfParent) {
      return;
    }
    setValues(valuesOfParent);
  }, [valuesOfParent, type]);

  useEffect(() => {
    moment(props.date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  }, [props.date]);

  return (
    <MainContext.Provider
      value={{
        direction: props.direction,
        setDirection: props.setDirection,
        date,
        setDate,
        values,
        setValue: handleSetValues,
        setMovedDateIndex,
        movedDateIndex,
        setByIndex,
        sendChanges,
        type,
        handleMonthIncrement,
        handleMonthDecrement,
        handleMonthChange,
        monthState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};



export const MonthContext = createContext(null);
export const useMonth = () => useContext(MonthContext);


export const MonthProvider = ({
  month = moment(),
  children,
}) => {
  const [data, setData] = useState(month);
  const [selectVisibility, setSelectVisibility] = useState(false);

  /** Month list for month selector */
  const monthList = useMemo(() => {
    const arr = {};
    const date = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    for (let i = 0; i < 9; i++) {
      if (typeof arr[date.format('YYYY')] === 'undefined') {
        arr[date.format('YYYY')] = [];
      }
      arr[date.format('YYYY')].push(date.clone());
      date.add(1, 'month');
    }

    return arr;
  }, []);

  useEffect(() => {
    setData(month);
  }, [month]);

  return (
    <MonthContext.Provider
      value={{
        month: data,
        setMonth: setData,
        monthList,
        selectVisibility,
        setSelectVisibility,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
};
