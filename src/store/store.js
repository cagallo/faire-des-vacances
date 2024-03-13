import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from './features/destinationSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    saveDestinations: destinationsReducer,
  },
  middleware: [thunk],
});

export default store;
