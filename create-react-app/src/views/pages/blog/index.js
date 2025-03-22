//index.js
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Divider
} from '@mui/material';
import { ChatBubbleOutline, Send, Search, Add } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import getBlogs from '../../../service/blog_services/get_blog.js';
import { createBlog } from '../../../service/blog_services/post_blog.js';
import { createComment } from '../../../service/comment_services/get_comment.js';
import { getCommentByBlogId } from '../../../service/comment_services/get_comment.js';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentInputs, setCommentInputs] = useState(Array(posts.length).fill(''));
  const [showComments, setShowComments] = useState(Array(posts.length).fill(false));
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', hashtag: '', content: '' });
  const [commentsData, setCommentsData] = useState(Array(posts.length).fill([]));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogs(); // Gọi API lấy danh sách blog
        const formattedPosts = blogData.map((post) => ({
          blogId: post.blogId,
          avatar: post.avatar || 'https://randomuser.me/api/portraits/men/4.jpg', // Avatar người đăng
          fullName: post.parentId.fullName,
          date: post.date || new Date().toLocaleDateString(), // Ngày đăng
          title: post.title || 'Untitled Post', // Tiêu đề bài viết
          hashtag: post.hashtag || 'No hashtag available', // Mô tả ngắn
          content: post.content || 'No content available', // Nội dung bài viết
          comments: post.comments || [] // Danh sách bình luận
        }));

        setPosts(formattedPosts); // Cập nhật state posts
        setCommentInputs(Array(formattedPosts.length).fill('')); // Khởi tạo input cho comment
        setShowComments(Array(formattedPosts.length).fill(false)); // Khởi tạo trạng thái hiển thị comment
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  const handleCommentToggle = async (index) => {
    const newShowComments = [...showComments];
    newShowComments[index] = !newShowComments[index];
    setShowComments(newShowComments);

    if (newShowComments[index]) {
      // Luôn fetch mỗi khi mở comment (hoặc thêm flag đã fetch cũng được)
      try {
        const blogId = posts[index].blogId;
        const fetchedComments = await getCommentByBlogId(blogId);
        console.log('Fetched Comments:', fetchedComments);
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
      comment: commentInputs[index],
      avatar: userAvatar,
      name: userName,
      date: new Date().toLocaleString(),
      replies: []
    };

    try {
      const blogId = posts[index].blogId;
      const createdComment = await createComment(blogId, commentData);

      const newCommentsData = [...commentsData];
      newCommentsData[index] = [...newCommentsData[index], createdComment];
      setCommentsData(newCommentsData);
      handleCommentChange(index, '');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const userAvatar = 'https://randomuser.me/api/portraits/men/4.jpg';
  const userName = 'John Doe';

  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Lọc bài viết theo trang
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPost({ title: '', hashtag: '', content: '' });
  };

  const handleNewPostChange = (field, value) => {
    setNewPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content) return;

    try {
      const createdBlog = await createBlog(newPost);

      const newEntry = {
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        fullName: 'John Doe',
        date: new Date().toLocaleDateString(),
        comments: [],
        ...createdBlog
      };

      setPosts([newEntry, ...posts]);
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          height: '45vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #1565C0, #64B5F6)',
          color: 'white',
          textAlign: 'center',
          p: 4,
          boxShadow: 3
        }}
      >
        <Typography variant="h3" fontWeight={700} sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Welcome to Our Blog
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, maxWidth: '600px', opacity: 0.9 }}>
          Explore our latest articles on technology, design, and development.
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 3, background: 'white', borderRadius: 2, width: '50%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Add Post Section */}
      <Container maxWidth="md" sx={{ mt: 3, mb: 4 }}>
        <Card
          sx={{ display: 'flex', alignItems: 'center', p: 2, cursor: 'pointer', boxShadow: 3, '&:hover': { boxShadow: 6 } }}
          onClick={handleOpenDialog}
        >
          <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" sx={{ width: 50, height: 50, mr: 2 }} />
          <TextField
            fullWidth
            placeholder="What's on your mind?"
            variant="outlined"
            onClick={handleOpenDialog}
            inputProps={{ readOnly: true }}
            sx={{ background: '#f0f2f5', borderRadius: 2 }}
          />
          <Button startIcon={<Add />} sx={{ ml: 2 }} variant="contained" onClick={handleOpenDialog}>
            Add
          </Button>
        </Card>
      </Container>

      {/* Dialog for New Post */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={newPost.title}
            onChange={(e) => handleNewPostChange('title', e.target.value)}
          />
          <TextField
            fullWidth
            label="Hashtag"
            margin="dense"
            value={newPost.hashtag}
            onChange={(e) => handleNewPostChange('hashtag', e.target.value)}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            margin="dense"
            value={newPost.content}
            onChange={(e) => handleNewPostChange('content', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddPost} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Blog Posts */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {currentPosts.map((post, index) => (
          <Card key={post.blogId} sx={{ mb: 4, boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 8 } }}>
            <CardContent>
              {/* Avatar + Author Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={post.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {post.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.date}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" fontWeight={600} color="primary">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                {post.hashtag}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: '#444' }}>
                {post.content}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, color: '#555' }}>
                <Typography variant="body2">{commentsData[index]?.length || 0} Comments</Typography>
              </Box>

              <Stack direction="row" justifyContent="space-around" sx={{ mt: 1, borderTop: '1px solid #ddd', pt: 1 }}>
                <Button startIcon={<ChatBubbleOutline />} onClick={() => handleCommentToggle(index)}>
                  Comment
                </Button>
              </Stack>

              {/* Comment Section */}
              {showComments[index] && (
                <Box sx={{ mt: 2, p: 2, borderTop: '1px solid #ddd' }}>
                  {/* 1️⃣ - Danh sách comment từ API */}
                  {commentsData[index] && commentsData[index].length > 0 ? (
                    commentsData[index].map((comment, cIndex) => (
                      <Box key={cIndex} sx={{ display: 'flex', alignItems: 'center', mt: 2, p: 1, background: '#f0f2f5', borderRadius: 2 }}>
                        <Avatar src={comment.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {comment.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {comment.date}
                          </Typography>
                          <Typography variant="body1">{comment.comment}</Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      No comments yet.
                    </Typography>
                  )}

                  {/* 2️⃣ - Ô viết comment mới */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write a comment..."
                    value={commentInputs[index]}
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
        {/* Thanh chuyển trang */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={Math.ceil(filteredPosts.length / postsPerPage)} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ background: '#333', py: 4, color: 'white', padding: '3rem' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                About Us
              </Typography>
              <Typography variant="body2" color={'white'} fontSize={15}>
                We are a system dedicated to tracking child growth and development. Our platform helps parents and healthcare professionals
                monitor important growth metrics, ensuring children grow up healthy and strong.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={'white'} fontSize={15}>
                  Email: tienvnse183132@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalPhoneOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={'white'} fontSize={15}>
                  Phone: 094-424-6472
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={'white'} fontSize={15}>
                  Address: Thu Duc City, Ho Chi Minh City, Vietnam
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': { color: '#3b5998' }
                  }}
                  component="a"
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontSize={15} color={'white'}>
                    Facebook
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': { color: '#1DA1F2' }
                  }}
                  component="a"
                  href="https://www.twitter.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontSize={15} color={'white'}>
                    Twitter
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': { color: '#C13584' }
                  }}
                  component="a"
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontSize={15} color={'white'}>
                    Instagram
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider sx={{ borderColor: '#424242' }} />
      {/* Copyright footer */}
      <Box sx={{ background: '#333', py: 2, textAlign: 'center', color: 'white', padding: '2rem' }}>
        <Typography variant="body2" color={'white'} fontSize={15}>
          © 2025 CHILDGROWTH. CHILD DEVELOPMENT IS A TOP PRIORITY.
        </Typography>
      </Box>
    </>
  );
};

export default BlogPage;
