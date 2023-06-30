import { call, spawn } from 'redux-saga/effects';
import {
  checkAvailabilityRequestWorker,
  getAddictionalServicesRequestWorker,
} from '../workers';


/**
 * Используется когда пользователь находится в списке билетов и хочет начать бронирование билета
 * @param param0 - data required for booking page
 */
export function* checkAvailabilityRequestFlow({
  payload,
}) {
  const responseId = yield call(checkAvailabilityRequestWorker, payload);
  if (responseId) {
    yield spawn(
      getAddictionalServicesRequestWorker,
      responseId
    );
  }
}
