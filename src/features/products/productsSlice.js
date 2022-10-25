import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCategories,
  getAllCurrencies,
  getALLproducts,
  getproductClothes,
  getproductTech,
} from './productsAPI';

const initialState = {
  AllProductsCategory: [],
  loading: false,
  error: null,
  ClothesCategory: [],
  TechCategory: [],
  Currencies: [],
  Categories: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getALLproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getALLproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.AllProductsCategory = action.payload;
      })
      .addCase(getALLproducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    //for clothes category
    builder
      .addCase(getproductClothes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproductClothes.fulfilled, (state, action) => {
        state.loading = false;
        state.ClothesCategory = action.payload;
      })
      .addCase(getproductClothes.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    // tech category
    builder
      .addCase(getproductTech.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproductTech.fulfilled, (state, action) => {
        state.loading = false;
        state.TechCategory = action.payload;
      })
      .addCase(getproductTech.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    //currencies
    builder
      .addCase(getAllCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.Currencies = action.payload;
      })
      .addCase(getAllCurrencies.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });

    //categories
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.Categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
