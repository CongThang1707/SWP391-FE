// import { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../../../../service/user_service/create_user';

const VerifyOTP = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const email = location.state?.email || '';
  console.log(email);

  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Formik
          initialValues={{
            otp: ''
          }}
          validationSchema={Yup.object().shape({
            otp: Yup.string().max(255).required('OTP is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const response = await verifyOtp(email, values.otp);
              console.log('Register Success:', response);
              navigate('/pages/login/login3');
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error('Register Error:', err);
              setErrors({ submit: err.response?.data?.message || 'Registration failed' });
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
              <FormControl fullWidth error={Boolean(touched.otp && errors.otp)} sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-username-register">OTP</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-otp-register"
                  type="otp"
                  value={values.otp}
                  name="otp"
                  label="OTP"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.otp && errors.otp && <FormHelperText error>{errors.otp}</FormHelperText>}
              </FormControl>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Confirm
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
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default VerifyOTP;
