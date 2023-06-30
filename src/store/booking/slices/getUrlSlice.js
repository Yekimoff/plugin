import { createAction, createReducer } from 'redux-act';

//Actions
export const getUrlRequest = createAction('@booking/url/getUrlRequest');

export const getUrlSuccess = createAction(
  '@booking/getUrl/getUrlSuccess'
);


//Reducer
const reducer = createReducer({}, null);

reducer.on(getUrlSuccess, (_, payload) => payload?.url);


export default reducer;
 