import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchRecipesAsync } from '../../features/recipes/recipeSlice';

const RecipeInspection = () => {

    const { id } = useParams();
    const recipe = useAppSelector(state => state.recipes.data.meals.filter(x => x.idMeal === id));
    const dispatch = useAppDispatch();
    const [ gotRecipe, setGotRecipe ] = useState<boolean>(false);

    useEffect(() => {
        if(recipe.length === 0 && id && !gotRecipe) {
            dispatch(fetchRecipesAsync(id));
            setGotRecipe(true);
        }
        console.log(recipe);
    },[recipe, id, gotRecipe])

    if(recipe) {
        return (
            <div>{JSON.stringify(recipe)}</div>
        )
    }
    else {
        return null
    }
    
    
    

}
export default RecipeInspection;