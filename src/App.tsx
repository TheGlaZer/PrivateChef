import React from 'react';
import Home from './Pages/Home';
import './App.css'

function App() {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'lightgray', display: "flex", justifyContent: "center", padding: 0, margin: 0 }}>
        <div style={{ width: '70%', display: "flex", justifyContent: "center", backgroundColor: "white" }}>
          <Home></Home>
        </div>
      </div>
    </>
  );
}

export default App;
