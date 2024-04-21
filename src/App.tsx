import React from 'react';
import Home from './Pages/Home/HomePage';
import './App.css'
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <div style={{
        width: '100%', minHeight: "100vh", backgroundColor: 'lightgray',
        display: "flex", alignItems: "center", padding: 0, margin: 0, position: "relative",
        flexDirection: "column"
      }}>
        <Navbar></Navbar>
        <div style={{ width: '90%', minHeight: "100%", padding: 50, backgroundColor: "white" }}>
          <Home></Home>
        </div>
      </div>
    </>
  );
}

export default App;
