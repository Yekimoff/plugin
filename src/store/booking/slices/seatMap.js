import { createAction, createReducer } from 'redux-act';
import { setSegmentsAccessibility } from '../utils';

export const setSeatMap = createAction('@booking/seatMap/set');
export const setActivePassenger = createAction(
  '@booking/seatMap/setActivePassenger'
);
export const setActiveSegment = createAction(
  '@booking/seatMap/setActiveSegment'
);

export const selectSeat = createAction(
  '@booking/seatMap/selectSeat'
);

export const removeSeatByPassengerId = createAction(
  '@booking/seatMap/selectSeat'
);

export const purifyCounters = createAction('@booking/seatMap/purifyCounters');
export const findEmptyPlace = createAction('@booking/seatMap/findEmptyPlace');
export const setSeatCount = createAction('@booking/seatMap/setCount');
export const setLoadingState = createAction(
  '@booking/seatMap/setLoadingState'
);

const reducer = createReducer({}, null);

reducer.on(setSeatMap, (_, p) => ({ ...p }));
reducer.on(setActivePassenger, (s, p) => ({ ...s, selectedPassengerId: p }));
reducer.on(setActiveSegment, (s, p) => ({ ...s, selectedSegmentNumber: p }));
reducer.on(setLoadingState, (s, p) => ({ ...s, loading: p }));
reducer.on(purifyCounters, (s, p) => ({
  ...s,
  totalPrice: 0,
  selectedSeatCount: 0,
}));
reducer.on(selectSeat, (s, p) => {
  s.list[s.selectedSegmentNumber] = s.list[s.selectedSegmentNumber].map((x) => {
    if (x.seat !== null && x.seat.number === p.number) {
      s.totalPrice -= p.price.amount;
      s.selectedSeatCount -= 1;
      return { ...x, seat: null };
    }
    if (x.uid === s.selectedPassengerId) {
      if (x.seat !== null) {
        s.totalPrice -= x.seat.price.amount;
        s.selectedSeatCount -= 1;
      }
      s.totalPrice += p.price.amount;
      s.selectedSeatCount += 1;
      return { ...x, seat: p };
    }
    return x;
  });

  return { ...s, ...setSegmentsAccessibility(s) };
});

reducer.on(removeSeatByPassengerId, (s, p) => {
  s.list[s.selectedSegmentNumber] = s.list[s.selectedSegmentNumber].map((x) => {
    if (x.uid === p) {
      if (x.seat) {
        s.totalPrice -= x.seat.price.amount;
        s.selectedSeatCount -= 1;
      }
      return { ...x, seat: null };
    }
    return x;
  });

  return { ...s, ...setSegmentsAccessibility(s) };
});

export default reducer;
