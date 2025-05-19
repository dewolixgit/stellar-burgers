import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type State = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  orders: [],
  loading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'userOrders/fetchOrders',
  async () => getOrdersApi()
);

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.orders = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.orders = [];
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user orders';
      });
  }
});

export const userOrdersReducer = userOrdersSlice.reducer;
