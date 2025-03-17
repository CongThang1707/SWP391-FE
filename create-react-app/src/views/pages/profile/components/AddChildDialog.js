import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const AddChildDialog = ({ open, handleClose, newChild, handleNewChildChange, handleAddChild }) => {
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { borderRadius: 15, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}>
      <DialogTitle style={{ fontSize: '1.5rem', fontWeight: '600' }}>Add Child</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="childrenName"
          value={newChild.childrenName}
          onChange={handleNewChildChange}
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
          value={newChild.age}
          onChange={handleNewChildChange}
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
          value={newChild.gender}
          onChange={handleNewChildChange}
          margin="dense"
          variant="outlined"
          style={{ borderRadius: 10 }}
        >
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined" style={{ borderRadius: 10 }}>
          Cancel
        </Button>
        <Button onClick={handleAddChild} color="primary" variant="contained" style={{ borderRadius: 10 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChildDialog;
