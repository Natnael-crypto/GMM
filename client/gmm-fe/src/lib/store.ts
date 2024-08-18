'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';

const reducer = combineReducers({
  auth: authReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
