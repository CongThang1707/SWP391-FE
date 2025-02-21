import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, Button, TextField, Paper } from '@mui/material';

const Profile = () => {
  // Giả lập dữ liệu user từ LocalStorage
  const [user, setUser] = useState({
    userName: '',
    email: '',
    role: '',
    avatar: 'https://source.unsplash.com/150x150/?portrait' // Avatar mặc định
  });

  // Lấy thông tin user từ LocalStorage khi component mount
  useEffect(() => {
    const storedUser = {
      userName: localStorage.getItem('userName') || 'John Doe',
      email: localStorage.getItem('email') || 'johndoe@example.com',
      role: localStorage.getItem('role') || 'User'
    };
    setUser(storedUser);
  }, []);

  // Trạng thái chỉnh sửa
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  // Xử lý khi thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý lưu thông tin sau khi chỉnh sửa
  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center', borderRadius: '12px' }}>
        <Avatar src={user.avatar} sx={{ width: 100, height: 100, margin: 'auto', mb: 2, border: '3px solid #3f51b5' }} />
        <Typography variant="h5" fontWeight="bold" color="primary">
          {user.userName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
          Role: {user.role}
        </Typography>

        {editMode ? (
          <Box sx={{ mt: 3 }}>
            <TextField fullWidth label="User Name" name="userName" value={formData.userName} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="dense" />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        ) : (
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
