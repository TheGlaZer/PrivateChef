import React, { useEffect, useState } from 'react';
import { Checkbox, Button, FormControlLabel, FormGroup, CircularProgress, Typography, Grid, Box, Paper } from '@mui/material';
import { getRecipeAPI } from '../../api/recipe';
import { Recipe, RecipeRequest } from '../../models/index';
import InputItemsList from '../../Components/InputItemsList';
import { useMessageContext } from '../../contexts/MessageBox';
import { getIngredientsAPI } from '../../api/ingredient';
import ImageSelector from '../../Components/ImageSelectorWithAi';
import IngredientsInput from '../../Components/IngredientsInput';

export type RecipeForm = {
  preferences?: string;
  hasAllergies: boolean;
  allergies: string[];
  ingredients: string[];
};

type RecipeFormProps = {
  setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecipeForm({ setRecipe, setOpen }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeForm>({ preferences: '', hasAllergies: false, allergies: [], ingredients: [] });
  const [loading, setLoading] = useState<boolean>(false); // State to track loading state
  console.log(formData.ingredients);
  console.log(formData.allergies);

  const { setErrorMessage } = useMessageContext();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      hasAllergies: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleRecipe();
    setLoading(false);
  };

  const handleRecipe = async () => {
    const { allergies, ingredients } = formData;
    const recipeRequest: RecipeRequest = {
      allergies,
      ingredients,
    };
    try {
      const recipe = await getRecipeAPI(recipeRequest);
      setRecipe(recipe);
      setOpen(true);
    } catch (err) {
      console.log(err);
      setErrorMessage('Error getting a recipe');
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" fontSize={35} textAlign="center" gutterBottom>
          Make Your Own Recipe
        </Typography>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.hasAllergies} onChange={handleCheckboxChange} />}
                label="Allergic to any food?"
              />
              {formData.hasAllergies && (
                <IngredientsInput
                  chosenIngredients={formData.allergies}
                  setChosenIngredients={(newAllergies) => setFormData({ ...formData, allergies: newAllergies })}
                  label='Add Allergy...'
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <IngredientsInput
                chosenIngredients={formData.ingredients}
                setChosenIngredients={(newIngredients) => setFormData({ ...formData, ingredients: newIngredients })}
                label='Add Ingredient...'
              />
            </Grid>
            <Grid item xs={12}>
              <ImageSelector setter={setFormData} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button type="submit" variant="contained" color="primary" size='medium'>
                Submit
              </Button>
              {loading && <CircularProgress size={24} sx={{ marginLeft: 2 }} />} {/* Conditionally render spinner */}
            </Grid>
          </Grid>
        </FormGroup>
      </form>
    </Paper>
  );
}
