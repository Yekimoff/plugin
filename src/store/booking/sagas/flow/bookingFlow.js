import { put, call, select } from 'redux-saga/effects';
import { bookTicket } from '../workers';
import {InsuranceLoadStatus} from '../../types';
import { setStatus, setAuthPopup, showInsuranceNotification } from '../../duck';
import {
  bookingInsuranceSelector,
  getBookingTicketState,
} from '../../selectors';


//ANCHOR bookFlightSaga используется когда пользователь заполняет данные о пассажирах, опциях на странице /booking и хочет его забронировать
export function* bookFlightRequestFlow() {
  yield put(setStatus(true));

  try {
    const insurances = yield select(bookingInsuranceSelector);
    const ticketState = yield select(getBookingTicketState);

    if (
      ticketState.insuranceNotification !== false &&
      insurances.status === InsuranceLoadStatus.Success &&
      insurances.list.offers.filter((x) => x.checked).length === 0
    ) {
      yield put(showInsuranceNotification());
    } else {
      yield call(bookTicket, payload);
    }
  } catch (e) {
    console.log(e);;
    yield put(setStatus(false));
    // yield put(showNotification({ code: e.name, message: e.message }));
    yield put(setAuthPopup(false));
  }
  yield put(setStatus(false));
}
