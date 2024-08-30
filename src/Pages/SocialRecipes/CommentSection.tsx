import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Comment } from '@/models';
import CommentCard from '../../Components/CommentCard';
import { deleteComment, editComment, getAllCommentsByRecipeId } from '../../api/comment';
import AddCommentInput from './AddCommentInput';
import { useUser } from '../..//Providers/UserProvider';

type CommentSectionProps = {
    comments: Comment[];
    recipeId: string
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments, setComments, recipeId }) => {
    const handleEditComment = async (commentId: string, comment: string) => {
        try {
            const commentToEdit = comments.find((c) => c._id === commentId)
            if (commentToEdit) {
                commentToEdit.comment = comment
                const response = await editComment(commentToEdit)
                const newComments = comments.map((c) => {
                    if (c._id === commentId) {
                        return { ...c, comment }
                    }
                    return c
                })
                setComments(newComments)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        try {
            const response = await deleteComment(commentId)
            const newComments = comments.filter((c) => c._id !== commentId)
            setComments(newComments)
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '25px',
                marginTop: '20px',
            }}>
            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>
            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment} />
            ))}
            <Box sx={{ marginTop: '15px' }}>
                <AddCommentInput setComments={setComments} recipeId={recipeId} />
            </Box>
        </Box>
    );
};

export default CommentSection;
