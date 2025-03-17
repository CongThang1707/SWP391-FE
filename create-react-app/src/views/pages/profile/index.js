//profile
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Stack,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { getUserById } from '../../../service/user_service/get_user.js';
import { updateUserById } from '../../../service/user_service/update_user.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { createChild, updateChild, deleteChild } from '../../../service/children_services/get_children.js';
import { createBlog } from '../../../service/blog_services/post_blog.js';
import { getBlogByUserId } from '../../../service/blog_services/get_blog.js';
import { deleteBlogByUser } from '../../../service/blog_services/get_blog.js';
import { updateBlog } from '../../../service/blog_services/get_blog.js';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Profile = () => {
  const [user, setUser] = useState({});
  const [children, setChildren] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newChild, setNewChild] = useState({ childrenName: '', age: '', gender: '' });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingChild, setEditingChild] = useState({ childrenId: '', childrenName: '', age: '', gender: '' });
  const navigate = useNavigate();
  const storageRole = localStorage.getItem('role');
  const [editingBlog, setEditingBlog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleNavigateToChildDetail = (childId) => {
    if (!childId) {
      console.log('Error: childId is undefined or null.');
      return;
    }
    navigate(`/children/${childId}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById();
        setUser(data);
        setFormData(data);
        const childrenData = await getChildrenByParentId();
        setChildren(childrenData);
        const blogData = await getBlogByUserId();
        setBlogs(blogData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (editingBlog) {
      console.log("Current Blog Data:", editingBlog);
    }
  }, [editingBlog]);

  const handleOpenBlogDialog = () => {
    setOpenBlogDialog(true);
  };

  const handleCloseBlogDialog = () => {
    setOpenBlogDialog(false);
  };

  const handleBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCreateBlog = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      const createdBlog = await createBlog(newBlog);
      setBlogs([...blogs, createdBlog]);
      setOpenBlogDialog(false);
      setNewBlog({ title: '', content: '' });
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog. Please try again.');
    }
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
      setChildren([...children, createdChild]);
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

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="sm">
      {/* User profile*/}
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

      {/* children profile*/}
      {storageRole !== 'Doctor' && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: 2, textAlign: 'center', position: 'relative' }}>
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
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }
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
                      width: '100%'
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

          {/* Blog profile*/}
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: 2, textAlign: 'center', position: 'relative' }}>
            <IconButton onClick={handleOpenBlogDialog} sx={{ position: 'absolute', top: -20, right: 8, color: 'primary.main' }}>
              <AddIcon />
            </IconButton>
            {blogs.length > 0 ? (
              <Stack spacing={2} sx={{ mt: 2 }}>
                {blogs.map((blog) => (
                  <Box key={blog.blogId} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {blog.title || 'No Title'}
                    </Typography>
                    <Typography variant="body2">{blog.description || 'No Description'}</Typography>
                    <Typography variant="body2">{blog.content || 'No Content'}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton color="primary" onClick={() => handleEditBlog(blog)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this blog?')) {
                            const result = await deleteBlogByUser(blog.blogId);
                            if (result) {
                              setBlogs((prevBlogs) => prevBlogs.filter((b) => b.blogId !== blog.blogId));
                            }
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
                No blogs available
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {/* Dialog add child */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        PaperProps={{ style: { borderRadius: 15, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}
      >
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
              startAdornment:
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
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
              startAdornment:
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
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
            InputProps={{
              startAdornment:
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
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
              startAdornment:
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
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
      {/* Dialog create blog */}
      <Dialog
        open={openBlogDialog}
        onClose={handleCloseBlogDialog}
        PaperProps={{ style: { borderRadius: 15, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}
      >
        <DialogTitle style={{ fontSize: '1.5rem', fontWeight: '600' }}>Create Blog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
            margin="dense"
            variant="outlined"
            style={{ borderRadius: 10 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newBlog.description}
            onChange={handleBlogChange}
            margin="dense"
            variant="outlined"
            style={{ borderRadius: 10 }}
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={newBlog.content}
            onChange={handleBlogChange}
            margin="dense"
            variant="outlined"
            style={{ borderRadius: 10 }}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBlogDialog} color="secondary" variant="outlined" style={{ borderRadius: 10 }}>
            Cancel
          </Button>
          <Button onClick={handleCreateBlog} color="primary" variant="contained" style={{ borderRadius: 10 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog update blog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={editingBlog?.title || ''}
            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={editingBlog?.description || ''}
            onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
            margin="dense"
            multiline
          />
          <TextField
            label="Content"
            fullWidth
            name="content"
            value={editingBlog?.content || ''}
            onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
            margin="dense"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              try {
                await updateBlog(editingBlog.blogId, editingBlog);
                setBlogs(blogs.map((b) => (b.blogId === editingBlog.blogId ? editingBlog : b)));
                setOpenDialog(false);
                alert("Blog updated successfully!");
              } catch (error) {
                console.error("Failed to update blog:", error);
                alert("Failed to update blog. Please try again.");
              }
            }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
