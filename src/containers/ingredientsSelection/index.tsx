import DisplayIngredients from "../../features/ingredients/displayIngredients";
import { useState } from 'react';
import styles from './ingredientsSelection.module.css';
import ClickAwayListener from 'react-click-away-listener';

const IngredientsSelectionContainer = () => {
    // const inputValue = useRef('');
    const [ inputValue, setInputValue ] = useState<string>('');

    function logInput(e:React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }
    function clearInput() {
        setInputValue('');
    }

    return (
        <div className={styles.container}>
            <ClickAwayListener onClickAway={clearInput}>
                <input value={inputValue} className={styles.input} placeholder="Search ingredient" onChange={(e) => logInput(e)}/>
            </ClickAwayListener>
            <DisplayIngredients input={inputValue}/>
        </div>
    )

};
export default IngredientsSelectionContainer;