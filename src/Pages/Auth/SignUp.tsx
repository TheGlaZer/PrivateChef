import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography, Box, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { googleLoginAPI, registerAPI } from '../../api/users';
import ImagePicker from '../../Components/ImagePicker'; // Import the ImagePicker component

function SignUp() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const serverResponse = await googleLoginAPI(response);
      const token = serverResponse.accessToken;
      localStorage.setItem('token', token);
      navigate('/searchRecipe');
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (values: any, setSubmitting: (isSubmitting: boolean) => void) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('name', values.name);

    if (values.profileImage && values.profileImage.length > 0) {
      formData.append('file', values.profileImage[0]);
    }

    try {
      const response = await registerAPI(formData);
      setSuccessMessage('Successfully signed up! Redirecting to login...');
      setSubmitting(false);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      console.error(error);
      setServerError(error.response?.data?.message || 'An error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {successMessage && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            {successMessage}
          </Alert>
        )}
        {serverError && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {serverError}
          </Alert>
        )}
        <Formik
          initialValues={{ name: '', email: '', password: '', profileImage: null }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            profileImage: Yup.mixed().nullable(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            signUp(values, setSubmitting);
          }}
        >
          {({ errors, touched, isSubmitting, isValid, setFieldValue }) => (
            <Form>
              <Field
                name="email"
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name="password"
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                autoFocus
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <ImagePicker
                name="profileImage"
                height="100px"
                width="100px"
                defaultValue={null}
                onChange={(file: FileList) => setFieldValue('profileImage', file)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !isValid}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ mt: 2 }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.error("Google login failed")}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link component="button" variant="body2" onClick={() => navigate("/login")}>
            {'Already have an account? Login'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
