import { configureStore} from '@reduxjs/toolkit';
import flightsReducer from './slices/FligthsSlice';
import routerReducer from './slices/routerSlice';
import * as api from './api';
import { all, call } from 'redux-saga/effects';
import createSagaMiddleware  from 'redux-saga';
import bookingSaga from './booking/sagas';
import {booking} from './booking'

function* rootSaga() {
  yield all([
    call(bookingSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();


const store =  configureStore({
  reducer: {
    flights: flightsReducer,
    router: routerReducer,
    booking: booking,
  },
  middleware: (getDefaultMiddleware) => [... getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }),sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;