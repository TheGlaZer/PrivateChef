import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import axios from 'axios';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const handleGoogleLoginSuccess = (response: any) => {
    axios.post('/server/register', { token: response.tokenId }).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  };


  const navigate = useNavigate();

  const handleGoogleLoginFailure = (response: any) => {
    console.error(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios.post('/server/register', values).then(response => {
              console.log(response);
              setSubmitting(false);
            }).catch(error => {
              console.error(error);
              setSubmitting(false);
            });
          }}
        >
          {({ errors, touched, isSubmitting, isValid }) => (
            <Form>
              <Field
                name="username"
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                autoFocus
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
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
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign Up with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
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
