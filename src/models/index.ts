export type RecipeRequest = {
    allergies: string[];
    ingredients: string[];

}

export type Recipe = {
    title: string,
    ingredients: string[],
    instructions: string
}


