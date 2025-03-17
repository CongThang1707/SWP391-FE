import React from 'react';
import { Box, TextField, MenuItem, Button, Stack } from '@mui/material';

const UserEditForm = ({ formData, handleChange, handleSave, setEditMode }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="dense" />
      <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="dense" />
      <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="dense" />
      <TextField
        fullWidth
        select
        label="Gender"
        name="gender"
        value={formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : ''}
        onChange={handleChange}
        margin="dense"
      >
        <MenuItem value="male">male</MenuItem>
        <MenuItem value="female">female</MenuItem>
      </TextField>
      <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="dense" sx={{ mt: 1 }} />
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
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
