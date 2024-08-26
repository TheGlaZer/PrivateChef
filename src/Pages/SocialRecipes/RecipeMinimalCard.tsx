import { serverUrl } from "../../api";
import { Recipe } from "@/models";
import { Box, Button, Card, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import RecipeCard from "./RecipeCard";
type RecipeMinimalCardProps = {
    recipe: Recipe;
    setIsExpanded: (value: boolean) => void
};

function RecipeMinimalCard({ recipe, setIsExpanded }: RecipeMinimalCardProps) {
    const { title, products, instructions, imageURL, _id: recipeId, likeCount, alreadyLiked, commentCount, } = recipe
    const theme = useTheme()

    return (
        <Card sx={{ maxWidth: 845, height: 180, margin: 'auto', boxShadow: 3, }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ pt: 2, pl: 2 }}>
                    <Typography variant="h3" component="h1" color={theme.palette.primary.main} fontWeight={500}>
                        {title}
                    </Typography>
                    <Typography variant="body1" gutterBottom fontWeight={500} fontSize={20}>
                        This is some description for the Recipe
                    </Typography>
                    <Box sx={{ pt: 2, display: "flex", }}>
                        <Button>
                            <Typography sx={{ fontWeight: 400, fontSize: 20, pr: 1, color: theme.palette.primary.main }}>{likeCount}</Typography>
                            <ThumbUpIcon color='info' sx={{ color: alreadyLiked ? theme.palette.primary.main : "lightgray" }} />
                        </Button>
                        <Button>
                            <Typography sx={{ fontWeight: 400, fontSize: 20, pr: 1, color: theme.palette.primary.main }}>{commentCount}</Typography>
                            <CommentIcon color='info' sx={{ color: theme.palette.primary.main }} />
                        </Button>
                        <Button sx={{}} onClick={() => setIsExpanded(true)}>
                            <ExpandIcon style={{ width: 40, height: 40 }} />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{}}>
                    <img
                        src={`${serverUrl}${imageURL}`}
                        alt={title}
                        style={{ height: '100%', width: "300px", objectFit: 'fill', borderRadius: '8px' }}
                    />
                </Box>
            </Box>
        </Card>
    );
}

export default RecipeMinimalCard;