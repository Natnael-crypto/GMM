'use client';

import { createSlice } from '@reduxjs/toolkit';

export type PreferenceState = {
  queryString: string;
  tolerance: number;
};

export const preferenceInitialState: PreferenceState = {
  queryString: '',
  tolerance: 0,
};

const authSlice = createSlice({
  name: 'Preference',
  initialState: preferenceInitialState,
  reducers: {
    setQueryString(state, action) {
      state.queryString = action.payload;
    },

    setMatchTolerance(state, action: { payload: number }) {
      state.tolerance = action.payload;
    },
  },
});

export const { setQueryString, setMatchTolerance } = authSlice.actions;

export default authSlice.reducer;
