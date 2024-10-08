import { Formik, Field, Form,  } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography, Box, Link, Alert } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../Providers/UserProvider';

function Login() {
  const { loginUser, googleLogin } = useUser(); // Get the setUser function from the context
  const [serverError, setServerError] = useState<string | null>(null);

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      await googleLogin(response);
      navigate('/searchRecipe');
    } catch(error: any) {
      setServerError(error.response?.data?.message || 'An error occurred. Please try again.');
    };
  };

  const login = async (values: { email: string, password: string }, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      await loginUser(values)
      setSubmitting(false);
      navigate('/searchRecipe');
      // Navigate to another page or show success message here
    } catch (error: any) {
      console.error(error);
      setServerError(error.response?.data?.message || 'An error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setServerError(null); // Clear any previous errors
            login(values, setSubmitting);
          }}
        >
          {({ errors, touched, isSubmitting, isValid }) => (
            <Form >
              <Field
                name="email"
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                autoFocus
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
              {serverError && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                  {serverError}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !isValid}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ mt: 2 }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setServerError("Error logging in with google")}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link component="button" variant="body2" onClick={() => navigate("/signup")}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
