//profile
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
  Stack,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { getUserById } from '../../../service/user_service/get_user.js';
import { updateUserById } from '../../../service/user_service/update_user.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { createChild, updateChild, deleteChild } from '../../../service/children_services/get_children.js';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Profile = () => {
  const [user, setUser] = useState({});
  const [children, setChildren] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newChild, setNewChild] = useState({ childrenName: '', age: '', gender: '' });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingChild, setEditingChild] = useState({ childrenId: '', childrenName: '', age: '', gender: '' });
  const navigate = useNavigate();
  const storageRole = localStorage.getItem('role');

  const handleNavigateToChildDetail = (childId) => {
    if (!childId) {
      console.log('Error: childId is undefined or null.');
      return;
    }
    navigate(`/children/${childId}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById();
        setUser(data);
        setFormData(data);

        const childrenData = await getChildrenByParentId();
        console.log('Children data:', childrenData);
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

  const handleOpenAddDialog = () => {
    console.log('Clicked Add Button');
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewChild({ childrenName: '', age: '', gender: '' });
  };

  const handleNewChildChange = (e) => {
    setNewChild({ ...newChild, [e.target.name]: e.target.value });
  };

  const handleAddChild = async () => {
    try {
      const createdChild = await createChild(newChild);
      setChildren([...children, createdChild]); // Cập nhật danh sách con
      handleCloseAddDialog();
      alert('Child added successfully!');
    } catch (error) {
      console.error('Failed to add child:', error);
      alert('Failed to add child. Please try again.');
    }
  };

  const handleOpenEditDialog = (child) => {
    setEditingChild(child); // Lưu thông tin của child vào state
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingChild({ childrenId: '', childrenName: '', age: '', gender: '' });
  };

  const handleEditChildChange = (e) => {
    setEditingChild({ ...editingChild, [e.target.name]: e.target.value });
  };

  const handleUpdateChild = async () => {
    try {
      await updateChild(editingChild.childrenId, editingChild);

      // Cập nhật danh sách children sau khi chỉnh sửa
      setChildren(children.map((child) => (child.childrenId === editingChild.childrenId ? editingChild : child)));

      handleCloseEditDialog();
      alert('Child updated successfully!');
    } catch (error) {
      console.error('Failed to update child:', error);
      alert('Failed to update child. Please try again.');
    }
  };

  const handleDeleteChild = async (childId) => {
    if (window.confirm('Are you sure you want to delete this child?')) {
      try {
        await deleteChild(childId);
        setChildren(children.filter((child) => child.childrenId !== childId));
        alert('Child deleted successfully!');
      } catch (error) {
        console.error('Failed to delete child:', error);
        alert('Failed to delete child. Please try again.');
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
          Role: {user.roleName || 'N/A'}
        </Typography>

        {/* Divider giữa hai phần */}
        <Divider sx={{ my: 4 }} />

        {/* Box chứa thông tin Children */}
        {storageRole !== 'Doctor' && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: 2, textAlign: 'center', position: 'relative', }}>
            {/* Nút Add ở góc trên cùng bên phải */}
            <IconButton onClick={handleOpenAddDialog} sx={{ position: 'absolute', top: -20, right: 8, color: 'primary.main' }}>
              <AddIcon />
            </IconButton>

            {children.length > 0 ? (
              <Stack spacing={1} sx={{ mt: 1 }}>
                {children.map((child) => (
                  <Box
                    key={child.childrenId || Math.random()}
                    sx={{
                      p: 1,
                      border: '1px solid #ccc',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: '0.3s', // Thêm transition để làm mượt hiệu ứng
                      '&:hover': {
                        backgroundColor: '#f5f5f5', // Thay đổi màu nền khi hover
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Thêm bóng mờ
                      },

                    }}
                  >
                    {/* Thông tin con */}
                    <Box
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        width: '100%',
                      }}
                      onClick={() => handleNavigateToChildDetail(child.childrenId)}
                    >
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        Name: {child.childrenName || 'N/A'}
                      </Typography>
                      <Typography variant="body2">Age: {child.age ? `${child.age} years old` : 'N/A'}</Typography>
                      <Typography variant="body2">Gender: {child.gender || 'N/A'}</Typography>
                    </Box>

                    {/* Nút Edit & Delete */}
                    <Box>
                      <IconButton color="primary" onClick={() => handleOpenEditDialog(child)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteChild(child.childrenId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
                No children data available
              </Typography>
            )}
          </Box>
        )}
        {/* Dialog add child */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} PaperProps={{ style: { borderRadius: 15, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}>
          <DialogTitle style={{ fontSize: '1.5rem', fontWeight: '600' }}>Add Child</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="childrenName"
              value={newChild.childrenName}
              onChange={handleNewChildChange}
              margin="dense"
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
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
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> }}
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
            <Button onClick={handleCloseAddDialog} color="secondary" variant="outlined" style={{ borderRadius: 10 }}>
              Cancel
            </Button>
            <Button onClick={handleAddChild} color="primary" variant="contained" style={{ borderRadius: 10 }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog update child */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Child</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="childrenName"
              value={editingChild.childrenName}
              onChange={handleEditChildChange}
              margin="dense"
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
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
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> }}
              variant="outlined"
              style={{ borderRadius: 10 }}
            />
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={editingChild.gender || ''}
              onChange={(e) => setEditingChild({ ...editingChild, gender: e.target.value.toLowerCase() })}
              margin="dense"
              style={{ borderRadius: 10 }}
            >
              <MenuItem value="male">male</MenuItem>
              <MenuItem value="female">female</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateChild} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* edit thông tin parent */}
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
              <MenuItem value="male">male</MenuItem>
              <MenuItem value="female">female</MenuItem>
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
