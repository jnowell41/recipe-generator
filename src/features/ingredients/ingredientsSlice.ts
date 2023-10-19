import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collectIngredients, TotalIngredientResponse, IngredientItem } from './fetchIngredients';

export interface MealsInterface {
    meals:IngredientItem[]
}

export interface stateInterface { 
    loading:boolean,
    data:MealsInterface,
    err:string
};

const initialState:stateInterface = {
    loading:false,
    data:{
        meals:[]
    },
    err:""
};

export const fetchIngredientsAsync = createAsyncThunk(
    'ingredients/collectIngredients',
    async ():Promise<TotalIngredientResponse> => {
        const response = await collectIngredients();
        return response;
    }
)

const ingredientsSlice = createSlice({
    name:"ingredients",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchIngredientsAsync.pending, (state:stateInterface) => {
            state.loading = true;
        })
        .addCase(fetchIngredientsAsync.fulfilled, (state:stateInterface, action:PayloadAction<TotalIngredientResponse>) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(fetchIngredientsAsync.rejected, (state:stateInterface) => {
            state.loading = false;
            state.err = "Unable to fetch ingredients..."
        })
    }
});

export default ingredientsSlice.reducer