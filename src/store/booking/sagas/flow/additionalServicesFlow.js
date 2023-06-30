import { put, select, call } from 'redux-saga/effects';
import { addPriceDetailItem, removePriceDetailItem } from '../../duck';
import { getTotalPrice, addictionalServicesSelector } from '../../selectors';
import { updateFareData } from '../workers';

export function* switchAddictionalServiceFlow({
  payload,
}) {
  try {
    const total = yield select(getTotalPrice);
    const addictionalService = yield select(addictionalServicesSelector);
    const item = addictionalService[payload.index];

    if (item.checked) {
      let description = '';
      switch (item.type) {
        case 'SMS_Service':
          description = 'SMS-информирование';
          break;
        case 'Return_Guarantee':
          description = 'Гарантированный возврат билета';
          break;
        case 'Payment_Receipt':
          description = 'Справка о стоимости заказа';
          break;
      }
      yield put(
        addPriceDetailItem({
          total,
          item: {
            description,
            cost: item.amount,
            type: item.type,
            quantity: 0,
            id: item.id,
          },
        })
      );
    } else {
      yield put(removePriceDetailItem({ total, id: item.id }));
    }
    yield call(updateFareData);
  } catch (e) {
    console.log(e);;
  }
}
