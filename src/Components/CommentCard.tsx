import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import { Comment } from '@/models';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Delete } from '@mui/icons-material';
import { postLikeComment } from '../api/like';
import { useUser } from '../Providers/UserProvider';
import { Close } from '@mui/icons-material';
import { editComment } from '../api/comment';

type CommentCardProps = {
    comment: Comment;
    handleEditComment: (commentId: string, comment: string) => void
    handleDeleteComment: (commentId: string) => void
};
const CommentCard: React.FC<CommentCardProps> = ({ comment, handleEditComment, handleDeleteComment }) => {

    const { likeCount, alreadyLiked, userName } = comment
    const [editedCommentValue, setEditedCommentValue] = useState(comment.comment)
    const [likes, setLikes] = useState(likeCount)
    const [userLiked, setUserLiked] = useState(alreadyLiked)
    const [editMode, setEditMode] = useState(false)
    const theme = useTheme();
    const { user } = useUser()

    console.log(comment.userId)
    console.log(user)
    const isUsersComment = comment.userId === user?.id
    console.log(isUsersComment)

    const handleLikeClick = async () => {
        try {
            const res = await postLikeComment(comment._id)
            if (res.status === "liked") {
                setUserLiked(true)
                setLikes(likes + 1)
            }
            else {
                setUserLiked(false)
                setLikes(likes - 1)
            }
        } catch (error) {
        }
    }
    const handleSaveClick = () => {
        handleEditComment(comment._id, editedCommentValue)
        setEditMode(false)

    }

    const onDeleteComment = () => {
        handleDeleteComment(comment._id)
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
                            value={editedCommentValue}
                            onChange={(e) => setEditedCommentValue(e.target.value)}
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
                    User: {userName} | Date: {comment.created}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isUsersComment &&
                <Button onClick={() => setEditMode(!editMode)}>
                    <EditIcon color='info' sx={{ color: "gray" }}/>
                    </Button>
                }
                
            <Button onClick={handleLikeClick}>
                <Typography sx={{ fontWeight: 400, fontSize: 20, pr: 1, color: userLiked ? theme.palette.primary.main : "lightgray" }}>{likes}</Typography>
                <ThumbUpIcon color='info' sx={{ color: userLiked ? theme.palette.primary.main : "lightgray" }} />

            </Button>
            {isUsersComment &&
                <Button onClick={onDeleteComment}>
                    <Delete color='info'/>
                </Button>
            }
            </Box>
        </Box>
    );
};

export default CommentCard;
