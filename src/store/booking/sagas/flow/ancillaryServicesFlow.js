import { put, select } from 'redux-saga/effects';


import {
  addPriceDetailItem,
  removePriceDetailItem,
  updatePriceDetailItem,
} from '../../duck';
import {
  getTotalPrice,
  getBookingAncillaryServicesState,
  getPriceDetail,
} from '../../selectors';

import {AncillaryServiceType} from '../../types'

export function* switchAncillaryServiceFlow({
  payload,
}) {
  try {
    const total = yield select(getTotalPrice);
    const ancillaryServices = yield select(getBookingAncillaryServicesState);
    const priceDetail = yield select(getPriceDetail);

    const serviceByType = ancillaryServices.find(
      (x) => x.type === payload.type
    );

    if (!serviceByType) return;

    const item = serviceByType.offers[payload.segmentId][
      payload.passengerId
    ].find((x) => x.key === payload.key);

    if (!item) return;
    const id = `${item.title}-${item.cost}`;
    const currentItem = priceDetail.detailList.find((x) => x.id === id);
    if (item.checked) {
      let description = item.name;
      if (payload.type === AncillaryServiceType.Luggage) {
        description = item.luggageInfo
          ? `Багаж до ${item.luggageInfo.onePlaceWeight} кг`
          : 'Багаж';
      }
      if (currentItem) {
        yield put(
          updatePriceDetailItem({
            total,
            id: id,
            item: { ...currentItem, quantity: currentItem.quantity + 1 },
          })
        );
      } else {
        yield put(
          addPriceDetailItem({
            total,
            item: {
              description,
              cost: item.total || item?.cost,
              type: payload.type.toLowerCase(),
              quantity: 1,
              id,
            },
          })
        );
      }
    } else {
      if (currentItem && currentItem.quantity > 1) {
        yield put(
          updatePriceDetailItem({
            total,
            id: id,
            item: { ...currentItem, quantity: currentItem.quantity - 1 },
          })
        );
      } else {
        yield put(removePriceDetailItem({ total, id }));
      }
    }
  } catch (e) {
    console.log(e);;
  }
}
