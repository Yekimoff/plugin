import { createSlice } from '@reduxjs/toolkit';

const searchFilterSlice = createSlice({
  name: 'search-filter',
  initialState: null,
  reducers: {
    initializeFilter: (_,{payload}) => {
      return {...payload};
    },
    setValues: (state,{payload}) => {
      return {
        ...state,
        values: {...payload}
      }
    }
  }
});

export const {
  initializeFilter,
  setValues
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;