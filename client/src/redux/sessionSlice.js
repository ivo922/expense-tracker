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
    activeAccount: '',
  },
  reducers: {
    updateSession: (state, action) => {
      state.user = action.payload;
      state.activeAccount = action.payload.accounts[0];
    },
    setActiveAccount: (state, action) => {
      state.activeAccount = action.payload;
    },
    removeUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { updateSession, setActiveAccount, removeUser } = sessionSlice.actions;

export default sessionSlice.reducer;
