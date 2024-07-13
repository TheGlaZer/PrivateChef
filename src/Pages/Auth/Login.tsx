import { Formik, Field, Form,  } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const handleGoogleLoginSuccess = (response: any) => {
    axios.post('/server/login', { token: response.tokenId }).then(response => {
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
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios.post('/server/login', values).then(response => {
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
            onError={() => console.log("error")}
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
