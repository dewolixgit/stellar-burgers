import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IngredientWithUniqueId = TIngredient & { uniqueId: string };

type State = {
  bun: IngredientWithUniqueId | null;
  ingredients: IngredientWithUniqueId[];
};

const initialState: State = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<IngredientWithUniqueId>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, uniqueId: nanoid() } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    reorderIngredients(state, action: PayloadAction<IngredientWithUniqueId[]>) {
      state.ingredients = action.payload;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
