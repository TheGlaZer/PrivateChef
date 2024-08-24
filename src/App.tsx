import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/HomePage';
import { Box } from '@mui/material';
import saladImage from './assets/salad.jpg'; // make sure to adjust the path to your image
import MessageBox from './Components/MessageBox';
import { Login, SignUp } from './Pages/Auth';
import RecipeForm from './Pages/Recipe/RecipeForm';
import SearchForRecipe from './Pages/Recipe/SearchForRecipe';
import UserProfile from './Pages/Home/UserProfile';

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
            <Route path="/searchRecipe" element={<SearchForRecipe/>} />
            <Route path="/profile" element={<UserProfile/>} /> {/* Add this route */}
          </Routes>
        </div>
        <MessageBox />
      </div>
    </Router>
  );
}

export default App;
