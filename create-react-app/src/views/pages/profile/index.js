import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, Button, TextField, Paper, Stack, MenuItem } from '@mui/material';
import { getUserById } from '../../../service/user_service/get_user.js';
import { updateUserById } from '../../../service/user_service/update_user.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';

const Profile = () => {
  const [user, setUser] = useState({});
  const [children, setChildren] = useState([]); // Lưu danh sách con cái
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(); // Lấy dữ liệu user từ API
        setUser(data);
        setFormData(data);

        // Gọi API lấy danh sách con cái theo parentId (giả sử user có user.id là parentId)
        const childrenData = await getChildrenByParentId();
        setChildren(childrenData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (window.confirm('Are you sure you want to save the changes?')) {
      try {
        await updateUserById(formData);
        setUser(formData);
        setEditMode(false);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Failed to update user profile:', error.response ? error.response.data : error.message);
        alert(`Error updating profile: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 4, textAlign: 'center', borderRadius: '12px' }}>
        <Avatar src={user.avatar} sx={{ width: 120, height: 120, margin: 'auto', mb: 2, border: '4px solid #3f51b5' }} />
        <Typography variant="h5" fontWeight="bold" color="primary">
          {user.username || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Email: {user.email || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Full Name: {user.fullName || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Phone: {user.phone || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Gender: {user.gender || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Address: {user.address || 'N/A'}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
          Role: Parent
        </Typography>

        {/* Box chứa thông tin Children */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
          {/* <Typography variant="body1" fontWeight="bold" color="primary">
            Role: Children
          </Typography> */}

          {children.length > 0 ? (
            <Stack spacing={1} sx={{ mt: 1 }}>
              {children.map((child) => (
                <Box key={child.childrenId} sx={{ p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    Name: {child.childrenName || 'N/A'}
                  </Typography>
                  <Typography variant="body2">Age: {child.age ? `${child.age} years old` : 'N/A'}</Typography>
                  <Typography variant="body2">Gender: {child.gender || 'N/A'}</Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
              No children data available
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
            Role: Children
          </Typography>
        </Box>

        {editMode ? (
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
              <MenuItem value="Male">male</MenuItem>
              <MenuItem value="Female">female</MenuItem>
            </TextField>

            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="dense" />

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Button variant="contained" sx={{ mt: 3, ':hover': { bgcolor: '#303f9f' } }} onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
