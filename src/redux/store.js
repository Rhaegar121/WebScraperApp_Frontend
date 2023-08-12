import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './listSlice';

const store = configureStore({
  reducer: {
    list: listsReducer,
  },
});

export default store;