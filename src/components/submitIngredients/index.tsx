import styles from './submitIngredients.module.css';
import { Link } from 'react-router-dom';
import { returnInitialState } from '../../features/meals/mealSlice';
import { useAppDispatch } from '../../app/hooks';

interface SubmitIngredientsProps {
    ingredients:string[]
};

const SubmitIngredients:React.FC<SubmitIngredientsProps> = ({ingredients}) => {

    const formattedIngredients = ingredients.map(i => {
        const formattedItem = i.toLowerCase().replace(/ /g, '_');
        return formattedItem;
    });

    const dispatch = useAppDispatch();
    function clearMeals() {
        dispatch(returnInitialState());
    }

    return (
        <Link onClick={() => clearMeals()} className={styles.container} to={`/meals?ingredients=${formattedIngredients.join('-')}`}>
            <div>Search Meals</div>
        </Link>
    )
}
export default SubmitIngredients;