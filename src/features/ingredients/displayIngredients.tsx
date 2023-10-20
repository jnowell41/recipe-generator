import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchIngredientsAsync } from './ingredientsSlice';
import { IngredientItem } from './fetchIngredients';
import styles from './displayIngredients.module.css';
import SubmitIngredients from '../../components/submitIngredients';

interface DisplayIngredientsProps {
    input:string
}

const DisplayIngredients:React.FC<DisplayIngredientsProps> = ({ input }) => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(state => state.ingredients.data.meals);
    const [ gotData, setGotData ] = useState<boolean>(false);
    const [ ingredientSelection, setIngredientSelection ] = useState<string[]>([]);
    const [ ingredientList, setIngredientList ] = useState<IngredientItem[]>([]);

    useEffect(() => {
        if(!gotData) {
            dispatch(fetchIngredientsAsync());
            setGotData(true);
        };
    }, [gotData]);

    useEffect(() => {
        const newIngredientsList = ingredients.filter(x => x.strIngredient.toLowerCase().indexOf(input.toLowerCase()) !== -1);
        setIngredientList(newIngredientsList.splice(0, 6));
        if(input.length === 0) {
            setIngredientList([]);
        }
    }, [input]);

    function tamperList(add: boolean, strIngredient: string) {
        if (add) {
            if (ingredientSelection.length < 6) {
                setIngredientSelection([...ingredientSelection, strIngredient]);
            } 
            else {
                console.log('Too many ingredients, error notice here');
            }
        } 
        else {
            const filteredIngredients = ingredientSelection.filter((ingredient) => ingredient !== strIngredient);
            setIngredientSelection(filteredIngredients);
        }
    }

    const selectedIngredientsStyle = ingredientSelection.length > 0 ? styles.selectedContainer : styles.hide;
    const ingredientsListStyle = ingredientList.length > 0 ? styles.selectedContainer : styles.hide;

    if(ingredients.length > 0) {
        return (
            <div>
                <div className={ingredientsListStyle}>
                    <h2>Ingredients List</h2>
                    {ingredientList.map((el:IngredientItem, key:number) => (
                        <div key={key} onClick={() => tamperList(true, el.strIngredient)}>
                            {el.strIngredient}
                        </div>
                    ))}
                </div>
                <div className={selectedIngredientsStyle}>
                    <h2>Selected Ingredients</h2>
                    {ingredientSelection.map((ing, key) => (
                        <div key={key}>
                            <span>{ing}</span>
                            <div onClick={() => tamperList(false, ing)}>close</div>
                        </div>
                    ))}
                    <SubmitIngredients ingredients={ingredientSelection}/>
                </div>
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