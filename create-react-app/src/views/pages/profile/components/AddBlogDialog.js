import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddBlogDialog = ({ open, handleClose, newBlog, handleBlogChange, handleAddBlog }) => {
  const [errors, setErrors] = useState({
    title: '',
    hashtag: '',
    content: '',
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      hashtag: '',
      content: '',
    };

    if (!newBlog.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!newBlog.hashtag.trim()) {
      newErrors.hashtag = 'Hashtag is required';
      isValid = false;
    }

    if (!newBlog.content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddBlogWithValidation = () => {
    if (validateFields()) {
      handleAddBlog();
      setErrors({
        title: '',
        hashtag: '',
        content: '',
      }); // Reset errors after successful add
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    handleBlogChange(event); // Call the original handleBlogChange to update newBlog state

    // Validate the field immediately
    if (!value.trim()) {
      setErrors({ ...errors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
    } else {
      setErrors({ ...errors, [name]: '' }); // Clear error if field is not empty
    }
  };

  const handleBlur = (event) => {
      const { name, value } = event.target;
      if(!value.trim()) {
          setErrors({...errors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`});
      }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Blog</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={newBlog.title}
          onChange={handleFieldChange}
          onBlur={handleBlur} // Add onBlur event
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          margin="dense"
          label="Hashtag"
          name="hashtag"
          value={newBlog.hashtag}
          onChange={handleFieldChange}
          onBlur={handleBlur} // Add onBlur event
          fullWidth
          error={!!errors.hashtag}
          helperText={errors.hashtag}
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          value={newBlog.content}
          onChange={handleFieldChange}
          onBlur={handleBlur} // Add onBlur event
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
        <Button onClick={handleAddBlogWithValidation} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBlogDialog;