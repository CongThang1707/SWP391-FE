import { useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address or User name</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username can not be empty'),
          password: Yup.string().required('Password can not be empty')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(`http://localhost:8080/auth/login?username=${values.username}&password=${values.password}`);

            if (response.status === 200) {
              // Successful login (handle token/session storage, etc.)
              localStorage.setItem('role', response.data.roleName);
              localStorage.setItem('userId', response.data.user_id);
              console.log(response.data.roleName);
              setStatus({ success: true });
              setSubmitting(false);
              if (response.data.roleName === 'Admin') {
                navigate('/dashboard/default', { replace: true });
              } else if (response.data.roleName === 'Parent') {
                navigate('/pages/page1/homepage', { replace: true });
              } else if (response.data.roleName === 'Doctor') {
                navigate('/pages/page2/homepage', { replace: true });
              }
            }
          } catch (error) {
            // Handle login error
            let errorMessage = 'Login failed. Please try again.';
            if (error.response) {
              // Nếu API trả về lỗi (4xx/5xx)
              if (error.response.status === 400) {
                errorMessage = 'Username or password is incorrect.';
              } else if (error.response.status === 500) {
                errorMessage = 'Server error. Please try again later.';
              } else if (error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
              }
            } else if (error.request) {
              // Nếu không nhận được phản hồi từ server
              errorMessage = 'No response from server. Please try again.';
            }

            setLoginError(errorMessage);
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
            {loginError && ( // Only show error message if loginError is not null
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{loginError}</FormHelperText>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
