import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  CartItems: [],
  loading: false,
  error: null,
};

if (localStorage.getItem('cartItems')) {
  initialState.CartItems = JSON.parse(localStorage.getItem('cartItems'));
} else {
  initialState.CartItems = [];
}

export const AddToCART = createAsyncThunk(
  'product/AddtoCart',
  (id, thunkAPI) => {
    thunkAPI.dispatch(addToCart(id));

    localStorage.setItem(
      'cartItems',
      JSON.stringify(thunkAPI.getState().cart.CartItems)
    );
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQty: (state, action) => {
      const updatedItems = state.CartItems.map((item, index) => {
        if (index === action.payload.index) {
          return { ...item, qty: item.qty + 1 };
        }
        return { ...item };
      });
      state.CartItems = updatedItems;
      localStorage.setItem('cartItems', JSON.stringify(state.CartItems));
    },
    decrementQty: (state, action) => {
      if (state.CartItems[action.payload.index].qty === 1) {
        const nextCartItems = state.CartItems.filter(
          (item, index) => index !== action.payload.index
        );
        state.CartItems = nextCartItems;
        localStorage.setItem('cartItems', JSON.stringify(state.CartItems));
      } else {
        const updatedItems = state.CartItems.map((item, index) => {
          if (item.id === action.payload.id && index === action.payload.index) {
            return { ...item, qty: item.qty - 1 };
          }
          return { ...item };
        });
        state.CartItems = updatedItems;
        localStorage.setItem('cartItems', JSON.stringify(state.CartItems));
      }
    },
    addToCart: (state, action) => {
      const Newitem = action.payload;
      const existItem = state.CartItems.find((x) => x.id === Newitem.id);
      if (existItem && existItem.selectedAttr.length === 0) {
        existItem.qty++;
      } else if (
        existItem &&
        existItem.selectedAttr.length !== 0 &&
        JSON.stringify(existItem.selectedAttr) !==
          JSON.stringify(Newitem.selectedAttr)
      ) {
        console.log('here is already');
        state.CartItems.push({ ...Newitem, qty: 1 });
      } else if (
        existItem &&
        existItem.selectedAttr.length !== 0 &&
        JSON.stringify(existItem.selectedAttr) ===
          JSON.stringify(Newitem.selectedAttr)
      ) {
        existItem.qty++;
      } else {
        state.CartItems.push({ ...Newitem, qty: 1 });
      }
    },
  },
});

export const { addToCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
