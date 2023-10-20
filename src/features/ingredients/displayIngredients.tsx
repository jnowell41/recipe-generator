import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchIngredientsAsync } from './ingredientsSlice';
import { IngredientItem } from './fetchIngredients';
import styles from './displayIngredients.module.css';
import SubmitIngredients from '../../components/submitIngredients';

interface DisplayIngredientsProps {
    input:string
}

const CloseComponent:React.FC = () => {
    return (
      <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 100 100">
        <path
          d="m89.95 19.24-9.19-9.19L50 40.81 19.24 10.05l-9.19 9.19L40.81 50 10.05 80.76l9.19 9.19L50 59.19l30.76 30.76 9.19-9.19L59.19 50l30.76-30.76z"
          style={{
            fill: 'none',
            stroke: '#000',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '4px',
          }}
        />
      </svg>
    );
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
        // need to dispatch something to clear inputField

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
            <div className={styles.container}>
                <div className={ingredientsListStyle}>
                    {ingredientList.map((el:IngredientItem, key:number) => (
                        <div key={key} onClick={() => tamperList(true, el.strIngredient)}>
                            {el.strIngredient}
                        </div>
                    ))}
                </div>
                <div className={selectedIngredientsStyle}>
                    <h2>Selected Ingredients</h2>
                    {ingredientSelection.map((ing, key) => (
                        <div className={styles.selectedItem} key={key}>
                            <span>{ing}</span>
                            <div onClick={() => tamperList(false, ing)}>
                                <CloseComponent/>
                            </div>
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