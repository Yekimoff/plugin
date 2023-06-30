import { createAction, createReducer } from 'redux-act';
import { bookingPurify } from './shared';

//Actions
export const getAddictionalServicesRequest = createAction(
  '@booking/getAddictionalServicesRequest'
);
export const getAddictionalServicesSuccess =
  createAction(
    '@booking/getAddictionalServicesSuccess'
  );
export const getAddictionalServicesFailure = createAction(
  '@booking/getAddictionalServicesFailure'
);

export const switchAddictionalServiceState = createAction('@booking/switchAddictionalServiceState');

//Reducer
const reducer = createReducer({}, []);

reducer.on(getAddictionalServicesSuccess, (_, payload) => payload);
reducer.on(getAddictionalServicesRequest, () => []);
reducer.on(getAddictionalServicesFailure, () => []);
reducer.on(bookingPurify, () => []);

reducer.on(switchAddictionalServiceState, (state, payload) =>
  state.map((x, key) => {
    if (key === payload.index) {
      return { ...x, checked: payload.value };
    }
    return x;
  })
);

export default reducer;
