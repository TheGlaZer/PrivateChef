export type RecipeRequest = {
    allergies: string[];
    ingredients: string[];

}
export type Recipe = {
    title: string,
    products: ProductInRecipe[],
    instructions: string[]
}
export type Ingredient = {
    id: string,
    name: string
}
export type ProductInRecipe = {
    product: string,
    name: string,
    ingredient: string,
    amount: string
}