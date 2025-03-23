import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Stack } from '@mui/material';

const UserEditForm = ({ formData, handleChange, handleSave, setEditMode }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: `${name} is required` }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
      return true;
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.fullName) {
      tempErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!formData.phone) {
      tempErrors.phone = 'Phone is required';
      isValid = false;
    }
    if (!formData.gender) {
      tempErrors.gender = 'Gender is required';
      isValid = false;
    }
    if (!formData.address) {
      tempErrors.address = 'Address is required';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSaveWithValidation = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="dense"
        error={!!errors.email}
        helperText={errors.email}
        onBlur={handleBlur}
      />
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        margin="dense"
        error={!!errors.fullName}
        helperText={errors.fullName}
        onBlur={handleBlur}
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        margin="dense"
        error={!!errors.phone}
        helperText={errors.phone}
        onBlur={handleBlur}
      />
      <TextField
        fullWidth
        select
        label="Gender"
        name="gender"
        value={formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : ''}
        onChange={handleChange}
        margin="dense"
        error={!!errors.gender}
        helperText={errors.gender}
        onBlur={handleBlur}
      >
        <MenuItem value="male">male</MenuItem>
        <MenuItem value="female">female</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="dense"
        sx={{ mt: 1 }}
        error={!!errors.address}
        helperText={errors.address}
        onBlur={handleBlur}
      />
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSaveWithValidation}>
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default UserEditForm;