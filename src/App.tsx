import React from 'react';
import Home from './Pages/Home/HomePage';
import './App.css'
import Navbar from './Components/Navbar';
import MessageBox from './Components/MessageBox';
import { Box } from '@mui/material';
import  saladImage from "./assets/salad.jpg"

function App() {
  return (
    <>
      <div style={{
        width: '100%', minHeight: "100vh", backgroundColor: 'lightgray',
        display: "flex", alignItems: "center", padding: 0, margin: 0, position: "relative",
        flexDirection: "column"
      }}>
        <Navbar></Navbar>
        <Box
  sx={{
    width: '100%', // take up all the width
    height: '200px', // set a certain height
    backgroundImage: `url(${saladImage})`, // set the background image
    backgroundSize: 'cover', // cover the entire width of the box
    backgroundPosition: 'center', // center the image
  }}
/>
        <div style={{ width: '90%', minHeight: "100%", padding: 50, backgroundColor: "white" }}>
          <Home></Home>
        </div>
        <MessageBox />
      </div>
    </>
  );
}

export default App;
