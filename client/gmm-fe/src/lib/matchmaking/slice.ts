'use client';

import { createSlice } from '@reduxjs/toolkit';

export type PreferenceState = {
  queryString: string;
  fuzzyMatchThreshold: number;
};

export const preferenceInitialState: PreferenceState = {
  queryString: '',
  fuzzyMatchThreshold: 0,
};

const authSlice = createSlice({
  name: 'Preference',
  initialState: preferenceInitialState,
  reducers: {
    setQueryString(state, action) {
      state.queryString = action.payload;
    },

    setFuzzyMatchThreshold(state, action: { payload: number }) {
      state.fuzzyMatchThreshold = action.payload;
    },
  },
});

export const { setQueryString, setFuzzyMatchThreshold } = authSlice.actions;

export default authSlice.reducer;
