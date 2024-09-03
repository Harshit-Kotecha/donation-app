import donationReducer from '@redux/donationSlice';
import themeReducer from '@redux/themeSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    donation: donationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
