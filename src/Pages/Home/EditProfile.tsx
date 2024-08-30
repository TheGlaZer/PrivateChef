import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../../Providers/UserProvider';
import IngredientsInput from '../../Components/IngredientsInput';
import ImagePicker from '../../Components/ImagePicker'; // Import the ImagePicker component
import { serverUrl } from '../../api';

function EditProfile() {
  const theme = useTheme();
  const { user, updateUser } = useUser();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [allergies, setAllergies] = useState<string[]>(user?.allergies || []);
  const [profileImage, setProfileImage] = useState<File | null>(null); // New state for the profile image
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      console.log(JSON.stringify(allergies))
      formData.append('allergies', JSON.stringify(allergies));

      if (profileImage) {
        formData.append('file', profileImage); // Add the profile image to the form data
      }

      await updateUser(formData);
      setSuccessMessage('Profile updated successfully!');
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

          {/* ImagePicker component for selecting the profile image */}
          <ImagePicker
            name="profileImage"
            height="100px"
            width="100px"
            defaultValue={`${serverUrl}${user?.image}`}
            onChange={(files: FileList) => setProfileImage(files[0])} // Update profileImage state
          />

          <IngredientsInput
            chosenIngredients={allergies}
            setChosenIngredients={setAllergies}
            label="Manage Allergies"
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
      </Paper>
    </Container>
  );
}

export default EditProfile;
