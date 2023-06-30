import { select, put, delay, call } from 'redux-saga/effects';
import {
  getSeatMapState,
  getPriceDetail,
  getTotalPrice,
} from '../../selectors';
import {
  updatePriceDetailItem,
  addPriceDetailItem,
  removePriceItemsByType,
  selectSeat,
  setActivePassenger,
  setActiveSegment,
  setLoadingState,
} from '../../duck';
import { updateFareData } from '../workers';
import _ from 'lodash';

export function* findEmptyPlaceFlow(action) {
  const state = yield select(getSeatMapState);

  const segments = Object.entries(state.list).map(([key, value], i) => {
    return { id: key, notFilled: value.find((x) => x.seat === null) };
  });

  for (const s of segments) {
    if (s.notFilled) {
      const passengers = state.list[s.id].map((x, i) => {
        return { uid: x.uid, selectedSeat: x.seat !== null };
      });

      yield put(setActiveSegment(s.id));
      for (const p of passengers) {
        if (!p.selectedSeat) {
          yield put(setActivePassenger(p.uid));
          break;
        }
      }
      break;
    }
  }
}

export function* selectPlaceFlow(action) {
  const state = yield select(getSeatMapState);

  function findNextEmptyPassenger(segmentId) {
    let currentIndex = 0;
    const passengers = state.list[segmentId || state.selectedSegmentNumber].map(
      (x, i) => {
        if (x.uid === state.selectedPassengerId && !segmentId) {
          currentIndex = i;
        }
        return { uid: x.uid, selectedSeat: x.seat !== null };
      }
    );
    for (let i = currentIndex; i < passengers.length; i++) {
      if (!passengers[i].selectedSeat) {
        return passengers[i].uid;
      }
    }
    return null;
  }

  function findNextNotFilledSegment() {
    let currentIndex = 0;
    const segments = Object.entries(state.list).map(([key, value], i) => {
      if (key === state.selectedSegmentNumber) {
        currentIndex = i;
      }
      return { id: key, notFilled: value.find((x) => x.seat === null) };
    });
    for (let i = currentIndex + 1; i < segments.length; i++) {
      if (segments[i].notFilled) {
        return segments[i].id;
      }
    }
    return null;
  }

  if (action.type === selectSeat.getType()) {
    const nextUid = findNextEmptyPassenger();
    if (nextUid) {
      yield put(setActivePassenger(nextUid));
    } else {
      const nextSegmentId = findNextNotFilledSegment();
      if (nextSegmentId) {
        yield put(setActiveSegment(nextSegmentId));
        const nextNextUid = findNextEmptyPassenger(nextSegmentId);
        if (nextNextUid) {
          yield put(setActivePassenger(nextNextUid));
        }
      }
    }
  }
  const priceDetail = yield select(getPriceDetail);
  const itemExist = !!priceDetail.detailList.find((x) => x.type === 'seatMap');
  const fullTotal = yield select(getTotalPrice);

  const totalPrice = _(state.list)
    .map((x) =>
      x
        .filter((y) => y.seat !== null)
        .reduce(
          (acc, y) =>
            acc + ((y.seat?.price.amount || 0) + (y.seat?.subAgentMarkup || 0)),
          0
        )
    )
    .reduce((acc, x) => acc + x, 0);
  if (totalPrice === 0) {
    yield put(removePriceItemsByType('seatMap'));
  } else if (itemExist) {
    yield put(
      updatePriceDetailItem({
        total: fullTotal,
        id: 'seatMap',
        item: {
          description: 'Место в самолёте',
          cost: totalPrice,
          type: 'seatMap',
          quantity: 1,
          id: 'seatMap',
        },
      })
    );
  } else {
    yield put(
      addPriceDetailItem({
        total: fullTotal,
        item: {
          description: 'Место в самолёте',
          cost: totalPrice,
          type: 'seatMap',
          quantity: 1,
          id: 'seatMap',
        },
      })
    );
  }
  yield call(updateFareData);
}

export function* setActiveSegmentFlow() {
  yield put(setLoadingState(true));
  yield delay(1000);
  yield put(setLoadingState(false));
}
