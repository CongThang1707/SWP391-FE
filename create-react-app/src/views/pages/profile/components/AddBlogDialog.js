import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddBlogDialog = ({ open, handleClose, newBlog, handleBlogChange, handleAddBlog }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Blog</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Title" name="title" value={newBlog.title} onChange={handleBlogChange} fullWidth />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={newBlog.description}
          onChange={handleBlogChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          value={newBlog.content}
          onChange={handleBlogChange}
          fullWidth
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddBlog} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBlogDialog;
