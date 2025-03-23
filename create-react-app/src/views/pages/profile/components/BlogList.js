import React from 'react';
import { Box, Typography, IconButton, Card, CardContent, Avatar, Button, Stack, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, ChatBubbleOutline, Send, ReportProblem } from '@mui/icons-material';

const BlogList = ({
  blogs,
  handleOpenAddBlogDialog,
  handleOpenEditBlogDialog,
  handleDeleteBlog,
  handleCommentSubmit, // New prop
  commentsData, // New prop
  handleCommentChange, // New prop
  commentInputs, // New prop
  handleCommentToggle, // New prop
  showComments,
  handleDeleteComment, // Add this prop
  handleEditComment, // Add this prop
  handleReportComment,
  handleSaveComment, // Add this prop
  editingComment,
  setEditingComment
}) => {
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
          {blogs.map((blog, index) => (
            <Card key={blog.blogId || Math.random()} sx={{ boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 8 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={blog.avatar || 'https://randomuser.me/api/portraits/men/4.jpg'} sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" fontWeight={600}>
                      {blog.fullName || 'Unknown Author'}
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

                <Box sx={{ mt: 2, color: '#555', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>

                  <Typography variant="body2">
                    {commentsData[index]?.length || 0} Comments · {blog.shares || 0} Shares
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 1, borderTop: '1px solid #ddd', pt: 1 }}
                >
                  <Button startIcon={<ChatBubbleOutline />} onClick={() => handleCommentToggle(index)}>
                    Comment
                  </Button>
                  <Box>
                    <IconButton color="primary" onClick={() => handleOpenEditBlogDialog(blog)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteBlog(blog.blogId)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Stack>
                {showComments[index] && (
                  <Box sx={{ mt: 2, p: 2, borderTop: '1px solid #ddd' }}>
                    {/* Display existing comments */}
                    {commentsData[index] && commentsData[index].length > 0 ? (
                      commentsData[index].map((comment, cIndex) => (
                        <Box
                          key={cIndex}
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                            p: 1,
                            background: '#f0f2f5',
                            borderRadius: 2
                          }}
                        >
                          <Avatar src={comment.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2" fontWeight={600}>
                              {comment.fullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {comment.date}
                            </Typography>
                            {editingComment.blogIndex === index && editingComment.commentIndex === cIndex ? (
                              <>
                                <TextField
                                  value={editingComment.comment}
                                  onChange={(e) => setEditingComment({ ...editingComment, comment: e.target.value })}
                                  fullWidth
                                />
                                <Button
                                  startIcon={<Send />}
                                  onClick={() => handleSaveComment()}
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  sx={{ mt: 1 }}
                                >
                                  Post
                                </Button>
                              </>
                            ) : (
                              <Typography variant="body1">{comment.comment}</Typography>
                            )}
                          </Box>
                          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                            {comment.parentId === localStorage.getItem('userId') && ( // Check if it's the user's comment
                              <>
                                <IconButton
                                  onClick={() => handleEditComment(index, cIndex, comment.comment)}
                                  sx={{ minWidth: 'auto', p: 0, color: 'gray', '&:hover': { color: 'blue' } }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleDeleteComment(index, cIndex)}
                                  sx={{ minWidth: 'auto', p: 0, color: 'gray', '&:hover': { color: 'red' } }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </>
                            )}
                            {comment.parentId !== localStorage.getItem('userId') && ( // Check if it's not the user's comment
                              <IconButton
                                onClick={() => handleReportComment(index, cIndex)}
                                sx={{ minWidth: 'auto', p: 0, color: 'gray', '&:hover': { color: 'yellow' } }}
                              >
                                <ReportProblem fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        No comments yet.
                      </Typography>
                    )}

                    {/* Comment input */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Write a comment..."
                      value={commentInputs[index] || ''}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                      sx={{ mt: 2 }}
                    />
                    <Button startIcon={<Send />} onClick={() => handleCommentSubmit(index)} variant="contained" size="small" sx={{ mt: 1 }}>
                      Post
                    </Button>
                  </Box>
                )}
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
