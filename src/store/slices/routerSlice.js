import { createSlice } from '@reduxjs/toolkit';

const MODULES_LIST = [
  'search',
  'booking',
];


const routerSlice = createSlice({
  name: 'router',
  initialState: {
    location: {
      path: MODULES_LIST[0],
      meta: null
    },  
    modules: MODULES_LIST,
  },
  reducers: {
    push: (state,{payload}) => {
      state.location.path = payload.path;
      state.location.meta = payload.meta || null; 
    },

    init: (state,{payload}) => {
      state.modules = payload;
      state.location = {
        path: payload[0],
        meta: null
      }
    }
  }
})

export const {
  push,
  init,
} = routerSlice.actions;

export default routerSlice.reducer;