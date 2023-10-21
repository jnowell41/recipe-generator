import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchRecipesAsync } from '../../features/recipes/recipeSlice';
import styles from './recipeInspection.module.css';
import { RecipeItem } from '../../features/recipes/fetchRecipes';
import { motion } from 'framer-motion';

interface CloseComponentProps {
    rotate:boolean
}

const CloseComponent:React.FC<CloseComponentProps> = ({rotate}) => {
    const svgClass = rotate ? styles.upsideDown : styles.svg;
    return (
      <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24">
        <path d="M6 9l6 6 6-6" />
      </svg>
    );
};

const RecipeInspection = () => {

    const { id } = useParams();
    const recipe = useAppSelector(state => state.recipes.data.meals.filter(x => x.idMeal === id))[0];
    const dispatch = useAppDispatch();
    const [ gotRecipe, setGotRecipe ] = useState<boolean>(false);
    const [ ingredientsWithMeasurements, setIngredientsWithMeasurements ] = useState<IngredientMeasurePair[]>([]);
    const [ ingredientsDisplay, setIngredientsDisplay ] = useState<boolean>(false);
    const [ descriptionDisplay, setDescriptionDisplay ] = useState<boolean>(false);
    const [ resourcesDisplay, setResourcesDisplay ] = useState<boolean>(false);


    type IngredientMeasurePair = [string, string];

    useEffect(() => {
        if(!recipe && id && !gotRecipe) {
            dispatch(fetchRecipesAsync(id));
            setGotRecipe(true);
        }
        if(recipe) {
            console.log(recipe);
            let ingredientsAndMeasures:IngredientMeasurePair[] = [];
            for (let i = 1; i <= 20; i++) {
                const ingredientKey = `strIngredient${i}` as keyof RecipeItem;
                const measureKey = `strMeasure${i}` as keyof RecipeItem;
                const ingredientValue = recipe[ingredientKey] as string;
                const measureValue = recipe[measureKey] as string;
                if (ingredientValue !== null && measureValue !== null && ingredientValue !== "" && measureValue !== "") {
                    ingredientsAndMeasures.push([ingredientValue, measureValue]);
                }
            }
            setIngredientsWithMeasurements(ingredientsAndMeasures);
        }

    },[recipe, id, gotRecipe]);

    function toggleIngredients() {
        setIngredientsDisplay(!ingredientsDisplay);
    }
    function toggleDescription() {
        setDescriptionDisplay(!descriptionDisplay);
    }
    function toggleResources() {
        setResourcesDisplay(!resourcesDisplay);
    }

    const ingredientsSty = ingredientsDisplay ? styles.ingredientsContent : styles.hide;
    const descriptionSty = descriptionDisplay ? styles.instructionsText : styles.hide;
    const resourcesSty = resourcesDisplay ? styles.ingredientsContent : styles.hide;

    if(recipe && ingredientsWithMeasurements.length > 0) {
        return (
            <div className={styles.container}>
                <motion.h1 
                    initial={{ scale: 0.9, opacity:0 }}
                    animate={{ scale:1, opacity:1 }}>
                        {recipe.strMeal}
                </motion.h1>
                <div className={styles.thumbWrapper}>
                    <motion.img 
                    initial={{ scale: 0.3, opacity:0 }}
                    animate={{ scale:1, opacity:1 }}
                    src={recipe.strMealThumb}/>
                    <motion.div 
                    initial={{ scale: 0.9, opacity:0, y:50 }}
                    animate={{ scale:1, opacity:1, y:0 }}
                    className={styles.title}>
                        <h2>{recipe.strArea}</h2>
                        <h2>{recipe.strTags}</h2>
                    </motion.div>
                </div>
                <motion.div 
                initial={{ scale: 0.9, opacity:0, y:50 }}
                animate={{ scale:1, opacity:1, y:0 }}
                className={styles.ingredientsItemContainer}>
                    <div onClick={toggleIngredients} className={styles.titleWrapper}>
                        <h2>Ingredients</h2>
                        <CloseComponent rotate={ingredientsDisplay}/>
                    </div>
                    <div className={ingredientsSty}>
                        {ingredientsWithMeasurements.map((el, key) => (
                            <div className={styles.ingredientItem} key={key}>
                                <div>{el[0]}</div>
                                <div>{el[1]}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div 
                initial={{ scale: 0.9, opacity:0, y:50 }}
                animate={{ scale:1, opacity:1, y:0 }}
                className={styles.ingredientsItemContainer}>
                    <div onClick={toggleDescription} className={styles.titleWrapper}>
                        <h2>Instructions</h2>
                        <CloseComponent rotate={descriptionDisplay}/>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={descriptionSty}>{recipe.strInstructions}</div>
                    </div>
                </motion.div>
                <motion.div 
                initial={{ scale: 0.9, opacity:0, y:50 }}
                animate={{ scale:1, opacity:1, y:0 }}
                className={styles.ingredientsItemContainer}>
                    <div onClick={toggleResources} className={styles.titleWrapper}>
                        <h2>More Resources</h2>
                        <CloseComponent rotate={resourcesDisplay}/>
                    </div>
                    <div className={resourcesSty}>
                        {recipe.strYoutube !== null ? <iframe className={styles.iframe} width="100%" height="auto"
                            src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}>
                        </iframe> : <div>No video available...</div>}
                        {recipe.strSource !== null ? <div className={styles.anchor}>
                            <a target="_blank" href={recipe.strSource}>Click here to find out more</a>
                        </div>: <div>No article available...</div>}
                    </div>
                </motion.div>
            </div>
        )
    }
    else {
        return null
    }
    
    
    

}
export default RecipeInspection;