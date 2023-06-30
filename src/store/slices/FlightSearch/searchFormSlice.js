import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'search-form',
  initialState: {
    flightClass: 'economy',
    cityFrom: {
      name: 'Москва',
      code: 'MOW',
    },
    cityTo: {
      name: 'Санкт-Петербург',
      code: 'LED',
    },
    firstDate: null,
    secondDate: null,
    passengers: {
      adults: {
        count: 1,
        max: 9,
        min: 1,
      },
      children: {
        count: 0,
        max: 2,
        min: 0,
      },
      infants: {
        count: 0,
        max: 1,
        min: 0,
      },
    }
  },
  reducers: {
    changeCity: (state,{payload}) => {
      state[`city${payload.direction}`] = payload.value;
    },
    changeFlightClass: (state,{payload}) => {
      state.flightClass = payload;
    },
    changeDates: (state,{payload}) => {
      state.firstDate = payload.firstDate,
      state.secondDate = payload.secondDate;
    }, 
    changePassengers: (state,{payload}) => {
      const MAX = 9;
      const adults = payload.adults || state.passengers.adults.count;
    
      const children =
        payload.children !== undefined
          ? payload.children
          : state.passengers.children.count;
    
      const infants =
        payload.infants !== undefined
          ? payload.infants
          : state.passengers.infants.count;
    
      const childrenMin = 0;
      const infantsMin = 0;
      const adultsMax = MAX - (children + infants);
      const adultsMin = Math.max(Math.ceil(children / 2), infants || 1);
    
      const childrenMax =
        MAX - (adults + infants) > adults * 2
          ? adults * 2
          : MAX - (adults + infants);
    
      const infantsMax =
        MAX - (adults + children) > adults ? adults : MAX - (adults + children);
    
      return {
        ...state,
        passengers: {
          adults: {
            count: adults,
            max: adultsMax,
            min: adultsMin,
          },
          children: {
            count: children,
            max: childrenMax,
            min: childrenMin,
          },
          infants: {
            count: infants,
            max: infantsMax,
            min: infantsMin,
          },
        },
      };
    },
  },
});

export const { 
  changePassengers,
  changeCity,
  changeFlightClass,
  changeDates,
} = searchFormSlice.actions;

export default searchFormSlice.reducer;