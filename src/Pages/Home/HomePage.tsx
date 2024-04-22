import React, { useState } from 'react';
import RecipeForm from './RecipeForm';
// import logoImage from '@/assets/Logo.png'

import { Card, Dialog } from '@mui/material';
import WellcomeLayout from './WellcomeLayout';
import RecipePage from '../Recipe/RecipePage';
import { Recipe } from '@/models';

function Home() {

  const [open, setOpen] = useState(false)
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div style={{ display: "flex", width: 1000, minHeight: "100vh", gap: 30 }}>
        <WellcomeLayout />
        <RecipeForm setOpen={setOpen} setRecipe={setRecipe} ></RecipeForm>
        <Dialog open={open} onClose={handleClose}>
          <Card>
            <RecipePage recipe={recipe} />
          </Card>
        </Dialog>
      </div>
    </>
  );
}

export default Home;
