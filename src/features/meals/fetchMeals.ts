export type TotalMealsResponse = { meals: MealItem[] };
export type MealItem = { 
    idMeal:string, 
    strMeal:string,
    strMealThumb:string,
};

export function collectMeals(ingredient:string): Promise<TotalMealsResponse> {
        return fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((res: Response) => res.json())
        .then((data: TotalMealsResponse) => data)
        .catch((err) => {
            throw err;
        })
};