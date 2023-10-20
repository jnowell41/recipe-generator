import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchMealsAsync } from './mealSlice';
import { fetchRecipesAsync } from '../recipes/recipeSlice';
import { MealItem } from './fetchMeals';
import { useLocation, Link } from 'react-router-dom';

const DisplayMeals = () => {
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.meals.data.meals);
    const [ gotData, setGotData ] = useState<boolean>(false);

    useEffect(() => {
        if (meals.length > 0 && !gotData) {
            console.log(meals);
            meals.forEach(el => dispatch(fetchRecipesAsync(el.idMeal)));
            setGotData(true);
        }
      }, [meals, gotData]);

    if(meals.length > 0) {
        return (
                <div>
                    {meals.map((el, key) => (
                        <Link to={`/recipe/${el.idMeal}}`}>
                            <div key={key}>
                                <img src={el.strMealThumb + '/preview'}/>
                                <h3>{el.strMeal}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
        )
    }
    return (
        <div>Loading...</div>
    );
};

export default DisplayMeals;