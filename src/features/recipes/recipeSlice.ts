import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collectRecipes, TotalRecipesResponse, RecipeItem } from './fetchRecipes';

export interface MainRecipesInterface {
    meals:RecipeItem[]
}

export interface stateRecipesInterface { 
    loading:boolean,
    data:MainRecipesInterface,
    err:string
};

const initialState:stateRecipesInterface = {
    loading:false,
    data:{
        meals:[]
    },
    err:""
};

export const fetchRecipesAsync = createAsyncThunk(
    'meals/collectRecipes',
    async (id:string):Promise<TotalRecipesResponse> => {
        const response = await collectRecipes(id);
        return response;
    }
)

function prependToState(state:stateRecipesInterface, payload:MainRecipesInterface) {
    let currentState = state.data;
    if(payload.meals !== null) {
        payload.meals.forEach(el => {
            if(currentState.meals.filter(x => x.idMeal === el.idMeal).length === 0) {
                currentState.meals.push(el);
            }
        });
    }
    
    return currentState;
}

const recipesSlice = createSlice({
    name:"ingredients",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchRecipesAsync.pending, (state:stateRecipesInterface) => {
            state.loading = true;
        })
        .addCase(fetchRecipesAsync.fulfilled, (state:stateRecipesInterface, action:PayloadAction<TotalRecipesResponse>) => {
            state.loading = false
            state.data = prependToState(state, action.payload)
        })
        .addCase(fetchRecipesAsync.rejected, (state:stateRecipesInterface) => {
            state.loading = false;
            state.err = "Unable to fetch recipes..."
        })
    }
});

export default recipesSlice.reducer