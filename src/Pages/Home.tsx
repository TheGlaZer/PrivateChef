import React from 'react';
import RecipeForm from '../Components/RecipeForm';

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 800, alignItems: "center" }}>
      <h1>Create a recipe</h1>
      <RecipeForm></RecipeForm>
    </div>
  );
}

export default Home;
