import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type State = {
  loading: boolean;
  error: string | null;
  order: TOrder | null;
};

const initialState: State = {
  loading: false,
  error: null,
  order: null
};

export const makeOrder = createAsyncThunk(
  'makeOrder/makeOrder',
  orderBurgerApi
);

export const makeOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeOrder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to make order';
      });
  }
});
