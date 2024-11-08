import React, { useState } from 'react';
import { Checkbox, Button, FormControlLabel, FormGroup, CircularProgress, Typography, Grid, Paper, TextField } from '@mui/material';
import ImageSelector from '../../Components/ImageSelectorWithAi';
import IngredientsInput from '../../Components/IngredientsInput';
import { RecipeRequestForm } from './SearchForRecipe';

type RecipeFormProps = {
  formData: RecipeRequestForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeRequestForm>>;
  handleRecipe: () => Promise<void>;
};

export default function RecipeForm({ formData, setFormData, handleRecipe }: RecipeFormProps) {
  const [loading, setLoading] = useState<boolean>(false); // State to track loading state
  const [description, setDescription] = useState<string>(''); // State to track the new input

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      hasAllergies: e.target.checked,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length <= 200) {
      setDescription(input);
      setFormData({
        ...formData,
        additionalInput: input, // Update form data with the new description
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleRecipe();
    setLoading(false);
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
              <TextField
                label="Add additional requests (max 200 characters)"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
                helperText={`${description.length}/200`}
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
