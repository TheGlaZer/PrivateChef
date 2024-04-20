
import { Recipe } from '@/models';
import { server } from '.';

export const getRecipeAPI = async (recipe: Recipe) => {

    const response = await server.post('/recipe', recipe);
    return response
}
