import DisplayIngredients from "../../features/ingredients/displayIngredients";
import { useState } from 'react';
import styles from './ingredientsSelection.module.css';

const IngredientsSelectionContainer = () => {
    // const inputValue = useRef('');
    const [ inputValue, setInputValue ] = useState<string>('');

    function logInput(e:React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    return (
        <div className={styles.container}>
            <input className={styles.input} placeholder="Search ingredient" onChange={(e) => logInput(e)}/>
            <DisplayIngredients input={inputValue}/>
        </div>
    )

};
export default IngredientsSelectionContainer;