'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import { authApi } from './auth/api';
import { checkoutApi } from './checkout/api';
import { userApi } from './user/api';

const reducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        checkoutApi.middleware,
        userApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
