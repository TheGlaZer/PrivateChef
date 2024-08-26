import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Divider, Button } from '@mui/material';
import { Comment, Recipe } from '@/models'; // Adjust the import path accordingly
import { useTheme } from '@mui/material/styles';
import { serverUrl } from '../../api';
import CommentSection from './CommentSection';
import ActionButtons from '../../Components/ActionButtons';
import { getAllCommentsByRecipeId } from '../../api/comment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


type RecipeCardProps = {
    recipe: Recipe;
    setIsExpanded: (value: boolean) => void
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, setIsExpanded }) => {

    const theme = useTheme();
    const [showCommentSection, setShowCommentSection] = useState(false)
    const [comments, setComments] = useState<Comment[]>([]);
    const { title, products, instructions, imageURL, _id: recipeId, likeCount, alreadyLiked } = recipe

    const fetchComments = async (recipeId: string) => {
        try {
            const data = await getAllCommentsByRecipeId(recipeId)
            setComments(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchComments(recipeId)
    }, [])
    const onCommentClick = () => {
        setShowCommentSection(value => !value)
    }
    const onLikeClick = () => {
    }

    return (
        <Card sx={{ maxWidth: 845, margin: 'auto', boxShadow: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                <Box sx={{ flex: 1, pr: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h2" component="h1" gutterBottom color={theme.palette.primary.main} fontWeight={500}>
                            {title}
                        </Typography>
                        <Button sx={{}} onClick={() => setIsExpanded(false)}>
                            <ExpandLessIcon style={{ width: 60, height: 60 }} />
                        </Button>
                    </Box>
                    {imageURL && (
                        <Box sx={{ ml: 2 }}>
                            <img
                                src={`${serverUrl}${imageURL}`}
                                alt={title}
                                style={{ maxHeight: '400px', width: "100%", objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </Box>
                    )}

                    <Box sx={{
                        mt: 2, display: "grid", gridTemplateColumns: "1fr auto 2fr", paddingBottom: 5
                    }}>
                        <Box>
                            <Typography variant="h4" component="h3" gutterBottom color={theme.palette.secondary.main} sx={{ textAlign: "center" }}>
                                Products
                            </Typography>
                            <List>
                                {products.map((product: any, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`${product.amount} ${product.name || product.product || product.ingredient}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Divider orientation="vertical" sx={{ my: 2, mr: 5 }} />
                        <Box>
                            <Typography variant="h4" component="h3" gutterBottom color={theme.palette.secondary.main} sx={{ textAlign: "center" }}>
                                Instructions
                            </Typography>
                            <List sx={{ listStyleType: 'decimal', pl: 2 }}>
                                {instructions.map((instruction, index) => (
                                    <ListItem key={index} sx={{ display: 'list-item' }}>
                                        <ListItemText primary={instruction} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    <Box>
                        <ActionButtons
                            onCommentClick={onCommentClick}
                            onLikeClick={onLikeClick}
                            commentsNumber={comments.length}
                            likesNumber={likeCount}
                            recipeId={recipeId}
                            alreadyLiked={alreadyLiked}
                        />
                    </Box>
                    {showCommentSection &&
                        <CommentSection comments={comments} setComments={setComments} recipeId={recipeId} />
                    }
                </Box>

            </Box>
        </Card>
    );
};

export default RecipeCard;
