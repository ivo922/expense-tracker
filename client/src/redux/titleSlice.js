import { createSlice } from '@reduxjs/toolkit';

export const titleSlice = createSlice({
  name: 'title',
  initialState: {
    text: 'Expense Tracker',
  },
  reducers: {
    changeTitle: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { changeTitle } = titleSlice.actions;

export default titleSlice.reducer;
