import { serverUrl } from '../../api';
import { postRecipe, getRecipeAPI } from '../../api/recipe';
import { Recipe } from '../../models';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Typography, List, ListItem, ListItemText, CircularProgress, Divider, Box, useTheme, IconButton } from '@mui/material';
import { useState } from 'react';

type RecipePageProps = {
  recipe: Recipe | null;
  isNew: boolean;
  onRegenerate: () => Promise<void>; // Add a prop to handle regeneration
};

export default function RecipeCard({ recipe, isNew = true, onRegenerate }: RecipePageProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  if (!recipe) return null;

  const { products, instructions, title, imageURL } = recipe;

  const handleSaveRecipe = async () => {
    try {
      await postRecipe(recipe);
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  const handleRegenerateRecipe = async () => {
    setLoading(true);
    try {
      await onRegenerate();
    } catch (error) {
      console.error('Error regenerating recipe:', error);
      alert('Failed to regenerate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
      <Box sx={{ flex: 1, pr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1" gutterBottom color={theme.palette.primary.main}>
            {title}
          </Typography>
          <Box>
            {isNew && (
              <Box>
                <IconButton color="primary" onClick={handleSaveRecipe}>
                  <SaveIcon />
                </IconButton>

                <IconButton color="secondary" onClick={handleRegenerateRecipe} disabled={loading}>
                  <RefreshIcon />
                </IconButton>
                {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom color={theme.palette.secondary.main}>
            Products
          </Typography>
          <List>
            {products.map((product: any, index) => (
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

      {imageURL && (
        <Box sx={{ flex: '0 0 300px', display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2 }}>
          <img
            src={`${serverUrl}${imageURL}`}
            alt={title}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </Box>
      )}
    </Box>
  );
}
