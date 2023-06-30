import { combineReducers } from 'redux';
import priceDetail from './slices/priceDetailSlice';
import passengers from './slices/passengersSlice';
import insurance from './slices/insuranceSlice';
import addictionalServices from './slices/additionalServicesSlice';
import ancillaryServices from './slices/ancillaryServicesSlice';
import fares from './slices/faresSlice';
import ticket from './slices/ticketSlice';
import seatMap from './slices/seatMap';
import getUrl from './slices/getUrlSlice';

export const booking = combineReducers({
  ticket,
  passengers,
  fares,
  ancillaryServices,
  insurance,
  addictionalServices,
  priceDetail,
  seatMap,
  getUrl
});

export * from './slices';
