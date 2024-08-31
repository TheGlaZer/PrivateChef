import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Divider, Button, Container } from '@mui/material';
import { Comment, Recipe } from '@/models'; // Adjust the import path accordingly
import { useTheme } from '@mui/material/styles';
import { serverUrl } from '../../api';
import CommentSection from './CommentSection';
import ActionButtons from '../../Components/ActionButtons';
import { getAllCommentsByRecipeId } from '../../api/comment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLocation } from 'react-router-dom';

type RecipePageProps = {
    recipe: Recipe;
    setIsExpanded?: (value: boolean) => void; // Optional if not used for navigation
};

const RecipePage = () => {

    const theme = useTheme();
    const location = useLocation();
    const recipe: Recipe = location.state?.recipe;
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const { title, products, instructions, imageURL, _id: recipeId, likeCount, alreadyLiked } = recipe;

    const fetchComments = async (recipeId: string) => {
        try {
            const data = await getAllCommentsByRecipeId(recipeId);
            setComments(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchComments(recipeId);
    }, [recipeId]);

    const onCommentClick = () => {
        setShowCommentSection((value) => !value);
    };

    const onLikeClick = () => {
        // Handle like click
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box>
                    <Typography variant="h2" component="h1" color={theme.palette.primary.main} fontWeight={500}>
                        {title}
                    </Typography>
                </Box>

                {imageURL && (
                    <Box sx={{ maxWidth: '80%', margin: 'auto', overflow: 'hidden', borderRadius: '8px', }}>
                        <img
                            src={`${serverUrl}${imageURL}`}
                            alt={title}
                            style={{
                                height: '300px', // Limit the height to avoid taking too much space
                                width: '100%',
                                objectFit: 'cover', // Crop the image if necessary to fit the space
                                borderRadius: '8px',
                                marginBottom: '16px',
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 4 }}>
                    <Box>
                        <Typography variant="h3" component="h3" color={theme.palette.secondary.main} textAlign="center" >
                            Products
                        </Typography>
                        <List>
                            {products.map((product: any, index: number) => (
                                <ListItem key={index}>
                                    <ListItemText primary={`${product.amount} ${product.name || product.product || product.ingredient}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box>
                        <Typography variant="h3" component="h3" color={theme.palette.secondary.main} textAlign="center">
                            Instructions
                        </Typography>
                        <List sx={{ listStyleType: 'decimal', pl: 2 }}>
                            {instructions.map((instruction: string, index: number) => (
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

                {showCommentSection && (
                    <CommentSection comments={comments} setComments={setComments} recipeId={recipeId} />
                )}
            </Box>
        </Container>
    );
};

export default RecipePage;
