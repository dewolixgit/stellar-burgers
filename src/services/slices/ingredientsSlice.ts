import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface State {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.buns = [];
        state.mains = [];
        state.sauces = [];
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
        state.buns = [];
        state.mains = [];
        state.sauces = [];
      });
  },
  selectors: {
    getBuns: (state) => state.buns,
    getMains: (state) => state.mains,
    getSauces: (state) => state.sauces,
    getIsIngredientsLoading: (state) =>
      state.loading &&
      state.buns.length === 0 &&
      state.mains.length === 0 &&
      state.sauces.length === 0
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const selectIngredientById =
  (id: string) => (state: { ingredients: State }) =>
    [
      ...state.ingredients.buns,
      ...state.ingredients.mains,
      ...state.ingredients.sauces
    ].find((item) => item._id === id);

export const { getBuns, getMains, getSauces, getIsIngredientsLoading } =
  ingredientsSlice.selectors;
