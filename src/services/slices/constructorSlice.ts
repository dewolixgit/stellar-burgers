import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

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
    reorderIngredients(state, action: PayloadAction<TConstructorIngredient[]>) {
      state.ingredients = action.payload;
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
