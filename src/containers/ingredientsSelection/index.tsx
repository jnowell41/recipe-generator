import DisplayIngredients from "../../features/ingredients/displayIngredients";
import { useState } from 'react';
import styles from './ingredientsSelection.module.css';
import ClickAwayListener from 'react-click-away-listener';
import { motion } from 'framer-motion';

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
            <motion.h1
            initial={{ scale: 0.9, opacity:0 }}
            animate={{ scale:1, opacity:1 }}>Select your ingredients</motion.h1>
            {/* <div className={styles.intro}>Search available ingredients using the input field below and append your choices to the selected ingredients list</div> */}
            <ClickAwayListener onClickAway={clearInput}>
                <motion.input 
                initial={{ scale: 0.9, opacity:0, y:-10 }}
                animate={{ scale:1, opacity:1, y:0 }}
                value={inputValue} 
                className={styles.input} 
                placeholder="Search ingredient" 
                onChange={(e) => logInput(e)}/>
            </ClickAwayListener>
            <DisplayIngredients input={inputValue}/>
        </div>
    )

};
export default IngredientsSelectionContainer;