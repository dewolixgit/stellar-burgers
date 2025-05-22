import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type State = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  order: null,
  loading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderById/fetchOrderById',
  getOrderByNumberApi
);

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.order = initialState.order;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.order = initialState.order;
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order by id';
      });
  },
  selectors: {
    getFetchedOrderByNumber: (state) => state.order
  }
});

export const { getFetchedOrderByNumber } = orderByNumberSlice.selectors;

export const orderByNumberReducer = orderByNumberSlice.reducer;
