import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  ALL_CURRENCIES,
  ALL_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_BY_CATEGORY,
} from '../../Queries/queries';

const URL = 'https://graphqlbackend-production.up.railway.app/';
const localhost = 'http://localhost:4000/';

export const getALLproducts = createAsyncThunk('product/fetchAllproducts', () => {
  return axios
    .post(URL || localhost, {
      query: FETCH_PRODUCT_BY_CATEGORY,
      variables: {
        input: {
          title: '',
        },
      },
    })
    .then((res) => {
      return res.data.data.category.products;
    });
});

export const getproductClothes = createAsyncThunk('product/fetchproductClothes', (clothes) => {
  return axios
    .post(URL || localhost, {
      query: FETCH_PRODUCT_BY_CATEGORY,
      variables: {
        input: {
          title: clothes,
        },
      },
    })
    .then((res) => {
      return res.data.data.category.products;
    });
});

export const getproductTech = createAsyncThunk('product/fetchproductTech', (tech) => {
  return axios
    .post(URL || localhost, {
      query: FETCH_PRODUCT_BY_CATEGORY,
      variables: {
        input: {
          title: tech,
        },
      },
    })
    .then((res) => {
      return res.data.data.category.products;
    });
});
export const getAllCurrencies = createAsyncThunk('product/fetchcurrencies', () => {
  return axios
    .post(URL || localhost, {
      query: ALL_CURRENCIES,
    })
    .then((res) => {
      return res.data.data.currencies;
    });
});
//http://localhost:4000/graphgl
export const getAllCategories = createAsyncThunk('product/fetchallCategories', () => {
  return axios
    .post(URL || localhost, {
      query: ALL_PRODUCT_CATEGORIES,
    })
    .then((res) => {
      return res.data.data.categories;
    });
});
