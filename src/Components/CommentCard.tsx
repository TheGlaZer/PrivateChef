import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import { Comment } from '@/models';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { postLikeComment } from '../api/like';
import { useUser } from '../Providers/UserProvider';
import { Close } from '@mui/icons-material';

type CommentCardProps = {
    comment: Comment;
};
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {

    const { likeCount, alreadyLiked } = comment
    const [likes, setLikes] = useState(likeCount)
    const [userLiked, setUserLiked] = useState(alreadyLiked)
    const [editMode, setEditMode] = useState(false)
    const theme = useTheme();
    const { user } = useUser()

    const isUsersComment = comment.userId === user?.id

    const handleLikeClick = async () => {
        if (userLiked) {
            return
        }
        try {
            const res = await postLikeComment(comment._id)
            setUserLiked(true)
            setLikes(likes + 1)
        } catch (error) {
        }
    }
    const handleSaveClick = () => {

    }
    const handleCloseClick = () => {
        setEditMode(false)
    }

    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Box>
                {editMode ?
                    <Box>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={comment.comment}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSaveClick} edge="end" >
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={handleCloseClick} edge="end">
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Box>
                    :
                    <Typography variant="body1">{comment.comment}</Typography>}

                <Typography variant="caption" color="text.secondary">
                    User: {comment.userId} | Date: {comment.created}
                </Typography>
            </Box>
            <Button onClick={handleLikeClick}>
                {isUsersComment &&
                    <EditIcon color='info' sx={{ color: "gray" }} style={{ paddingRight: 5 }} onClick={() => setEditMode(!editMode)} />
                }
                <Typography sx={{ fontWeight: 400, fontSize: 20, pr: 1, color: userLiked ? theme.palette.primary.main : "lightgray" }}>{likes}</Typography>
                <ThumbUpIcon color='info' sx={{ color: userLiked ? theme.palette.primary.main : "lightgray" }} />

            </Button>
        </Box>
    );
};

export default CommentCard;
