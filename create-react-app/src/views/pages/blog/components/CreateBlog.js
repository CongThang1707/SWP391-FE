import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const CreateBlog = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onCreate({ title, content, likes: 0, comments: [] });
    setTitle('');
    setContent('');
    handleClose();
  };

  return (
    <div>
      <TextField placeholder="Tạo blog mới..." onFocus={handleOpen} fullWidth />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo Blog Mới</DialogTitle>
        <DialogContent>
          <TextField label="Tiêu đề" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} margin="dense" />
          <TextField
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="dense"
          />
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Đăng Blog
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBlog;
