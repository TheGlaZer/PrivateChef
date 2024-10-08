
import { RecipeLike } from '@/models';
import server from '.';

export const postLikeRecipe = async (recipeId: string): Promise<any> => {
    const response = await server.post(`/likes/recipe/${recipeId}`);
    return response.data;
};
export const postLikeComment = async (commentId: Partial<Comment>): Promise<any> => {
    const response = await server.post(`/likes/comment/${commentId}`);
    return response.data;
};
