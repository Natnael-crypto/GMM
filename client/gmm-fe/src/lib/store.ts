'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import { userApi } from './auth/api';
import { checkoutApi } from './checkout/api';

const reducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware, checkoutApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
