import { configureStore } from '@reduxjs/toolkit';

import titleReducer from './titleSlice';
import sessionReducer from './sessionSlice';

export default configureStore({
  reducer: {
    title: titleReducer,
    session: sessionReducer,
  },
});
