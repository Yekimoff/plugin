import { createAction, createReducer } from 'redux-act';
import { bookingPurify } from './shared';
import { checkAvailablityNormalizer } from '../utils';
export const INITIAL_STATE = {
  initialized: false,
  authPopup: false,
  loading: false,
  insuranceNotification: null,
};

//Actions
export const selectFlightRequest = createAction(
  '@booking/selectFlightRequest'
);

export const setInitializeState = createAction(
  '@booking/setInitializeState'
);
export const selectFlightSuccess = createAction('booking/selectFlightSuccess');
export const selectFlightFailure = createAction('booking/selectFlightFailure');

// ANCHOR экшен для добавления сервис(старховка и тд)
export const setAdditionalServices = createAction('@booking/setAdditionalServices');

export const setStatus = createAction('booking/setStatus');

export const showInsuranceNotification = createAction(
  '@booking/showInsuranceNotification'
);
export const hideInsuranceNotification = createAction(
  '@booking/hideInsuranceNotification'
);

export const getAgentOrderBillRequest = createAction(
  'order/getAgentOrderBillRequest'
);

export const getAgentOrderBillFail = createAction(
  'order/getAgentOrderBillFail'
);

//ANCHOR экшен для запроса на бронирования текущего перелета
export const bookFlightRequest =
  createAction('@booking/create');

export const setAuthPopup = createAction('@booking/signInPopup');
export const signIn = createAction('@booking/signIn');

//Reducer
const reducer = createReducer({}, INITIAL_STATE);

reducer.on(bookingPurify, () => INITIAL_STATE);

reducer.on(bookFlightRequest, (state, payload) => ({
  ...state,
  tempData: payload,
}));

reducer.on(setInitializeState, (state, payload) => ({
  ...state,
  initialized: payload,
}));

reducer.on(setStatus, (state, payload) => {
  return { ...state, loading: payload };
});

reducer.on(setStatus, (state, payload) => {
  return { ...state, loading: payload };
});

reducer.on(setAuthPopup, (state, payload) => {
  return { ...state, authPopup: payload };
});

reducer.on(showInsuranceNotification, (s) => {
  return {
    ...s,
    insuranceNotification: true,
  };
});
reducer.on(hideInsuranceNotification, (s) => ({
  ...s,
  insuranceNotification: false,
}));

reducer.on(selectFlightSuccess, (state, payload) => {
  return {
    ...state,
    flights: payload.flights,
    prices: payload.fares[0].prices,
    loading: false,
    id: payload.responseId,
    upt: '',
    frequentFlyerAirlines: payload.frequentFlyerAirlines,
    priceChanged: payload.priceChanged,
  };
});

export default reducer;
