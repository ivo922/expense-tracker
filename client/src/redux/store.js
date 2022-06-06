import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './sessionSlice';
import sidebarReducer from './sidebarSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    sidebar: sidebarReducer,
  },
});
