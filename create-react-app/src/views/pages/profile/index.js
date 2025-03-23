import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { getUserById } from '../../../service/user_service/get_user.js';
import { updateUserById } from '../../../service/user_service/update_user.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';
import { getCompleteBlogByParentId, deleteSoft } from '../../../service/blog_services/get_blog.js';
import updateBlog from '../../../service/blog_services/update_blog.js';
import { createBlog } from '../../../service/blog_services/post_blog.js';
import { useNavigate } from 'react-router-dom';
import { createChild, updateChild, deleteChild } from '../../../service/children_services/get_children.js';
import { getFeedbackByDoctorId } from '../../../service/feedback_service/get_feedback.js';
import {
  createComment,
  getCommentByBlogId,
  updateComment,
  deleteCommentByAdmin,
  reportByUser
} from '../../../service/comment_services/get_comment.js';
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
  const [commentsData, setCommentsData] = useState([]);
  const [commentInputs, setCommentInputs] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [editingComment, setEditingComment] = useState({
    blogIndex: null,
    commentIndex: null,
    comment: ''
  });

  const handleEditComment = (blogIndex, commentIndex, currentComment) => {
    setEditingComment({
      blogIndex,
      commentIndex,
      comment: currentComment
    });
  };

  const handleSaveComment = async () => {
    if (editingComment.blogIndex === null || editingComment.commentIndex === null) return;
    if (window.confirm('Are you sure you want to update this comment?')) {

    try {
      const commentId = commentsData[editingComment.blogIndex][editingComment.commentIndex].commentId;
      console.log(commentId);
      console.log(editingComment.comment);
      await updateComment(commentId, editingComment.comment);

      // Update the commentsData state
      const updatedComments = await getCommentByBlogId(blogs[editingComment.blogIndex].blogId);
      const newCommentsData = [...commentsData];
      newCommentsData[editingComment.blogIndex] = updatedComments;
      setCommentsData(newCommentsData);

      // Reset the editingComment state
      setEditingComment({ blogIndex: null, commentIndex: null, comment: '' });
      alert('Comment updated successfully!');
    } catch (error) {
      console.error('Failed to update comment:', error);
      alert('Failed to update comment. Please try again.');
    }
  }
  };

  const handleDeleteComment = async (blogIndex, commentIndex) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {

    try {
      await deleteCommentByAdmin(commentsData[blogIndex][commentIndex].commentId);
      const updatedComments = await getCommentByBlogId(blogs[blogIndex].blogId);
      const newCommentsData = [...commentsData];
      newCommentsData[blogIndex] = updatedComments;
      setCommentsData(newCommentsData);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }
  };

  const handleReportComment = async (blogIndex, commentIndex) => {
    if (window.confirm('Are you sure you want to report this comment?')) {
    try {
      await reportByUser(commentsData[blogIndex][commentIndex].commentId);
      alert('Comment reported successfully!');
      const updatedComments = await getCommentByBlogId(blogs[blogIndex].blogId);
      const newCommentsData = [...commentsData];
      newCommentsData[blogIndex] = updatedComments;
      setCommentsData(newCommentsData);
    } catch (error) {
      console.error('Error reporting comment:', error);
    }
  }
  };

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

      const initialCommentsData = await Promise.all(
        blogsData.map(async (blog) => {
          const comments = await getCommentByBlogId(blog.blogId);
          return comments;
        })
      );
      setCommentsData(initialCommentsData);
      setCommentInputs(Array(blogsData.length).fill(''));
      setShowComments(Array(blogsData.length).fill(false));

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
    if (window.confirm('Are you sure you want to add this child?')) {
      try {
        await createChild(newChild);
        await fetchUserData();
        handleCloseAddDialog();
        alert('Child added successfully!');
      } catch (error) {
        console.error('Failed to add child:', error);
        alert('Failed to add child. Please try again.');
      }
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
    if (window.confirm('Are you sure you want to update this child?')) {
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
    if (window.confirm('Are you sure you want to update this blog?')) {

    try {
      await updateBlog(editingBlog.blogId, blogData);
      setBlogs(blogs.map((blog) => (blog.blogId === editingBlog.blogId ? { ...blog, ...blogData } : blog)));
      handleCloseEditBlogDialog();
      alert('Blog updated successfully!');
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog. Please try again.');
    }
  }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
    try {
      await deleteSoft(blogId);
      setBlogs(blogs.filter((blog) => blog.blogId !== blogId));
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
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
    if (window.confirm('Are you sure you want to create this blog?')) {
      try {
        const createdBlog = await createBlog(blogData);
        setBlogs([...blogs, createdBlog]);
        handleCloseAddBlogDialog();
        alert('Blog added successfully!');
      } catch (error) {
        console.error('Failed to add blog:', error);
        alert('Failed to add blog. Please try again.');
      }
    }
  };

  const handleCommentToggle = async (index) => {
    const newShowComments = [...showComments];
    newShowComments[index] = !newShowComments[index];
    setShowComments(newShowComments);
    if (newShowComments[index]) {
      try {
        const blogId = blogs[index].blogId;
        const fetchedComments = await getCommentByBlogId(blogId);
        const newCommentsData = [...commentsData];
        newCommentsData[index] = fetchedComments;
        setCommentsData(newCommentsData);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }
  };

  const handleCommentChange = (index, value) => {
    const newCommentInputs = [...commentInputs];
    newCommentInputs[index] = value;
    setCommentInputs(newCommentInputs);
  };

  const handleCommentSubmit = async (index) => {
    if (commentInputs[index].trim() === '') return;

    const commentData = {
      comment: commentInputs[index]
    };

    try {
      const blogId = blogs[index].blogId;
      await createComment(blogId, commentData);
      const fetchedComments = await getCommentByBlogId(blogId);
      const newCommentsData = [...commentsData];
      newCommentsData[index] = fetchedComments;
      setCommentsData(newCommentsData);
      handleCommentChange(index, '');
    } catch (error) {
      console.error('Failed to post comment:', error);
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
            commentsData={commentsData} // Pass commentsData
            handleCommentSubmit={handleCommentSubmit} // Pass handleCommentSubmit
            handleCommentChange={handleCommentChange} // Pass handleCommentChange
            commentInputs={commentInputs} // Pass commentInputs
            handleCommentToggle={handleCommentToggle} // Pass handleCommentToggle
            showComments={showComments}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleSaveComment={handleSaveComment}
            handleReportComment={handleReportComment}
            editingComment={editingComment}
            setEditingComment={setEditingComment}
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
