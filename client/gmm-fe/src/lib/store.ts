'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import { userApi } from './auth/api';

const reducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
