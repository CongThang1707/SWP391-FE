import { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createUser } from '../../../../service/user_service/create_user.js';
import { useNavigate } from 'react-router-dom';

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Formik
          initialValues={{
            username: '',
            password: '',
            fullName: '',
            gender: '',
            address: ''
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('User Name is required'),
            password: Yup.string().max(255).required('Password is required'),
            fullName: Yup.string().max(255).required('Full Name is required'),
            gender: Yup.string().max(255).required('Gender is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const response = await createUser(1, values);
              console.log('Register Success:', response);
              navigate('/pages/login/login3', {
                state: { registrationSuccess: true }
              });

              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error('Register Error:', err);

              if (
                err.response &&
                err.response.status === 400 &&
                err.response.data &&
                typeof err.response.data === 'string' &&
                err.response.data.startsWith('Username:')
              ) {
                // Xử lý lỗi tên người dùng bị trùng
                setErrors({ username: err.response.data }); // Hiển thị thông báo lỗi từ API
              } else {
                // Xử lý các lỗi khác
                setErrors({ submit: err.response?.data?.message || 'Registration failed' });
              }

              if (scriptedRef.current) {
                setStatus({ success: false });
                setSubmitting(false);
              }
            }
            setSubmitting(false);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-username-register">User Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-username-register"
                  type="username"
                  value={values.username}
                  name="username"
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.fullName && errors.fullName)} sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-email-register">Full Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="fullName"
                  value={values.fullName}
                  name="fullName"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.fullName && errors.fullName && <FormHelperText error>{errors.fullName}</FormHelperText>}
              </FormControl>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.gender && errors.gender)} sx={{ mb: 2 }}>
                    <InputLabel>Gender</InputLabel>
                    <Select value={values.gender} name="gender" label="Gender" onBlur={handleBlur} onChange={handleChange}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Sign up
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/pages/register/email-register')}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              Sign up with Email
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default FirebaseRegister;
