
import { Comment } from '@/models';
import server from '.';

export const getAllCommentsByRecipeId = async (recipeId: string): Promise<Comment[]> => {
    const response = await server.get(`/comments/${recipeId}`);
    return response.data;
};
export const postComment = async (newComment: Partial<Comment>): Promise<Comment> => {
    const response = await server.post(`/comments`, newComment);
    return response.data;
};

export const editComment = async (comment: Comment): Promise<Comment> => {
    const response = await server.patch(`/comments/${comment._id}`, comment);
    return response.data;
}

export const deleteComment = async (commentId: string): Promise<Comment> => {
    const response = await server.delete(`/comments/${commentId}`);
    return response.data;
}
