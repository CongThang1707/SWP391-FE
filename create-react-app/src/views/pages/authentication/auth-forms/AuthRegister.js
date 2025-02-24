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

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
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

  const googleHandler = async () => {
    console.error('Register');
  };

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
            email: '',
            fullName: '',
            gender: '',
            phone: '',
            rate: 5,
            address: ''
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('User Name is required'),
            password: Yup.string().max(255).required('Password is required'),
            fullName: Yup.string().max(255).required('Full Name is required'),
            gender: Yup.string().max(255).required('Gender is required'),
            phone: Yup.string().max(255).required('Phone is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const response = await createUser(1, values);
              console.log('Register Success:', response.data);
              navigate('/pages/login/login3');
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error('Register Error:', error);
              setErrors({ submit: error.response?.data?.message || 'Registration failed' });
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
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
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.gender && errors.gender)} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-gender-register">Gender</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-gender-register"
                      type="gender"
                      value={values.gender}
                      name="gender"
                      label="Gender"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.gender && errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-phone-register">Phone</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-phone-register"
                      type="phone"
                      value={values.phone}
                      name="phone"
                      label="Phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
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
              onClick={googleHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </>
  );
};

export default FirebaseRegister;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
// import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { createUser } from '../../../../service/user_service/create_user.js';

// const FirebaseRegister = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   return (
//     <Grid container direction="column" justifyContent="center">
//       <Formik
//         initialValues={{
//           username: '',
//           password: '',
//           fullName: '',
//           gender: '',
//           phone: ''
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().required('User Name is required'),
//           password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//           fullName: Yup.string().required('Full Name is required'),
//           gender: Yup.string().required('Gender is required'),
//           phone: Yup.string().required('Phone is required')
//         })}
//         onSubmit={async (values, { setErrors, setSubmitting }) => {
//           try {
//             const response = await createUser(1, values);
//             console.log('Register Success:', response.data);

//             // Chuyển hướng sau khi đăng ký thành công
//             navigate('/login');
//           } catch (error) {
//             console.error('Register Error:', error);
//             setErrors({ submit: error.response?.data?.message || 'Registration failed' });
//           }
//           setSubmitting(false);
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ mb: 2, ...theme.typography.customInput }}>
//               <InputLabel>User Name</InputLabel>
//               <OutlinedInput type="text" value={values.username} name="username" onBlur={handleBlur} onChange={handleChange} />
//               {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mb: 2, ...theme.typography.customInput }}>
//               <InputLabel>Password</InputLabel>
//               <OutlinedInput
//                 type={showPassword ? 'text' : 'password'}
//                 value={values.password}
//                 name="password"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//               {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.fullName && errors.fullName)} sx={{ mb: 2, ...theme.typography.customInput }}>
//               <InputLabel>Full Name</InputLabel>
//               <OutlinedInput type="text" value={values.fullName} name="fullName" onBlur={handleBlur} onChange={handleChange} />
//               {touched.fullName && errors.fullName && <FormHelperText error>{errors.fullName}</FormHelperText>}
//             </FormControl>

//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth error={Boolean(touched.gender && errors.gender)} sx={{ mb: 2, ...theme.typography.customInput }}>
//                   <InputLabel>Gender</InputLabel>
//                   <OutlinedInput type="text" value={values.gender} name="gender" onBlur={handleBlur} onChange={handleChange} />
//                   {touched.gender && errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ mb: 2, ...theme.typography.customInput }}>
//                   <InputLabel>Phone</InputLabel>
//                   <OutlinedInput type="text" value={values.phone} name="phone" onBlur={handleBlur} onChange={handleChange} />
//                   {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
//                 </FormControl>
//               </Grid>
//             </Grid>

//             {errors.submit && (
//               <FormHelperText error sx={{ textAlign: 'center', mb: 2 }}>
//                 {errors.submit}
//               </FormHelperText>
//             )}

//             <Button type="submit" variant="contained" color="secondary" fullWidth disabled={isSubmitting}>
//               {isSubmitting ? 'Registering...' : 'Sign Up'}
//             </Button>
//           </form>
//         )}
//       </Formik>
//     </Grid>
//   );
// };

// export default FirebaseRegister;
