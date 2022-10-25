import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  currencyIndex: 0,
  sizeIndex: 0,
  colorIndex: 0,
  capacityIndex: 0,
  usbIndex: 0,
  touchIndex: 0,
  linkIndex: 0,
};

if (localStorage.getItem('currency')) {
  initialState.currencyIndex = JSON.parse(localStorage.getItem('currency'));
} else {
  initialState.currencyIndex = 0;
}
if (sessionStorage.getItem('linkIndex')) {
  initialState.linkIndex = JSON.parse(sessionStorage.getItem('linkIndex'));
} else {
  initialState.linkIndex = 0;
}

export const CurrencyChange = createAsyncThunk(
  'product/changeCurrency',
  (id, thunkAPI) => {
    thunkAPI.dispatch(changeCurrency(id));

    localStorage.setItem(
      'currency',
      JSON.stringify(thunkAPI.getState().switcher.currencyIndex)
    );
  }
);
export const ChangeLinkIndex = createAsyncThunk(
  'product/changeIndex',
  (i, thunkAPI) => {
    thunkAPI.dispatch(changeLinkIndex(i));

    sessionStorage.setItem(
      'linkIndex',
      JSON.stringify(thunkAPI.getState().switcher.linkIndex)
    );
  }
);

export const switcherSlice = createSlice({
  name: 'switcher',
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currencyIndex = action.payload;
    },
    changeColor: (state, action) => {
      state.colorIndex = action.payload;
    },
    changeSize: (state, action) => {
      state.sizeIndex = action.payload;
    },
    changeCapacity: (state, action) => {
      state.capacityIndex = action.payload;
    },
    changeUsb: (state, action) => {
      state.usbIndex = action.payload;
    },
    changeTouch: (state, action) => {
      state.touchIndex = action.payload;
    },
    changeLinkIndex: (state, action) => {
      state.linkIndex = action.payload;
    },
  },
});

export const {
  changeColor,
  changeCurrency,
  changeTouch,
  changeUsb,
  changeCapacity,
  changeSize,
  changeLinkIndex,
} = switcherSlice.actions;

export default switcherSlice.reducer;
