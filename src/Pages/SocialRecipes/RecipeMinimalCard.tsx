import { serverUrl } from "../../api";
import { Recipe } from "@/models";
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { postLikeRecipe } from "../../api/like";
type RecipeMinimalCardProps = {
    recipe: Recipe;
    setIsExpanded: (value: boolean) => void
};

function RecipeMinimalCard({ recipe, setIsExpanded }: RecipeMinimalCardProps) {
    const { title, products, instructions, imageURL, _id: recipeId, likeCount, alreadyLiked, commentCount, userName } = recipe
    const theme = useTheme()

    const [likes, setLikes] = useState(likeCount)
    const [isUserAlreadyLiked, setIsUserAlreadyLiked] = useState(alreadyLiked)

    const handleLikeClicked = async () => {
        try {
            const res = await postLikeRecipe(recipeId)
            console.log(res)
            if (res.status == "unliked") {
                setLikes(likes - 1)
                setIsUserAlreadyLiked(false)
            }
            else {
                setLikes(likes + 1)
                setIsUserAlreadyLiked(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        
        <Grid item xs={12} sm={6} md={4} key={recipe.title}>
        <Card sx={{ maxWidth: 500, height: 300, margin: 'auto', boxShadow: 3, }}>
            <CardHeader title={title} subheader={`By: ${userName}`}/>
            <CardMedia
                    component="img"
                    height="140"
                    image={`${serverUrl}${recipe.imageURL}`}
                    alt={recipe.title}
                  />
            <CardContent>
                    <Box>
                        <Button onClick={handleLikeClicked}>
                            <Typography sx={{ fontWeight: 400, fontSize: 20, pr: 1, color: theme.palette.primary.main }}>{likes}</Typography>
                            <ThumbUpIcon color='info' sx={{ color: isUserAlreadyLiked ? theme.palette.primary.main : "lightgray" }} />
                        </Button>
                        <Button>
                            <Typography sx={{ fontWeight: 400, fontSize: 20, pr: 1, color: theme.palette.primary.main }}>{commentCount}</Typography>
                            <CommentIcon color='info' sx={{ color: theme.palette.primary.main }} />
                        </Button>
                        <Button sx={{}} onClick={() => setIsExpanded(true)}>
                            <ExpandIcon style={{ width: 40, height: 40 }} />
                        </Button>
                    </Box>
                </CardContent>
        </Card>
        </Grid>
    );
}

export default RecipeMinimalCard;