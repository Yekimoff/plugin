import { createAction, createReducer } from 'redux-act';

const INITIAL_STATE = null;

//Actions
export const initPriceDetail = createAction(
  '@booking/priceDetail/init'
);

export const addPriceDetailItem = createAction('@booking/priceDetail/addItem');

export const updatePriceDetailItem = createAction('@booking/priceDetail/updateItem');

export const removePriceDetailItem = createAction('@booking/priceDetail/removeItem');

export const addPriceItem = createAction(
  '@booking/priceDetail/addItem'
);

export const removePriceItemsByType = createAction(
  '@booking/priceDetail/removeItemByType'
);

export const setSubagentTotal = createAction(
  '@booking/priceDetail/setSubagentTotal'
);

export const priceDetailPurify = createAction('@booking/priceDetail/purify');

//Reducer
const reducer = createReducer({}, INITIAL_STATE);

reducer.on(initPriceDetail, (_, p) => p);

reducer.on(addPriceDetailItem, (s, p) => ({
  ...s,
  total: p.total,
  detailList: [...s.detailList, p.item],
}));

reducer.on(updatePriceDetailItem, (s, p) => ({
  ...s,
  total: p.total,
  detailList: s.detailList.map((x) => {
    if (x.id === p.id) {
      return p.item;
    }
    return x;
  }),
}));

reducer.on(removePriceDetailItem, (s, p) => ({
  ...s,
  total: p.total,
  detailList: s.detailList.filter((x) => x.id !== p.id),
}));

reducer.on(removePriceItemsByType, (s, p) => ({
  ...s,
  detailList: s.detailList.filter((x) =>
    Array.isArray(p) ? !p.includes(x.type) : x.type !== p
  ),
}));

reducer.on(setSubagentTotal, (s, p) => ({ ...s, subagentTotal: p }));

export default reducer;
