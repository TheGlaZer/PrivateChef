// /src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/HomePage';
import SignUp from './Pages/SignUp/SignUp';
import ListDataContainer from './Pages/Home/ListDataContainer';
import RecipeForm from './Pages/Home/RecipeForm';
import RecipePage from './Pages/Recipe/RecipePage';
import WellcomeLayout from './Pages/Home/WellcomeLayout';
import { Box } from '@mui/material';
import saladImage from './assets/salad.jpg'; // make sure to adjust the path to your image
import MessageBox from './Components/MessageBox';
import Login from './Pages/Login/Login';

function App() {
  return (
    <Router>
      <div style={{
        width: '100%', minHeight: "100vh", backgroundColor: 'lightgray',
        display: "flex", alignItems: "center", padding: 0, margin: 0, position: "relative",
        flexDirection: "column"
      }}>
        <Navbar />
        <Box
          sx={{
            width: '100%',
            height: '200px',
            backgroundImage: `url(${saladImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{ width: '90%', minHeight: "100%", padding: 50, backgroundColor: "white" }}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </div>
        <MessageBox />
      </div>
    </Router>
  );
}

export default App;
