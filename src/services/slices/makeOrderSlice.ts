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

const makeOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    resetMadeOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload.order;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to make order';
        state.order = null;
      });
  },
  selectors: {
    getMakeOrderLoading: (state) => state.loading,
    getMakeOrderError: (state) => state.error,
    getMadeOrder: (state) => state.order
  }
});

export const { resetMadeOrder } = makeOrderSlice.actions;

export const { getMakeOrderLoading, getMakeOrderError, getMadeOrder } =
  makeOrderSlice.selectors;

export const { reducer: makeOrderReducer } = makeOrderSlice;
