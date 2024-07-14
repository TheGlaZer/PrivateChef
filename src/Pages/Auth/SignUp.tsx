import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography, Box, Link, Alert } from '@mui/material';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleLoginAPI, registerAPI } from '../../api/users';
import { useState } from 'react';

function SignUp() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleGoogleLoginSuccess = async  (response: any) => {
    try {
      console.log(response)
      const serverResponse = await googleLoginAPI(response);
      const token = response.accessToken;
      localStorage.setItem('token', token);
      console.log(serverResponse);
    navigate('/searchRecipe');
  } catch(error) {
    console.error(error);
  };
  };

  const signUp = async (values: { email: string, password: string, name: string}, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const response = await registerAPI(values);
      console.log(response);
      setSuccessMessage('Successfully signed up! Redirecting to login...');
      setSubmitting(false);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      // Navigate to another page or show success message here
    } catch (error: any) {
      console.error(error);
      setServerError(error.response?.data?.message || 'An error occurred. Please try again.');
      setSubmitting(false);
    }
  }


  const navigate = useNavigate();

  const handleGoogleLoginFailure = () => {
    console.error("Google login failed");
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
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            signUp(values, setSubmitting);
          }}
        >
          {({ errors, touched, isSubmitting, isValid }) => (
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
            onError={handleGoogleLoginFailure}
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
};

export default SignUp;
