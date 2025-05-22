import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  items: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  items: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.items = initialState.items;
        state.total = initialState.total;
        state.totalToday = initialState.totalToday;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.items = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.items = initialState.items;
        state.total = initialState.total;
        state.totalToday = initialState.totalToday;
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  },
  selectors: {
    getFeedsItems: (state) => state.items,
    getFeedsTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday
  }
});

export const { getFeedsItems, getFeedsTotal, getFeedsTotalToday } =
  feedsSlice.selectors;

export const feedsReducer = feedsSlice.reducer;
