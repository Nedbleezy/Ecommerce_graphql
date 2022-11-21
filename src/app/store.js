import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import DetailsReducer from '../features/productDetails/productDetails';

import productsReducer from '../features/products/productsSlice';
import switchReducer from '../features/switcher/switcherSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    switcher: switchReducer,
    productDetails: DetailsReducer,
  },
});
