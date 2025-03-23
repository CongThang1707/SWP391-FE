import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { getUserById } from '../../../service/user_service/get_user.js';
import { updateUserById } from '../../../service/user_service/update_user.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';
import { getCompleteBlogByParentId, deleteBlog } from '../../../service/blog_services/get_blog.js';
import updateBlog from '../../../service/blog_services/update_blog.js';
import { createBlog } from '../../../service/blog_services/post_blog.js';
import { useNavigate } from 'react-router-dom';
import { createChild, updateChild, deleteChild } from '../../../service/children_services/get_children.js';
import { getFeedbackByDoctorId } from '../../../service/feedback_service/get_feedback.js';
import UserProfile from './components/UserProfile';
import AddChildDialog from './components/AddChildDialog';
import EditChildDialog from './components/EditChildDialog';
import EditBlogDialog from './components/EditBlogDialog';
import AddBlogDialog from './components/AddBlogDialog';

const Profile = () => {
  const [user, setUser] = useState({});
  const [children, setChildren] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newChild, setNewChild] = useState({ childrenName: '', age: '', gender: '' });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingChild, setEditingChild] = useState({ childrenId: '', childrenName: '', age: '', gender: '' });
  const navigate = useNavigate();
  const [openEditBlogDialog, setOpenEditBlogDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState({ title: '', hashtag: '', content: '' });
  const [openAddBlogDialog, setOpenAddBlogDialog] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', hashtag: '', content: '' });

  const handleNavigateToChildDetail = (childId) => {
    if (!childId) {
      console.log('Error: childId is undefined or null.');
      return;
    }
    navigate(`/children/${childId}`);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const data = await getUserById();
      setUser(data);
      setFormData(data);

      const childrenData = await getChildrenByParentId();
      console.log('Children data:', childrenData);
      setChildren(childrenData);

      const blogsData = await getCompleteBlogByParentId();
      setBlogs(blogsData);

      const feedbackData = await getFeedbackByDoctorId();
      setFeedbacks(feedbackData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
      await createChild(newChild);
      await fetchUserData();
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

  const handleOpenAddBlogDialog = () => {
    setOpenAddBlogDialog(true);
  };

  const handleOpenEditBlogDialog = (blog) => {
    setEditingBlog(blog);
    setOpenEditBlogDialog(true);
  };

  const handleCloseEditBlogDialog = () => {
    setOpenEditBlogDialog(false);
    setEditingBlog({ title: '', hashtag: '', content: '' });
  };

  const handleBlogChange = (e) => {
    setEditingBlog({ ...editingBlog, [e.target.name]: e.target.value });
  };

  const handleUpdateBlog = async () => {
    const blogData = {
      title: editingBlog.title,
      hashtag: editingBlog.hashtag,
      content: editingBlog.content
    };
    try {
      await updateBlog(editingBlog.blogId, blogData);
      setBlogs(blogs.map((blog) => (blog.blogId === editingBlog.blogId ? { ...blog, ...blogData } : blog)));
      handleCloseEditBlogDialog();
      alert('Blog updated successfully!');
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog. Please try again.');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.blogId !== blogId));
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const handleCloseAddBlogDialog = () => {
    setOpenAddBlogDialog(false);
    setNewBlog({ title: '', hashtag: '', content: '' });
  };

  const handleNewBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async () => {
    const blogData = {
      title: newBlog.title,
      hashtag: newBlog.hashtag,
      content: newBlog.content
    };
    try {
      const createdBlog = await createBlog(blogData);
      setBlogs([...blogs, createdBlog]);
      handleCloseAddBlogDialog();
      alert('Blog added successfully!');
    } catch (error) {
      console.error('Failed to add blog:', error);
      alert('Failed to add blog. Please try again.');
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, width: '1050px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UserProfile
            user={user}
            editMode={editMode}
            formData={formData}
            handleChange={handleChange}
            handleSave={handleSave}
            setEditMode={setEditMode}
            blogs={blogs}
            feedbacks={feedbacks}
            handleOpenAddBlogDialog={handleOpenAddBlogDialog}
            handleOpenEditBlogDialog={handleOpenEditBlogDialog}
            handleDeleteBlog={handleDeleteBlog}
            handleNavigateToChildDetail={handleNavigateToChildDetail}
            handleOpenAddDialog={handleOpenAddDialog}
            handleOpenEditDialog={handleOpenEditDialog}
            handleDeleteChild={handleDeleteChild}
          >
            {children}
          </UserProfile>
        </Grid>
      </Grid>
      <AddChildDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        newChild={newChild}
        handleNewChildChange={handleNewChildChange}
        handleAddChild={handleAddChild}
      />
      <EditChildDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        editingChild={editingChild}
        handleEditChildChange={handleEditChildChange}
        handleUpdateChild={handleUpdateChild}
      />
      <EditBlogDialog
        open={openEditBlogDialog}
        handleClose={handleCloseEditBlogDialog}
        blog={editingBlog}
        handleBlogChange={handleBlogChange}
        handleUpdateBlog={handleUpdateBlog}
      />
      <AddBlogDialog
        open={openAddBlogDialog}
        handleClose={handleCloseAddBlogDialog}
        newBlog={newBlog}
        handleBlogChange={handleNewBlogChange}
        handleAddBlog={handleAddBlog}
      />
    </Container>
  );
};

export default Profile;
