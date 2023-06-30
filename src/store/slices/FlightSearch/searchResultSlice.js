import { createSlice } from '@reduxjs/toolkit';

export const searchResultSlice = createSlice({
  name: 'search-result',
  initialState: {
    loadingStatus: 'idle',
    error: null,
    data: null,
  },
  reducers: {
    flightSearchRequest: (state) => {
      state.loadingStatus = 'loading';
      state.error = null;
      state.data = null;
    },
    flightSearchSuccess: (state,{payload}) => {
      state.loadingStatus = 'success';
      state.data = payload;
    },
    flightSearchFailure: (state,{payload}) => {
      state.loadingStatus = 'error';
      state.error = payload;
      state.data = null;
    },
    setFlights: (state,{payload}) => {
      state.data.flightsList.items = payload;
    }
  }
});

export const {  
  flightSearchRequest,
  flightSearchSuccess,
  flightSearchFailure,
  setFlights
} = searchResultSlice.actions;  

export default searchResultSlice.reducer;