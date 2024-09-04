import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import foodBackground from '../../assets/food2.jpg';

export default function WelcomeLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${foodBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay effect
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          maxWidth: '600px',
          padding: '2rem',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          Welcome to PrivateChef
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Discover your best menu options here!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }} onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
          <Button variant="outlined" color="secondary" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }} onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ position: 'relative', zIndex: 2, width: '80%', mt: 5 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardMedia
              component="img"
              height="200"
              image={require('../../assets/food1.jpeg')} // Replace with your actual image path
              alt="Delicious Dish 1"
            />
            <CardContent>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Explore New Recipes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Find and create the best recipes tailored to your taste and ingredients.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardMedia
              component="img"
              height="200"
              image={require('../../assets/food2.jpg')} // Replace with your actual image path
              alt="Delicious Dish 2"
            />
            <CardContent>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Customize Your Menu
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Adjust recipes to fit your dietary needs and preferences.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardMedia
              component="img"
              height="200"
              image={require('../../assets/food3.jpg')} // Replace with your actual image path
              alt="Delicious Dish 3"
            />
            <CardContent>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Share with Friends
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Share your favorite recipes and menu ideas with other people.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
