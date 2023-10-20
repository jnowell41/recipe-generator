import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayMeals from '../../features/meals/displayMeals';
import { fetchMealsAsync } from '../../features/meals/mealSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const MealsPreview = () => {
    // need to set parameters as lowercase with underscores for gaps
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const ingredients = queryParams.get('ingredients');
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.meals.data.meals);

    useEffect(() => {
        if(ingredients !== null) {
            let newArray:string[] = [];
            if(ingredients.length === 1) {
                newArray = [ingredients[0]];
            }
            else {
                newArray = ingredients.split('-');
            }
            newArray.forEach(el => dispatch(fetchMealsAsync(el)));
        };
    }, []);

    if(meals.length > 0) {
        return (
            <div>
                <DisplayMeals />
            </div>
        )
    }
    else {
        return null;
    }
    

}
export default MealsPreview;