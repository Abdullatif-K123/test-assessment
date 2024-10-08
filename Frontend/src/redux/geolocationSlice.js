import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  email: '',
  geolocation: null,
  loading: false,
  error: '',
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    fetchGeolocationStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    fetchGeolocationSuccess: (state, action) => {
      state.geolocation = action.payload;
      state.loading = false;
    },
    fetchGeolocationError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAddress,
  setEmail,
  fetchGeolocationStart,
  fetchGeolocationSuccess,
  fetchGeolocationError,
} = geolocationSlice.actions;

export default geolocationSlice.reducer;
