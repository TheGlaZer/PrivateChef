import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Stack from '@mui/material/Stack';
import { postLikeRecipe } from '../api/like';


type ActionButtonsProps = {
    commentsNumber: number
    likesNumber: number
    onCommentClick: () => void;
    onLikeClick: () => void;
    recipeId: string
    alreadyLiked: boolean
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCommentClick, onLikeClick, commentsNumber, likesNumber, recipeId, alreadyLiked }) => {

    const [likes, setLikes] = useState(likesNumber)
    const [isUserAlreadyLiked, setIsUserAlreadyLiked] = useState(alreadyLiked)

    const handleLikeClicked = async () => {
        if (isUserAlreadyLiked) {
            return
        }
        try {
            const res = await postLikeRecipe(recipeId)
            setLikes(likes + 1)
            setIsUserAlreadyLiked(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<CommentIcon />}
                sx={{ textTransform: 'none' }}
                onClick={onCommentClick}
            >
                {`${commentsNumber}  Comments`}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<ThumbUpIcon />}
                sx={{ textTransform: 'none' }}
                onClick={handleLikeClicked}
            >
                {`${likes}  Like`}
            </Button>
        </Stack>
    );
};

export default ActionButtons;
