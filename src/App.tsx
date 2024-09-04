import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/HomePage';
import { Box, Container } from '@mui/material';
import saladImage from './assets/salad.jpg';
import MessageBox from './Components/MessageBox';
import { Login, SignUp } from './Pages/Auth';
import SearchForRecipe from './Pages/Recipe/SearchForRecipe';
import UserProfile from './Pages/Home/UserProfile';
import SocialRecipesPage from './Pages/SocialRecipes';
import RecipePage from './Pages/SocialRecipes/RecipePage';

function App() {
  return (
    <Router>
      <Box
        sx={{
          width: '100%',
          minHeight: "100vh",
          backgroundColor: 'lightgray',
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: 0,
          margin: 0,
          position: "relative"
        }}
      >
        <Navbar />
        <Box
          sx={{
            width: '100%',
            height: { xs: '150px', sm: '200px', md: '300px' }, // Responsive height
            backgroundImage: `url(${saladImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Container
          sx={{
            width: '90%',
            minHeight: "100%",
            py: 5,
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
            mt: -10, // overlap the background image
            zIndex: 1
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path="/searchRecipe" element={<SearchForRecipe />} />
            <Route path="/profile" element={<UserProfile />} /> {/* Add this route */}
            <Route path="/recipes" element={<SocialRecipesPage />} /> {/* Add this route */}
            <Route path="/recipes/:id" element={<RecipePage />} /> {/* Add this route */}
          </Routes>
        </Container>
        <MessageBox />
      </Box>
    </Router>
  );
}

export default App;
