import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const AddChildDialog = ({ open, handleClose, newChild, handleNewChildChange, handleAddChild }) => {
  const [errors, setErrors] = useState({
    childrenName: '',
    age: '',
    gender: '',
  });
  const [touched, setTouched] = useState({
    childrenName: false,
    age: false,
    gender: false,
  });

  useEffect(() => {
    // Clear errors when the dialog opens
    if (open) {
      setErrors({
        childrenName: '',
        age: '',
        gender: '',
      });
      setTouched({
        childrenName: false,
        age: false,
        gender: false,
      });
    }
  }, [open]);

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      childrenName: '',
      age: '',
      gender: '',
    };

    if (!newChild.childrenName) {
      newErrors.childrenName = 'Name is required';
      isValid = false;
    }

    if (!newChild.age) {
      newErrors.age = 'Age is required';
      isValid = false;
    }

    if (!newChild.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateFields()) {
      handleAddChild();
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    handleNewChildChange(event);
    setTouched({ ...touched, [name]: true });

    // Validate the field immediately
    if (!value && touched[name]) {
      setErrors({ ...errors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched({ ...touched, [name]: true });
    if (!value) {
      setErrors({ ...errors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { borderRadius: 15, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}>
      <DialogTitle style={{ fontSize: '1.5rem', fontWeight: '600' }}>Add Child</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="childrenName"
          value={newChild.childrenName}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ borderRadius: 10 }}
          error={!!errors.childrenName}
          helperText={errors.childrenName}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={newChild.age}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ borderRadius: 10 }}
          error={!!errors.age}
          helperText={errors.age}
        />
        <TextField
          fullWidth
          select
          label="Gender"
          name="gender"
          value={newChild.gender}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          margin="dense"
          variant="outlined"
          style={{ borderRadius: 10 }}
          error={!!errors.gender}
          helperText={errors.gender}
        >
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined" style={{ borderRadius: 10 }}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" style={{ borderRadius: 10 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChildDialog;