import {
  ingredientsReducer,
  constructorReducer,
  feedsReducer,
  userReducer,
  userOrdersReducer,
  makeOrderReducer
} from '@slices';
import { combineReducers } from '@reduxjs/toolkit';
import { orderByNumberReducer } from './slices/orderByNumberSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  user: userReducer,
  userOrders: userOrdersReducer,
  makeOrder: makeOrderReducer,
  orderByNumber: orderByNumberReducer
});
