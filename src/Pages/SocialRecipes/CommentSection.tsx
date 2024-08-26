import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Comment } from '@/models';
import CommentCard from '../../Components/CommentCard';
import { getAllCommentsByRecipeId } from '../../api/comment';
import AddCommentInput from './AddCommentInput';
import { useUser } from '../..//Providers/UserProvider';

type CommentSectionProps = {
    comments: Comment[];
    recipeId: string
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments, setComments, recipeId }) => {

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
                <CommentCard key={index} comment={comment} />
            ))}
            <Box sx={{ marginTop: '15px' }}>
                <AddCommentInput setComments={setComments} recipeId={recipeId} />
            </Box>
        </Box>
    );
};

export default CommentSection;
