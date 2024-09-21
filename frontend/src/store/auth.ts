import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    toggleIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const { toggleIsSignedIn } = authSlice.actions;

export default authSlice.reducer;
