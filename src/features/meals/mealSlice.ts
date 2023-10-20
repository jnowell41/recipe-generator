import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collectMeals, TotalMealsResponse, MealItem } from './fetchMeals';

export interface MainMealsInterface {
    meals:MealItem[]
}

export interface stateMealsInterface { 
    loading:boolean,
    data:MainMealsInterface,
    err:string
};

const initialState:stateMealsInterface = {
    loading:false,
    data:{
        meals:[]
    },
    err:""
};

export const fetchMealsAsync = createAsyncThunk(
    'meals/collectMeals',
    async (ingredient:string):Promise<TotalMealsResponse> => {
        const response = await collectMeals(ingredient);
        return response;
    }
)

function prependToState(state:stateMealsInterface, payload:MainMealsInterface) {
    let currentState = state.data;
    payload.meals.forEach(el => {
        if(currentState.meals.filter(x => x.idMeal === el.idMeal).length === 0) {
            currentState.meals.push(el);
        }
    });
    return currentState;
}

const mealsSlice = createSlice({
    name:"ingredients",
    initialState,
    reducers:{
        returnInitialState: (state:stateMealsInterface) => {
            return initialState
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchMealsAsync.pending, (state:stateMealsInterface) => {
            state.loading = true;
        })
        .addCase(fetchMealsAsync.fulfilled, (state:stateMealsInterface, action:PayloadAction<TotalMealsResponse>) => {
            state.loading = false
            state.data = prependToState(state, action.payload)
        })
        .addCase(fetchMealsAsync.rejected, (state:stateMealsInterface) => {
            state.loading = false;
            state.err = "Unable to fetch meals..."
        })
    }
});

export const { returnInitialState } = mealsSlice.actions;
export default mealsSlice.reducer;