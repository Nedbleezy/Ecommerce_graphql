import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  id: null,
};

export const QuickSHOP = createAsyncThunk(
  'product/quickshop',
  (id, thunkAPI) => {
    thunkAPI.dispatch(changeID(id));
  }
);

export const quickShopSlice = createSlice({
  name: 'quickshop',
  initialState,
  reducers: {
    changeID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeID } = quickShopSlice.actions;

export default quickShopSlice.reducer;
