import {
  ingredientsReducer,
  constructorReducer,
  feedsReducer,
  userReducer,
  userOrdersReducer
} from './slices';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  feeds: feedsReducer,
  user: userReducer,
  userOrders: userOrdersReducer
});
