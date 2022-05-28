import { createSlice } from '@reduxjs/toolkit';

export const titleSlice = createSlice({
  name: 'title',
  initialState: {
    text: 'Expense Tracker',
  },
  reducers: {
    change: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { change } = titleSlice.actions;

export default titleSlice.reducer;
