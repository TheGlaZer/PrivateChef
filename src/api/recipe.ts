
import { Recipe, RecipeRequest } from '@/models';
import { server } from '.';

export const getRecipeAPI = async (recipe: RecipeRequest): Promise<Recipe> => {
    const response = await server.post('/recipe', recipe);
    return response.data
}
