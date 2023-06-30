import { put, call } from 'redux-saga/effects';
import {
  setInitializeState,
  setStatus,
  updateAncillaryServices,
  updatePassengers,
  updateFares,
  selectFlightSuccess,
  setSeatMap,
} from '../../duck';
import * as Manager from '../../Manager';
import { createSeatMapState } from '../../utils';
import { initPriceDetailWorker } from './priceDetailWorkers';

export function* checkAvailabilityRequestWorker(
  args
) {
  yield put(setInitializeState(false));

  try {
    yield put(setStatus(true));
    const response = yield call(
      Manager.checkAvailablity,
      args.id,
      args.group,
      args.flights
    );
    yield put(updateAncillaryServices(response.ancillaryServices));
    yield put(updatePassengers(response.passengers));
    yield put(
      updateFares({
        selected: response.fares[0],
        items: response.fares,
        notificationVisibility: false,
      })
    );
    yield put(
      setSeatMap(createSeatMapState(response.fares[0], response.passengers))
    );
    yield put(selectFlightSuccess(response));
    yield call(initPriceDetailWorker);
    yield put(setStatus(false));
    yield put(setInitializeState(true));

    // if (response.priceChanged) {
    //   yield put(showNotification({ code: 999, message: '' }));
    // }
    return response.responseId;
  } catch (e) {
    console.log(e);;
    yield put(setStatus(false));
    return null;
  }
}
