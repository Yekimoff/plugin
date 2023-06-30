import { put, call } from 'redux-saga/effects';
import {
  getAddictionalServicesRequest,
  getAddictionalServicesFailure,
  getAddictionalServicesSuccess,
} from '../../duck';

import * as Manager from '../../Manager';

export function* getAddictionalServicesRequestWorker(responseId) {
  try {
    yield put(getAddictionalServicesRequest());

    const data = yield call(Manager.getAddictionalServices, responseId);
    yield put(
      getAddictionalServicesSuccess(
        (data.additionalServices || []).map((x) => ({ ...x, checked: false }))
      )
    );
  } catch (e) {
    console.log(e);
    yield put(getAddictionalServicesFailure());
  }
}
