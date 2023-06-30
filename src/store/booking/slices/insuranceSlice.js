import { createAction, createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { InsuranceLoadStatus } from '../types';
import { bookingPurify } from './shared';

const INITIAL_STATE = {
  offers: [],
  offersGroupdByTarriffCode: {},
};

//Actions
export const setInsuranceStatus = createAction(
  '@booking/insurance/calculationStatus'
);

export const getInsuranceCalculationRequest = createAction(
  '@booking/insurance/calculationRequest'
);
export const getInsuranceCalculationSuccess = createAction(
  '@booking/insurance/calculationSuccess'
);
export const getInsuranceCalculationFailure = createAction(
  '@booking/insurance/calculationFailure'
);

export const setInsuranceAgreementRequest = createAction('@booking/insurance/InsuranceAgreementRequest');
export const setInsuranceAgreementSuccess = createAction(
  '@booking/insurance/InsuranceAgreementSuccess'
);

export const switchInsuranseOfferCheck = createAction(
  '@booking/insurance/switch'
);

export const changeInsuranceOffersByTarriffCode = createAction(
  '@booking/insurance/changeOffersByTarriffCode'
);

export const disableAllInsuranceOffers = createAction(
  '@booking/insurance/disableAllInsuranceOffers'
);

//Reducer
const statusReducer = createReducer({}, InsuranceLoadStatus.Default);
const listReducer = createReducer({}, INITIAL_STATE);

statusReducer.on(setInsuranceStatus, (_, payload) => payload);

listReducer.on(getInsuranceCalculationSuccess, (_, payload) => payload);

listReducer.on(switchInsuranseOfferCheck, (state, payload) => {
  const item = state.offers.find((item) => item.product.id === payload);
  if (item) {
    item.checked = !item.checked;
  }
  return { ...state };
});

listReducer.on(changeInsuranceOffersByTarriffCode, (state, payload) => ({
  ...state,
  offers: state.offersGroupdByTarriffCode[payload].map((item) => ({
    ...item,
  })),
}));

listReducer.on(disableAllInsuranceOffers, (state) => {
  return {
    ...state,
    offers: state.offers.map((item) => ({ ...item, checked: false })),
  };
});

listReducer.on(getInsuranceCalculationFailure, () => INITIAL_STATE);
listReducer.on(bookingPurify, () => INITIAL_STATE);

export default combineReducers({
  status: statusReducer,
  list: listReducer,
});
