export type TotalIngredientResponse = { meals: IngredientItem[] };
export type IngredientItem = { 
    idIngredient:string, 
    strDescription:string | null,
    strIngredient:string,
    strType:string | null 
};

export function collectIngredients(): Promise<TotalIngredientResponse> {
        return fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((res: Response) => res.json())
        .then((data: TotalIngredientResponse) => data)
        .catch((err) => {
            throw err;
        })
};
