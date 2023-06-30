import { createAction, createReducer } from 'redux-act';
import { bookingPurify } from './shared';

//Actions
export const selectFare = createAction('@booking/fare/select');

export const updateFares = createAction(
  '@booking/fares/update'
);

export const showFareNotification = createAction(
  '@booking/fare/showNotification'
);
export const hideFareNotification = createAction(
  '@booking/fare/hideNotification'
);

//Reducer
const reducer = createReducer({}, null);

reducer.on(bookingPurify, () => null);
reducer.on(updateFares, (_, payload) => ({ ...payload }));
reducer.on(selectFare, (state, index) => {
  if (!state) return null;
  return {
    ...state,
    selected:
      state.items.find((value) => value.upsellIndex === index) ||
      state.items[0],
  };
});
reducer.on(showFareNotification, (state) => {
  if (!state) return null;
  return {
    ...state,
    notificationVisibility: true,
  };
});
reducer.on(hideFareNotification, (state) => {
  if (!state) return null;
  return {
    ...state,
    notificationVisibility: false,
  };
});

export default reducer;
