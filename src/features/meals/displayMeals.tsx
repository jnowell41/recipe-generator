import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchRecipesAsync } from '../recipes/recipeSlice';
import { Link } from 'react-router-dom';
import styles from './displayMeals.module.css';
// add filters based on type, 

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

const DisplayMeals = () => {
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.meals.data.meals);
    const [ gotData, setGotData ] = useState<boolean>(false);
    const [ displayModal, setDisplayModal ] = useState<boolean>(false);
    const [ modalSrc, setModalSrc ] = useState<string>("");

    useEffect(() => {
        if (meals.length > 0 && !gotData) {
            meals.forEach(el => dispatch(fetchRecipesAsync(el.idMeal)));
            setGotData(true);
        }
    }, [meals, gotData]);

    function openModal(toOpen:boolean, src:string) {
        setModalSrc(src);
        setDisplayModal(toOpen);
    }
    const modalSty = displayModal ? styles.modal : styles.hide;

    if(meals.length > 0) {
        return (
                <div className={styles.mealsContainer}>
                    {meals.map((el, key) => (
                        <div key={key} className={styles.wrapper}>
                            <div className={styles.container}>
                                <img onClick={() => openModal(true, el.strMealThumb)} src={el.strMealThumb + '/preview'}/>
                                <Link key={key} to={`/recipe/${el.idMeal}`}>
                                    <h3>{el.strMeal}</h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                    <div className={modalSty}>
                        <img src={modalSrc}/>
                        <div onClick={() => openModal(false, "")}>
                            <CloseComponent />
                        </div>
                    </div>
                </div>
        )
    }
    return (
        <div>Loading...</div>
    );
};

export default DisplayMeals;