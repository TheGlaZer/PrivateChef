import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import foodImage1 from '../../assets/salad.jpg'; // Replace with actual paths to your images
import foodImage2 from '../../assets/salad.jpg';
import foodImage3 from '../../assets/salad.jpg';

export default function WelcomeLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2 }}>
        Welcome to PrivateChef
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Discover your best menu options here!
      </Typography>
      <Box sx={{ display: 'flex', mb: 4 }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/login")}>
          Log In
        </Button>
      </Box>
    </Box>
  );
}
