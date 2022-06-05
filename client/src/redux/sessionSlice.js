import { createSlice } from '@reduxjs/toolkit';

/**
 * Check for session cookie.
 */
const checkLogged = () => {
  return false;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: {},
  },
  reducers: {
    updateSession: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { updateSession } = sessionSlice.actions;

export default sessionSlice.reducer;
