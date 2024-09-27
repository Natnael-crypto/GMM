'use client';

import { createSlice } from '@reduxjs/toolkit';

export type PreferenceState = {
  queryString: string;
};

export const preferenceInitialState: PreferenceState = {
  queryString: '',
};

const authSlice = createSlice({
  name: 'Preference',
  initialState: preferenceInitialState,
  reducers: {
    setQueryString(state, action) {
      state.queryString = action.payload;
    },
  },
});

export const { setQueryString } = authSlice.actions;

export default authSlice.reducer;
