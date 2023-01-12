import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardReducer from '../features/cart/CardSlice';

export const store = configureStore({
  reducer: {
    counter: cardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
