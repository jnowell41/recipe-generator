import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayMeals from '../../features/meals/displayMeals';
import { fetchMealsAsync } from '../../features/meals/mealSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { motion } from 'framer-motion';
import { GetIngredientsParam } from '../../assets/globalFunctions';

const MealsPreview = () => {
    // need to set parameters as lowercase with underscores for gaps
    const ingredients = GetIngredientsParam();
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.meals.data.meals);

    // TODO:
    // - if no recipes available then make an alert and redirect back to home page

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
                <motion.h1
                initial={{ scale: 0.9, opacity:0 }}
                animate={{ scale:1, opacity:1 }}>Meals</motion.h1>
                <DisplayMeals />
            </div>
        )
    }
    else {
        return null;
    }
    

}
export default MealsPreview;