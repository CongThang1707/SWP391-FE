import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditBlogDialog = ({ open, handleClose, blog, handleBlogChange, handleUpdateBlog }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Blog</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Title" name="title" value={blog.title} onChange={handleBlogChange} fullWidth />
        <TextField margin="dense" label="Hashtag" name="hashtag" value={blog.hashtag} onChange={handleBlogChange} fullWidth />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          value={blog.content}
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
        <Button onClick={handleUpdateBlog} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBlogDialog;
