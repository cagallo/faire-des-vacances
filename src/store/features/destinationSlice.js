import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDestinations } from '../../utils';

export const fetchAllDestinations = createAsyncThunk(
  'destinations/fetchAllDestinations',
  async () => {
    return await fetchDestinations();
  }
);

const destinationSlice = createSlice({
  name: 'destinations',
  initialState: [],
  reducers: {
    saveDestinations: (state, action) => {
      const data = action.payload;
      state.destinations = data; 
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchAllDestinations.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default destinationSlice.reducer;
