import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_PRODUCTDETAILS_BY_ID } from '../../Queries/queries';

const initialState = {
  productDetails: [],
  loading: false,
  error: null,
};

const URL = 'https://graphqlbackend-production.up.railway.app/';
const localhost = 'http://localhost:4000/';
export const getproductDetails = createAsyncThunk('product/fetchdetails', (id) => {
  return axios
    .post(URL || localhost, {
      query: GET_PRODUCTDETAILS_BY_ID,
      variables: {
        id: id,
      },
    })
    .then((res) => {
      return res.data.data.product;
    });
});

export const detailsSlice = createSlice({
  name: 'productdetails',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getproductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getproductDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default detailsSlice.reducer;
