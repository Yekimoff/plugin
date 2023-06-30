import { put, call } from 'redux-saga/effects';
import {getUrlSuccess} from "../../../booking/slices/getUrlSlice"
import * as Manager from '../../Manager';

export function* getUrl(action) {
  try {
    const { payload } = action;
    const data = yield call(Manager.getBookingUrl, payload.id, payload.index);

    yield put(
        getUrlSuccess(
        data
      )
    );
  } catch (e) { 
    console.log(e);
  }
}
