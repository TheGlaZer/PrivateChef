import { Recipe } from '@/models';
import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box, useTheme } from '@mui/material';

type RecipePageProps = {
  recipe: Recipe | null;
};

export default function RecipePage({ recipe }: RecipePageProps) {
  const theme = useTheme();

  if (!recipe) return <Typography variant="h5" color="error" textAlign="center">Error Fetching Recipe</Typography>;

  const { products, instructions, title } = recipe;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom color={theme.palette.primary.main}>
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom color={theme.palette.secondary.main}>
          Products
        </Typography>
        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${product.amount} ${product.name || product.product || product.ingredient}`} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="h3" gutterBottom color={theme.palette.secondary.main}>
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
  );
}
