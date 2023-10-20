import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchRecipesAsync } from '../recipes/recipeSlice';
import { Link } from 'react-router-dom';
import styles from './displayMeals.module.css';
// add filters based on type, 

const DisplayMeals = () => {
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.meals.data.meals);
    const [ gotData, setGotData ] = useState<boolean>(false);

    useEffect(() => {
        if (meals.length > 0 && !gotData) {
            meals.forEach(el => dispatch(fetchRecipesAsync(el.idMeal)));
            setGotData(true);
        }
      }, [meals, gotData]);

    if(meals.length > 0) {
        return (
                <div className={styles.mealsContainer}>
                    {meals.map((el, key) => (
                        <div className={styles.wrapper}>
                            <Link key={key} to={`/recipe/${el.idMeal}`}>
                                <div className={styles.container}>
                                    <img src={el.strMealThumb + '/preview'}/>
                                    <h3>{el.strMeal}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
        )
    }
    return (
        <div>Loading...</div>
    );
};

export default DisplayMeals;