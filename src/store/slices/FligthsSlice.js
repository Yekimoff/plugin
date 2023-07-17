import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { push } from "./routerSlice";
import {test, test2, test3, test4} from "../../utils/time"
// import {filter} from 'lodash';

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    flightClass: "economy",
    cityFrom: {
      name: "Москва",
      code: "MOW",
    },
    cityTo: {
      name: "",
      code: "",
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
    },
  },
  reducers: {
    changeCity: (state, { payload }) => {
      state[`city${payload.direction}`] = payload.value;
    },
    changeFlightClass: (state, { payload }) => {
      state.flightClass = payload;
    },
    changeDates: (state, { payload }) => {
      (state.firstDate = payload.firstDate),
        (state.secondDate = payload.secondDate);
    },
    changePassengers: (state, { payload }) => {
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

export const searchResultSlice = createSlice({
  name: "search-result",
  initialState: {
    loadingStatus: "idle",
    error: null,
    data: null,
  },
  reducers: {
    flightSearchRequest: (state) => {
      state.loadingStatus = "loading";
      state.error = null;
      state.data = null;
    },
    flightSearchSuccess: (state, { payload }) => {
      state.loadingStatus = "success";
      state.data = payload;
    },
    flightSearchFailure: (state, { payload }) => {
      state.loadingStatus = "error";
      state.error = payload;
      state.data = null;
    },
    setFlights: (state, { payload }) => {
      state.data.flightsList.items = payload;
    },
  },
});

const searchFilterSlice = createSlice({
  name: "search-filter",
  initialState: null,
  reducers: {
    initializeFilter: (_, { payload }) => {
      return { ...payload };
    },
    setValues: (state, { payload }) => {
      return {
        ...state,
        values: { ...payload },
      };
    },
  },
});

export const { changePassengers, changeCity, changeFlightClass, changeDates } =
  searchSlice.actions;

export const {
  flightSearchRequest,
  flightSearchSuccess,
  flightSearchFailure,
  setFlights,
} = searchResultSlice.actions;

export const { initializeFilter, setValues } = searchFilterSlice.actions;

export function loadFlights({tokenData}) {
  return async (dispatch, getState, api) => {
    dispatch(flightSearchRequest());
    dispatch(push({ path: "search" }));
    try {
      const {
        passengers,
        cityFrom,
        cityTo,
        flightClass,
        firstDate,
        secondDate,
      } = getState().flights.searchParams;
      const { filter, ...result } = await api.fetchFlights({
        tokenData,
        passengers,
        cityFrom,
        cityTo,
        flightClass,
        firstDate,
        secondDate,
      });
      dispatch(flightSearchSuccess(result));
      dispatch(initializeFilter(filter));
    } catch (e) {
      console.log(e);
      dispatch(flightSearchFailure(e));
    }
  };
}

export function filterFlights(payload) {
  return async (dispatch, getState, api) => {
    try {
      const items = getState().flights.result.data.flightsList.notFilteredItems;
      const values = { ...getState().flights.filter.values };
      switch (payload.type) {
        case "price":
          values.prices = [...payload.value];
          break;
        case "flightsDurations": {
          let clone = [...values.flightsDurations];
          clone[payload.key] = [...payload.value];
          values.flightsDurations = clone;
          break;
        }
        case "time": {
          let clone = [...values.time];
          let clone2 = { ...clone[payload.key] };
          clone2[payload.direction] = [...payload.value];
          clone[payload.key] = clone2;
          values.time = clone;
          break;
        }
        case "airlines": {
          if (payload.checked) {
            values.airlines = Array.from(
              new Set([...values.airlines, payload.code])
            );
          } else {
            values.airlines = values.airlines.filter((x) => x !== payload.code);
          }
          break;
        }
        case "flightType": {
          if (payload.checked) {
            values.flightTypes = Array.from(
              new Set([...values.flightTypes, payload.code])
            );
          } else {
            values.flightTypes = values.flightTypes.filter(
              (x) => x !== payload.code
            );
          }
          break;
        }

        case "airports": {
          if (payload.checked) {
            values.airports = Array.from(
              new Set([...values.airports, payload.code])
            );
          } else {
            values.airports = values.airports.filter((x) => x !== payload.code);
          }
          break;
        }

        case "baggage": {
          if (payload.checked) {
            values.baggage = Array.from(
              new Set([...values.baggage, payload.value])
            );
          } else {
            values.baggage = values.baggage.filter((x) => x !== payload.value);
          }
          break;
        }
      }

      dispatch(setValues(values));

      let nextItems = items
        .filter(
          (x) =>
            x.prices[0] >= values.prices[0] && x.prices[0] <= values.prices[1]
        )
        .filter((x) =>
          x.flights.reduce(
            (acc, y, key) =>
              acc &&
              y.duration >= values.flightsDurations[key][0] &&
              y.duration <= values.flightsDurations[key][1],
            true
          )
        )
        .filter((x) =>
          x.flights.reduce((acc, y, key) => {
            return acc;
          }, true)
        );

     

      if (values.airlines.length > 0) {
        nextItems = nextItems.filter(
          (x) => !!x.airlinesInfo.find((x) => values.airlines.includes(x.code))
        );
      }

      if (values.flightTypes.length > 0) {
        nextItems = nextItems.filter((x) =>
          values.flightTypes.includes(x.flight_Type)
        );
      }

      if (values.airports.length > 0) {
        const test = nextItems.filter((x) =>
          x.flights.find((y) => values.airports.includes(y.from.code))
        );
        const test2 = nextItems.filter((x) =>
          x.flights.find((y) => values.airports.includes(y.to.code))
        );
        const result =
          test.length > 0 && test2.length > 0
            ? test.filter((x) => test2.includes(x))
            : test.length > 0 && test2.length === 0
            ? test
            : test2;
        nextItems = result;
      }

      if (values.baggage.length !== 0 || values.baggage.length !== 2) {
        const t = values.baggage[0];
        if (t === 0) {
          nextItems = nextItems.filter(
            (x) => x.baggage === null || x.baggage.value === null
          );
        } else {
          nextItems = nextItems.filter(
            (x) => x.baggage === null || x.baggage.value !== null
          );
        }
      }
      const filteredArr = (arr, arr2, arr3, arr4, arr5) => {
        return arr.map((x, i) => (arr2[i] && arr3[i] && arr4[i] && arr5[i]) === true && arr[i]).filter(Boolean);
      };
      nextItems = filteredArr(nextItems,test(nextItems, values), test2(nextItems, values), test3(nextItems, values), test4(nextItems, values))
  

      dispatch(setFlights(nextItems));
    } catch (e) {
      console.log(e);
    }
  };
}

export default combineReducers({
  searchParams: searchSlice.reducer,
  result: searchResultSlice.reducer,
  filter: searchFilterSlice.reducer,
});
