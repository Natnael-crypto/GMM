'use client';

import { createSlice } from '@reduxjs/toolkit';

import { Auth, AuthState } from './types';

export const authInitialState: AuthState = {};

const authSlice = createSlice({
  name: Auth,
  initialState: authInitialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
