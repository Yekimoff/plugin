import { put, select } from 'redux-saga/effects';
import {
  initPriceDetail,
  updatePriceDetailItem,
} from '../../duck';
import {
  getSelectedFare,
  getTotalPrice,
} from '../../selectors';
import * as Helper from '../../../../utils';

const getPassengerName = (type, quantity) => {
  switch (type) {
    case 'Adult':
      return Helper.pluralWord(quantity, 'взрослый', 'взрослых', 'взрослых');
    case 'Child':
      return Helper.pluralWord(quantity, 'ребёнок', 'ребёнка', 'детей');
    default:
      return Helper.pluralWord(quantity, 'младенец', 'младенца', 'младенцов');
  }
};

export function* initPriceDetailWorker() {
  const fare = yield select(getSelectedFare);

  const passengerPricesFormated = fare.prices.reduce(
    (acc, x) => [
      ...acc,
      {
        quantity: 1,
        description: `${x.count} ${getPassengerName(x.passengerType, x.count)}`,
        cost: x.total * x.count,
        type: 'pasenger-type',
        id: `${x.count} ${getPassengerName(x.passengerType, x.count)}`,
        subAgentExtraCharge: x?.subAgentExtraCharge,
      },
    ],
    []
  );

  const detailList = [...passengerPricesFormated];

  const totalPrice = yield select(getTotalPrice);

  yield put(
    initPriceDetail({
      total: totalPrice,
      detailList,
    })
  );
}

export function* updateFareData() {
  const fare = yield select(getSelectedFare);

  const passengerPricesFormated = fare.prices.reduce(
    (acc, x) => [
      ...acc,
      {
        quantity: 1,
        description: `${x.count} ${getPassengerName(x.passengerType, x.count)}`,
        cost: x.total * x.count,
        type: 'pasenger-type',
        id: `${x.count} ${getPassengerName(x.passengerType, x.count)}`,
      },
    ],
    []
  );

  const totalPrice = yield select(getTotalPrice);

  const detailList = [...passengerPricesFormated];

  for (const x of detailList) {
    yield put(updatePriceDetailItem({ total: totalPrice, id: x.id, item: x }));
  }
}
