export type RecipeRequest = {
    allergies: string[];
    ingredients: string[];

}

export type Recipe = {
    title: string,
    products: ProductInRecipe[],
    instructions: string[]
}

export type ProductInRecipe = {
    product: string,
    amount: string
}

