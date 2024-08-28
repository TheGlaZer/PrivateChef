
import { Ingredient, Recipe, RecipeRequest } from '@/models';
import server from '.';

export const getRecipeAPI = async (recipe: RecipeRequest): Promise<Recipe> => {
    const response = await server.post('/recipe/generate', recipe);
    return response.data
}

export const postRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const response = await server.post('/recipe', recipe);
    return response.data
}

export const getRecipesOfUser = async (): Promise<Recipe[]> => {
    const response = await server.get('/recipe');
    return response.data
}

export const getRecipes = async (): Promise<Recipe[]> => {
    const response = await server.get('/recipe/all');
    return response.data
}

export const uploadIngredientImageAPI = async (file: File): Promise<Ingredient[]> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await server.post('/ingredients', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
}
