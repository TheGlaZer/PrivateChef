import React, { useState } from 'react';
import RecipeForm from './RecipeForm';
// import logoImage from '@/assets/Logo.png'

import { Card, Dialog } from '@mui/material';
import WellcomeLayout from './WellcomeLayout';
import RecipePage from '../Recipe/RecipePage';
import { Recipe } from '@/models';

function Home() {

  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  const mockRecipe: Recipe = {
    title: "Ultimate Shashuka",
    ingredients: [
      "4 ripe tomatoes, roughly chopped",
      "1 small onion, finely chopped",
      "1 red bell pepper, diced",
      "2 cloves garlic, minced",
      "4 large eggs",
      "2 tbsp olive oil",
      "1 tsp paprika",
      "1/2 tsp cumin",
      "1/4 tsp chili powder",
      "Salt and pepper to taste",
      "Fresh parsley, chopped for garnish",
      "Crusty bread or pita, for serving"
    ],
    instructions: "Heat olive oil in a large skillet over medium heat. Add the chopped onions and bell peppers, cooking until soft, about 5 minutes. Stir in garlic, paprika, cumin, and chili powder, cooking for another minute until fragrant. Add the tomatoes and season with salt and pepper. Simmer the sauce for 10 minutes, until tomatoes break down and the sauce thickens. Create four wells in the sauce and crack an egg into each well. Cover the skillet and cook for about 10 minutes, until the eggs are set but yolks are still runny. Garnish with fresh parsley and serve hot with crusty bread or pita."
  };


  return (
    <>
      <div style={{ display: "flex", width: 1000, minHeight: "100vh", gap: 30 }}>
        <WellcomeLayout />
        <RecipeForm></RecipeForm>

        <Dialog open={open} onClose={handleClose}>
          <Card>
            <RecipePage recipe={mockRecipe} />
          </Card>
        </Dialog>
      </div>
    </>
  );
}

export default Home;
