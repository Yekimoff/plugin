import { select, put,call } from 'redux-saga/effects';
import {
  getBookingFaresState,
  getSelectedFare,
  bookingInsuranceSelector,
  getCheckedAncillaryServices,
} from '../../selectors';
import {
  hideFareNotification,
  updateAncillaryServices,
  showFareNotification,
  changeInsuranceOffersByTarriffCode,
  removePriceItemsByType,
  purifyCounters,
} from '../../duck';
import { InsuranceLoadStatus } from '../../types';
import { createServices } from '../../utils';
import { updateFareData } from '../workers';


export function* hideFareNotificationFlow() {
  const { notificationVisibility } = yield select(getBookingFaresState);
  if (notificationVisibility) {
    yield put(hideFareNotification());
  }
}

export function* selectFareFlow() {
  try {
    const data = yield select(getSelectedFare);
    const items = yield select(getCheckedAncillaryServices);
    const insurances = yield select(bookingInsuranceSelector);

    const prevSelectedItemsLength =
      items.length + insurances.list.offers.filter((x) => x.checked).length;

    yield put(
      removePriceItemsByType(['meal', 'luggage', 'insurance', 'seatMap'])
    );

    const { status } = yield select(bookingInsuranceSelector);
    const services = createServices(data.services, data);
    yield put(updateAncillaryServices(services));
    if (prevSelectedItemsLength > 0) {
      yield put(showFareNotification());
    } else {
      yield call(hideFareNotificationFlow);
    }

    if (status === InsuranceLoadStatus.Success) {
      yield put(changeInsuranceOffersByTarriffCode(data.code));
    }
    yield call(updateFareData);
    yield put(purifyCounters());
  } catch (e) {
    console.log(e);;
  }
}
