import { createAction, createReducer } from 'redux-act';
import { bookingPurify } from './shared';
import { createServiceAddictionalInfo } from '../utils';
import _ from 'lodash';

const INITIAL_STATE = [];

//Actions
export const updateAncillaryServices = createAction(
  '@booking/ancillaryServices/update'
);

export const switchAncillaryService = createAction('@booking/ancillaryServices/switch');

//Reducer
const reducer = createReducer({}, INITIAL_STATE);

reducer.on(bookingPurify, () => INITIAL_STATE);
reducer.on(updateAncillaryServices, (_, state) => [...state]);

reducer.on(
  switchAncillaryService,
  (state, { type, passengerId, segmentId, key }) => {
    return state.map((x) => {
      if (x.type !== type ) {
        return x;
      }
      x.offers[segmentId][passengerId] = x.offers[segmentId][passengerId].map(
        (x) => {
          if (x.key !== key) {
            return x;
          }
          return { ...x, checked: !x.checked };
        }
      );
      x.segments = x.segments.map((y) => {
        if (y.id !== segmentId) {
          return y;
        } else {
          return {
            ...y,
            fulfilled: !!_(x.offers[segmentId]).find((x) => {
              return !!_(x).find((x) => x.checked);
            }),
          };
        }
      });
      x.addictionalInfo = createServiceAddictionalInfo(x);
      return { ...x };
    });
  }
);
//key === value.key ? !value.checked : value.checked

export default reducer;
