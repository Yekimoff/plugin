import { select, call, put } from 'redux-saga/effects';
// import moment from 'moment';
import _ from 'lodash';
import {
  getBookingTicketState,
  getSelectedFare,
  addictionalServicesSelector,
  bookingInsuranceSelector,
  getBookingAncillaryServicesState,
  getSeatMapState,
} from '../../selectors';
import {  BookingWarnignTypes } from '../../types';
import * as Manager from '../../Manager';
import { createBookingDto } from '../../utils';
import { setAuthPopup } from '../../duck';


export function* bookTicket(data) {
  const ticket = yield select(getBookingTicketState);
  const fare = yield select(getSelectedFare);
  const addictionalServices = yield select(addictionalServicesSelector);
  const seatMapState = yield select(getSeatMapState);
  const insurance = yield select(bookingInsuranceSelector);
  const ancillaryServices = yield select(getBookingAncillaryServicesState);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(decodeURIComponent(queryString));
  const salesChannel = urlParams.get('partner') || 'tui';
  const marker = urlParams.get('marker') || null;

  const isInsurancesChecked = insurance.list.offers.some(
    (item) => item.checked
  );

  const result = yield call(
    Manager.bookTicket,
    createBookingDto(
      ticket,
      ancillaryServices,
      fare.upsellIndex,
      {
        ...data,
        salesChannel,
        isInsurancesChecked,
        marker,
        fareName: fare.name,
        InsuranceProductIds: _(insurance.list.offers)
          .filter((item) => item.checked)
          .map((item) => item.product.id),
      },
      addictionalServices,
      seatMapState,
      null,
    )
  );
  const warning = (result.warnings || []).find(
    (x) => x.type === BookingWarnignTypes.UnconfirmedAncillaryWarning
  );
  if (warning) {
    // yield put(showBookingWarning(warning));
  }

  // yield call(NavigationService.navigate, `/orders/${result.orderNumber}`);
}

/**
 * Check for user authorization.
 * If he is already authorized or user user not exists, call book function, otherwise show popup with auth.
 * @param data
 */
export function* signUp(data) {
  // const authSuccessful = yield call(simpleSignUpSaga, {
  //   ...data,
  //   firstName: data.passengers[0].name,
  //   lastName: data.passengers[0].surname,
  //   patronymic: data.passengers[0].secondName,
  //   birthDate: moment(data.passengers[0].birthDate).format('YYYY-MM-DD'),
  //   gender: data.passengers[0].sex === 'm' ? 'Male' : 'Female',
  // });
  // if (authSuccessful) {
  //   yield call(bookTicket, data);
  // } else {
  //   const { error } = yield select(getUserStatusState);
  //   if (error) {
  //     yield put(setAuthPopup(true));
  //   }
  // }
}
