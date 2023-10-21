import React from 'react';
import { useLocation } from 'react-router-dom';

export const GetIngredientsParam = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const ingredients = queryParams.get('ingredients');
    return ingredients;
}

function capitaliseFirstLetter(word:string) {
    let words = word.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ');
    return words;
}

export const FormatIngredients = (ingredients:string) => {
    let x:string[] = ingredients.split('-').map(el => el.replace(/_/g, ' '));

    let res = x.map(el => capitaliseFirstLetter(el));
    return res;
}   

export const IterateRecipesWithActiveIngredients = (recipes:object[], ingredients:string[]) => {
    // create an object with the ingredients array and assign a false value to each ingredient
    const ingredientsAsObject: { [key: string]: boolean } = ingredients.reduce((acc, el) => {
        acc[el] = false;
        return acc;
    }, {} as { [key: string]: boolean });

    console.log(recipes);
    console.log(ingredientsAsObject);

    // map over object and ensure that all the selected ingredients exist in the recipe
    return ingredientsAsObject;


}