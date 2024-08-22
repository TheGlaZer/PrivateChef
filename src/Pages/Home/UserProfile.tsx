import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../../Providers/UserProvider'; // Import the useUser hook
import axios from 'axios';

function UserProfile() {
  const theme = useTheme();
  const { user, setUser, logout } = useUser(); // Get the user and setUser functions from the context
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.put(`/api/users/profile`, {
        fullName,
        password,
      }, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
  
      // Ensure that all required fields are provided
      if (user && user.id) {
        setUser({
          ...user,
          fullName,
        });
        setSuccessMessage('Profile updated successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage('User data is invalid. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" color={theme.palette.primary.main} gutterBottom>
          Edit Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="outlined" color="secondary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserProfile;
