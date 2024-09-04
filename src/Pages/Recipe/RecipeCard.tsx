import { useMessageContext } from '../../contexts/MessageBox';
import { serverUrl } from '../../api';
import { postRecipe } from '../../api/recipe';
import { Recipe } from '../../models';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Typography, List, ListItem, ListItemText, CircularProgress, Divider, Box, useTheme, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

type RecipePageProps = {
  recipe: Recipe | null;
  isNew: boolean;
  onRegenerate: () => Promise<void>; // Add a prop to handle regeneration
  setOpen: Dispatch<SetStateAction<boolean>> | null
};

export default function RecipeCard({ recipe, isNew = true, onRegenerate, setOpen }: RecipePageProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const { setSuccessMessage, setErrorMessage } = useMessageContext();

  if (!recipe) return null;

  const { products, instructions, title, imageURL, nutritionalValues, missingItems } = recipe;

  const handleSaveRecipe = async () => {
    try {
      await postRecipe(recipe);
      setSuccessMessage("Recipe saved successfuly!");
      setOpen && setOpen(false);
    } catch (error) {
      setErrorMessage('Error saving recipe');
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
    <Box sx={{ display: 'flex', flexDirection: 'row', p: 2, alignItems: "flex-start" }}>
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

          {missingItems && missingItems.length > 0 && (
            <>
              <Typography variant="h6" component="h3" gutterBottom color={theme.palette.error.main}>
                Missing Items
              </Typography>
              <List>
                {missingItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
            </>
          )}

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
          <Divider sx={{ my: 2 }} />

          {nutritionalValues && (
            <>
              <Typography variant="h6" component="h3" gutterBottom color={theme.palette.secondary.main}>
                Nutritional Values
              </Typography>
              <List>
                {nutritionalValues.map((nutrition: any, index) => (
                  <ListItem key={index}>
                <ListItemText primary={`${nutrition.name}: ${nutrition.value}`} />
                </ListItem>
                ))}
              </List>
            </>
          )}
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
