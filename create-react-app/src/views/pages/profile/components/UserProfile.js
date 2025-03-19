import React, { useMemo } from 'react';
import { Avatar, Typography, Button, Box, Grid, Rating } from '@mui/material';
import UserInfo from './UserInfo';
import UserEditForm from './UserEditForm';
import BlogList from './BlogList';
import FeedbackList from './FeedbackList';

const UserProfile = ({
  user,
  editMode,
  formData,
  handleChange,
  handleSave,
  setEditMode,
  blogs,
  handleNavigateToBlogDetail,
  handleOpenAddBlogDialog,
  handleOpenEditBlogDialog,
  handleDeleteBlog,
  children,
  feedbacks,
  handleNavigateToChildDetail,
  handleOpenAddDialog,
  handleOpenEditDialog,
  handleDeleteChild
}) => {
  const role = localStorage.getItem('role');
  const averageRating = useMemo(() => {
    if (feedbacks.length === 0) return 0;
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rate, 0);
    return totalRating / feedbacks.length;
  }, [feedbacks]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={user.avatar} sx={{ width: 120, height: 120, mr: 2, border: '4px solid #3f51b5' }} />
          <Box>
            <Typography variant="h1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {user.fullName || 'N/A'}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
              {user.roleName || 'N/A'}
            </Typography>
            {role === 'Doctor' && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, width: 'fit-content' }}>
                <Rating value={averageRating} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {averageRating.toFixed(1)} / 5
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {!editMode && (
          <Button variant="contained" sx={{ ':hover': { bgcolor: '#303f9f' } }} onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UserInfo
            user={user}
            handleNavigateToChildDetail={handleNavigateToChildDetail}
            handleOpenAddDialog={handleOpenAddDialog}
            handleOpenEditDialog={handleOpenEditDialog}
            handleDeleteChild={handleDeleteChild}
          >
            {children}
          </UserInfo>
        </Grid>
        {role !== 'Doctor' && (
          <Grid item xs={12} md={8}>
            <BlogList
              blogs={blogs}
              handleNavigateToBlogDetail={handleNavigateToBlogDetail}
              handleOpenAddBlogDialog={handleOpenAddBlogDialog}
              handleOpenEditBlogDialog={handleOpenEditBlogDialog}
              handleDeleteBlog={handleDeleteBlog}
            />
          </Grid>
        )}
        {role !== 'Parent' && (
          <Grid item xs={12} md={8}>
            <FeedbackList feedbacks={feedbacks} />
          </Grid>
        )}
      </Grid>

      {editMode && <UserEditForm formData={formData} handleChange={handleChange} handleSave={handleSave} setEditMode={setEditMode} />}
    </>
  );
};

export default UserProfile;
