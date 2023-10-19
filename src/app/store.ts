import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';

export const store = configureStore({
  reducer: {
    ingredients:ingredientsReducer
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
