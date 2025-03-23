import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditBlogDialog = ({ open, handleClose, blog, handleBlogChange, handleUpdateBlog }) => {
  const [errors, setErrors] = React.useState({
    title: '',
    hashtag: '',
    content: '',
  });

  const validateField = (name, value) => {
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      return true;
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    isValid = validateField('title', blog.title) && isValid;
    isValid = validateField('hashtag', blog.hashtag) && isValid;
    isValid = validateField('content', blog.content) && isValid;
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      handleUpdateBlog();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Blog</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={blog.title}
          onChange={handleBlogChange}
          onBlur={handleBlur}
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          margin="dense"
          label="Hashtag"
          name="hashtag"
          value={blog.hashtag}
          onChange={handleBlogChange}
          onBlur={handleBlur}
          fullWidth
          error={!!errors.hashtag}
          helperText={errors.hashtag}
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          value={blog.content}
          onChange={handleBlogChange}
          onBlur={handleBlur}
          fullWidth
          multiline
          rows={4}
          error={!!errors.content}
          helperText={errors.content}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBlogDialog;