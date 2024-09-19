'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import chatReducer from './chat/slice';
import { authApi } from './auth/api';
import { checkoutApi } from './checkout/api';
import { userApi } from './user/api';
import { matchApi } from './matchmaking/api';
import { chatApi } from './chat/api';

const reducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
  [matchApi.reducerPath]: matchApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        checkoutApi.middleware,
        userApi.middleware,
        matchApi.middleware,
        chatApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
