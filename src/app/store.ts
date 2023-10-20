import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import mealsReducer from '../features/meals/mealSlice';
import recipesReducer from '../features/recipes/recipeSlice';

export const store = configureStore({
  reducer: {
    ingredients:ingredientsReducer,
    meals:mealsReducer,
    recipes:recipesReducer
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
