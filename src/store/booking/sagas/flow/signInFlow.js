import { put, call, select } from 'redux-saga/effects';
import { bookTicket } from '../workers';
import { setStatus, setAuthPopup } from '../../duck';
import { getTempData } from '../../selectors';


/**
 * Sign in user and book order on success
 * @param param0 - data required for sign user
 */
export function* signInFlow({ payload }) {
  yield put(setAuthPopup(false));
  yield put(setStatus(true));
  try {
    const tempData = yield select(getTempData);
    // const isSuccess = yield call(signInWithouRedirect, payload);
    // if (isSuccess) {
    //   try {
    //     yield put(setAuthPopup(false));
    //     yield call(bookTicket, tempData);
    //   } catch (e) {
    //     console.log(e);;
    //     yield put(showNotification({ code: e.name, message: e.message }));
    //   }
    // } else {
    //   yield put(setAuthPopup(true));
    //   throw new Error('Ошибка');
    // }
  } catch (e) {
    console.log(e);;
    yield put(setStatus(false));
    yield put(setAuthPopup(true));
  }
  yield put(setStatus(false));
}
