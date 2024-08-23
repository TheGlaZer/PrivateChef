import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Dialog, CardContent as MuiCardContent } from '@mui/material';
import EditProfile from './EditProfile'; // Assume you have a UserForm component for updating user details
import { Recipe } from '../../models';
import RecipePage from '../Recipe/RecipePage';
import server from '../../api';
import { useMessageContext } from '../../contexts/MessageBox';

function UserProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);
  const { setErrorMessage } = useMessageContext();
  

  useEffect(() => {
    if (tabValue === 1) {
      try {
        server.get('/recipe').then((response) => {
          setSavedRecipes(response.data);
        });
      } catch (error) {
        setErrorMessage('Error fetching saved recipes')
      }
    }
  }, [tabValue]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Update Profile" />
        <Tab label="Saved Recipes" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <EditProfile />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          {savedRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.title}>
              <Card>
                <CardActionArea onClick={() => handleRecipeClick(recipe)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.imageURL}
                    alt={recipe.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {recipe.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="paper">
        <Card sx={{ m: 0, p: 0, overflow: 'auto', maxHeight: '80vh' }}>
          <MuiCardContent sx={{ p: 2 }}>
            <RecipePage recipe={selectedRecipe} isNew={false} onRegenerate={async () => {}} />
          </MuiCardContent>
        </Card>
      </Dialog>
    </Box>
  );
}

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default UserProfile;
