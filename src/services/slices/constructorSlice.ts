import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { swap } from '../../utils/array/swap';

type State = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: State = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    reorderIngredients(
      state,
      action: PayloadAction<{ direction: 'up' | 'down'; index: number }>
    ) {
      if (action.payload.direction === 'up' && action.payload.index > 0) {
        swap(state.ingredients, action.payload.index, action.payload.index - 1);
      }

      if (
        action.payload.direction === 'down' &&
        action.payload.index < state.ingredients.length - 1
      ) {
        swap(state.ingredients, action.payload.index, action.payload.index + 1);
      }
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBun(state) {
      return state.bun;
    },
    getIngredients(state) {
      return state.ingredients;
    },
    getBunPrice(state) {
      return state.bun?.price ?? 0;
    },
    getTotalPrice(state) {
      return (
        (state.bun?.price ?? 0) * 2 +
        state.ingredients.reduce((acc, item) => acc + item.price, 0)
      );
    }
  }
});

export const { getBun, getIngredients } = constructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
