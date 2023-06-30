import { call, put, select, delay } from 'redux-saga/effects';
import _ from 'lodash';
import { InsuranceLoadStatus } from '../../types';
import {
  getBookingFaresState,
  getTotalPrice,
  bookingInsuranceSelector,
} from '../../selectors';
import * as Manager from '../../Manager';
import {
  setInsuranceStatus,
  getInsuranceCalculationSuccess,
  getInsuranceCalculationFailure,
  addPriceDetailItem,
  removePriceDetailItem,
} from '../../duck';


const MIN_DELAY = 500;
const MAX_DELAY = 5000;

export function* getInsuranceCalculationRequestFlow({
  payload,
}) {
  const { selected, items } = yield select(getBookingFaresState);
  let delayTime = MIN_DELAY;
  while (true) {
    try {
      yield put(setInsuranceStatus(InsuranceLoadStatus.Loading));
      const response = yield call(Manager.getInsurances, payload);
      const offersGroupdByTarriffCode = _(response).reduce(
        (acc, x) => ({
          ...acc,
          [x.fareCode || items[0].code]: x.offerByProducts,
        }),
        {}
      );
      yield put(
        getInsuranceCalculationSuccess({
          offers: offersGroupdByTarriffCode[selected.code].map((item) => ({
            ...item,
          })),
          offersGroupdByTarriffCode,
        })
      );
      yield put(setInsuranceStatus(InsuranceLoadStatus.Success));
      break;
    } catch (e) {
      // if no content try to fetch again
      if (e.name == 204) {
        yield delay(delayTime);
        delayTime = delayTime > MAX_DELAY - 1000 ? MAX_DELAY : delayTime * 2;
        continue;
      } else {
        console.log(e);;
        yield put(getInsuranceCalculationFailure());
        yield put(setInsuranceStatus(InsuranceLoadStatus.Failure));
        break;
      }
    }
  }
}

export function* switchInsuranseOfferCheckFlow({ payload }) {
  try {
    const total = yield select(getTotalPrice);
    const insurances = yield select(bookingInsuranceSelector);
    const item = insurances.list.offers.find((x) => x.product.id === payload);
    if (!item) {
      return;
    }
    if (item.checked) {
      yield put(
        addPriceDetailItem({
          total,
          item: {
            description: item.product.name,
            cost: item.totalRate.value,
            type: 'insurance',
            quantity: 0,
            id: item.product.id,
          },
        })
      );
    } else {
      yield put(removePriceDetailItem({ total, id: item.product.id }));
    }
  } catch (e) {
    console.log(e);;
  }
}

export function* disasbleAllInsurancesOffersFlow() {
  try {
    const total = yield select(getTotalPrice);
    const insurances = yield select(bookingInsuranceSelector);

    for (const x of insurances.list.offers) {
      yield put(removePriceDetailItem({ total, id: x.product.id }));
    }
  } catch (e) {
    console.log(e);;
  }
}

export function* setInsuranceAgreementRequestSaga() {
  const { payload } = action;

  try {
    const result = yield call(Manager.setInsuranceAgreement, payload);
    // console.log(result);
  } catch (e) {
    // console.log(e);
  }
}
