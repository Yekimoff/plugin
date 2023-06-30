import { createAction, createReducer } from 'redux-act';
import { bookingPurify } from './shared';



//Actions
export const updatePassengers = createAction(
  '@booking/updatePassenger'
);

export const setPassengerName = createAction(
  '@booking/setPassengerName'
);
export const setPassengerSurname = createAction(
  '@booking/setPassengerName'
);
export const setPassengerSecondName = createAction(
  '@booking/setPassengerName'
);

export const updatePassengerByIndex = createAction('boiking/updatePassengerByIndex');

//Reducer
const reducer = createReducer({}, []);

reducer.on(bookingPurify, () => []);

reducer.on(updatePassengers, (_, payload) => [...payload]);

reducer.on(updatePassengerByIndex, (state, { index, data }) => {
  state[index] = { ...state[index], ...data };
  return [...state];
});

reducer.on(setPassengerName, (state, { value, passengerIndex }) => {
  state[passengerIndex] = { ...state[passengerIndex], name: value };
  return [...state];
});

reducer.on(setPassengerSurname, (state, { value, passengerIndex }) => {
  state[passengerIndex] = { ...state[passengerIndex], surname: value };
  return [...state];
});

reducer.on(setPassengerSecondName, (state, { value, passengerIndex }) => {
  state[passengerIndex] = { ...state[passengerIndex], secondName: value };
  return [...state];
});

export default reducer;
