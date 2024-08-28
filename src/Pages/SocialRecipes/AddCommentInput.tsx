import { postComment } from "../../api/comment";
import { useUser } from "../../Providers/UserProvider";
import { Comment } from "@/models";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
    recipeId: string
}
function AddCommentInput({ setComments, recipeId }: Props) {
    const [text, setText] = useState<string>("");
    
    const handleAddComment = async () => {
        if (text.trim() === "") {
            return
        }
        const commentToAdd: Partial<Comment> = {
            comment: text,
            recipeId,
        };
        try {
            const commnet = await postComment(commentToAdd)
            setComments((comments) => [...comments, commnet]);
            setText("");
        } catch (err) {
            console.log(err)
            setText("");
        }
    };

    return (
        <Box sx={{ pt: 5 }}>
            <TextField
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
                variant="outlined"
                sx={{ marginBottom: '10px' }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                >
                    Add Comment
                </Button>
            </Box>
        </Box>

    );
}

export default AddCommentInput;