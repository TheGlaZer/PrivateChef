export type RecipeRequest = {
    allergies: string[];
    ingredients: string[];
    isRegenerate?: boolean;
    lastRecipeName?: string;
}
export type Recipe = {
    _id: string
    userId: string;
    title: string;
    products: string[];
    nutritional_values: string[];
    instructions: string[];
    created: Date;
    imageURL: string
    alreadyLiked: boolean,
    commentCount: number
    likeCount: number
    userName: string
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
export type Comment = {
    _id: string
    comment: string,
    recipeId: string,
    userId: string,
    created: string,
    alreadyLiked: boolean,
    likeCount: number
}
export type User = {
    email: string,
    password: string,
    fullName: string,
    image: string,
    tokens: string[],
    created: Date
}

export type RecipeLike = {
    recipeId: string;
    userId: string;
}
export type CommentLike = {
    commentId: string;
    userId: string;
}