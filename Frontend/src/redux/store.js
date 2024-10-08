import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from './geolocationSlice';

export const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
  },
});

export default store;