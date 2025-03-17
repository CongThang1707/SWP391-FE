import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const EditChildDialog = ({ open, handleClose, editingChild, handleEditChildChange, handleUpdateChild }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Child</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="childrenName"
          value={editingChild.childrenName}
          onChange={handleEditChildChange}
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
          style={{ borderRadius: 10 }}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={editingChild.age}
          onChange={handleEditChildChange}
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
          style={{ borderRadius: 10 }}
        />
        <TextField
          fullWidth
          select
          label="Gender"
          name="gender"
          value={editingChild.gender || ''}
          onChange={(e) => handleEditChildChange({ target: { name: 'gender', value: e.target.value.toLowerCase() } })}
          margin="dense"
          style={{ borderRadius: 10 }}
        >
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateChild} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditChildDialog;
