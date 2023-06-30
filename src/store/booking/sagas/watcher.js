import { all, takeLatest, take, call, race } from 'redux-saga/effects';
import {
  selectFlightRequest,
  bookingPurify,
  bookFlightRequest,
  selectFare,
  updatePassengerByIndex,
  switchAncillaryService,
  getInsuranceCalculationRequest,
  switchAddictionalServiceState,
  switchInsuranseOfferCheck,
  disableAllInsuranceOffers,
  selectSeat,
  removeSeatByPassengerId,
  findEmptyPlace,
  setActiveSegment,
  setInsuranceAgreementRequest,
  getUrlRequest
} from '../duck';

import {
  getInsuranceCalculationRequestFlow,
  switchInsuranseOfferCheckFlow,
  hideFareNotificationFlow,
  selectFareFlow,
  checkAvailabilityRequestFlow,
  bookFlightRequestFlow,
  switchAddictionalServiceFlow,
  switchAncillaryServiceFlow,
  disasbleAllInsurancesOffersFlow,
  selectPlaceFlow,
  findEmptyPlaceFlow,
  setActiveSegmentFlow,
  setInsuranceAgreementRequestSaga,
  getUrl
} from './flow';

export default function* bookingFlow() {
  yield all([
    takeLatest(selectFlightRequest.getType(), function* (action) {
      yield race([
        call(checkAvailabilityRequestFlow, action),
        take(bookingPurify.getType()),
      ]);
    }),
    takeLatest(bookFlightRequest.getType(), bookFlightRequestFlow),
    takeLatest(selectFare.getType(), selectFareFlow),
    takeLatest(
      [selectSeat.getType(), removeSeatByPassengerId.getType()],
      selectPlaceFlow
    ),
    takeLatest(
      [updatePassengerByIndex.getType(), switchAncillaryService.getType()],
      hideFareNotificationFlow
    ),
    takeLatest(getInsuranceCalculationRequest.getType(), function* (action) {
      yield race([
        call(getInsuranceCalculationRequestFlow, action),
        take(bookingPurify.getType()),
      ]);
    }),
    takeLatest(
      switchAddictionalServiceState.getType(),
      switchAddictionalServiceFlow
    ),
    takeLatest(
      switchInsuranseOfferCheck.getType(),
      switchInsuranseOfferCheckFlow
    ),
    takeLatest(switchAncillaryService.getType(), switchAncillaryServiceFlow),
    takeLatest(
      disableAllInsuranceOffers.getType(),
      disasbleAllInsurancesOffersFlow
    ),
    takeLatest(findEmptyPlace.getType(), findEmptyPlaceFlow),
    takeLatest(setActiveSegment.getType(), setActiveSegmentFlow),
    takeLatest(
      setInsuranceAgreementRequest.getType(),
      setInsuranceAgreementRequestSaga
    ),
    takeLatest(
      getUrlRequest.getType(),
      getUrl
    ),
  ]);
}
