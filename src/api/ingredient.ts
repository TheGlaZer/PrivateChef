
import { Ingredient } from '@/models';
import { server } from '.';

export const getIngredientsAPI = async (): Promise<Ingredient[]> => {
    const response = await server.get('/ingredients');
    return response.data
}