'use client';

import { createSlice } from '@reduxjs/toolkit';

export type UserFilterState = {
  queryString: string;
};

export const userFilterInitialState: UserFilterState = {
  queryString: '',
};

const userFilterSlice = createSlice({
  name: 'UserFilterState',
  initialState: userFilterInitialState,
  reducers: {
    setQueryString(state, action) {
      state.queryString = action.payload;
    },
  },
});

export const { setQueryString } = userFilterSlice.actions;

export default userFilterSlice.reducer;
