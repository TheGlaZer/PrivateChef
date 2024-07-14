import React, { useState } from 'react';
import RecipeForm from '../Recipe/RecipeForm';
// import logoImage from '@/assets/Logo.png'

import { Button, Card, Dialog } from '@mui/material';
import WellcomeLayout from './WellcomeLayout';
import RecipePage from '../Recipe/RecipePage';
import { Recipe } from '@/models';

function Home() {


  return (
    <>
      <div style={{ display: "flex", width: 1200, minHeight: "100vh", gap: 30 }}>
        <WellcomeLayout />
      </div>
    </>
  );
}

export default Home;
