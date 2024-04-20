import React from 'react';
import RecipeForm from './RecipeForm';
// import logoImage from '@/assets/Logo.png'
import logoImage from '../../assets/Logo.png'
import saladImage from '../../assets/salad.jpg'

function Home() {
  return (
    <>
      <div style={{ display: "flex", width: 1000, minHeight: "100vh", gap: 30 }}>
        <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", }}>
          <img src={logoImage} alt="" style={{ width: 200, height: 100 }} />
          <img src={saladImage} alt="" style={{ width: 800, height: 300 }} />
          <h1>Wellcome to PrivateChef </h1>
          <p>Here you will get your best menu bla bla bla </p>
        </div>
        <RecipeForm></RecipeForm>
      </div>
    </>
  );
}

export default Home;
