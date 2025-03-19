import React from 'react';
import { Box, Typography, IconButton, Card, CardContent, Avatar, Button, Stack, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, ThumbUpAlt, ChatBubbleOutline, Share } from '@mui/icons-material';

const BlogList = ({ blogs, handleOpenAddBlogDialog, handleOpenEditBlogDialog, handleDeleteBlog }) => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" sx={{ width: 50, height: 50, mr: 2 }} />
        <TextField
          fullWidth
          placeholder="What's on your mind?"
          variant="outlined"
          onClick={handleOpenAddBlogDialog}
          inputProps={{ readOnly: true }}
          sx={{ background: '#f0f2f5', borderRadius: 2 }}
        />
      </Box>

      {blogs.length > 0 ? (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {blogs.map((blog) => (
            <Card key={blog.blogId || Math.random()} sx={{ boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 8 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={blog.avatar || 'https://randomuser.me/api/portraits/men/4.jpg'} sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" fontWeight={600}>
                      {blog.author || 'Unknown Author'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.date || new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" fontWeight={600} color="primary" sx={{ cursor: 'pointer' }}>
                  {blog.title || 'Untitled Post'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                  #{blog.hashtag || 'No hashtag available'}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, color: '#444' }}>
                  {blog.content || 'No content available'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, color: '#555' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbUpAlt sx={{ color: '#1877F2' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {blog.likes || 0} Likes
                    </Typography>
                  </Box>

                  <Typography variant="body2">
                    {blog.comments?.length || 0} Comments · {blog.shares || 0} Shares
                  </Typography>
                </Box>

                <Stack direction="row" justifyContent="space-around" sx={{ mt: 1, borderTop: '1px solid #ddd', pt: 1 }}>
                  <Button startIcon={<ThumbUpAlt />} onClick={() => console.log('Like clicked')}>
                    Like
                  </Button>
                  <Button startIcon={<ChatBubbleOutline />} onClick={() => console.log('Comment clicked')}>
                    Comment
                  </Button>
                  <Button startIcon={<Share />} onClick={() => console.log('Share clicked')}>
                    Share
                  </Button>
                  <IconButton color="primary" onClick={() => handleOpenEditBlogDialog(blog)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteBlog(blog.blogId)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
          No blog data available
        </Typography>
      )}
    </Box>
  );
};

export default BlogList;
