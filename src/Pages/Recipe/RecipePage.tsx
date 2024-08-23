import { postRecipe } from '../../api/recipe';
import { Recipe } from '@/models';
import { Save as SaveIcon } from '@mui/icons-material';
import { Typography, List, ListItem, ListItemText, Divider, Box, useTheme, IconButton } from '@mui/material';

type RecipePageProps = {
  recipe: Recipe | null;
};

export default function RecipePage({ recipe }: RecipePageProps) {
  const theme = useTheme();

  if (!recipe) return <Typography variant="h5" color="error" textAlign="center">Error Fetching Recipe</Typography>;

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
      <Box sx={{ flex: 1, pr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1" gutterBottom color={theme.palette.primary.main}>
            {title}
          </Typography>
          <IconButton color="primary" onClick={handleSaveRecipe}>
            <SaveIcon />
          </IconButton>
        </Box>

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

      {imageURL && (
        <Box sx={{ flex: '0 0 300px', display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2 }}>
          <img
            src={imageURL}
            alt={title}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </Box>
      )}
    </Box>
  );
}