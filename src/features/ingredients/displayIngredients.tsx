import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchIngredientsAsync } from './ingredientsSlice';
import { IngredientItem } from './fetchIngredients';

const DisplayIngredients = () => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(state => state.ingredients.data.meals);
    const [ gotData, setGotData ] = useState<boolean>(false);

    useEffect(() => {
        if(!gotData) {
            dispatch(fetchIngredientsAsync());
            setGotData(true);
        };
    }, [gotData]);

    if(ingredients.length > 0) {
        return (
            <div>
                {ingredients.map((el:IngredientItem, key:number) => (
                    <div key={key}>
                        {el.strIngredient}
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div>Loading...</div>
        );
    }
};

export default DisplayIngredients;