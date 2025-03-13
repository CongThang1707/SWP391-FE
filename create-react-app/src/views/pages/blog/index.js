//index.js
import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Container, Card, CardContent, Box, Button, Stack, TextField, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ThumbUp, ChatBubbleOutline, Share, ThumbUpAlt, Send, Search, Add } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import getAllBlog from '../../../service/blog_services/get_blog.js';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentInputs, setCommentInputs] = useState(Array(posts.length).fill(''));
  const [showComments, setShowComments] = useState(Array(posts.length).fill(false));
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', description: '', content: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getAllBlog(); // Gọi API lấy danh sách blog
        const formattedPosts = blogData.map((post) => ({
          avatar: post.avatar || 'https://randomuser.me/api/portraits/men/4.jpg', // Avatar người đăng
          fullName: post.fullName,
          date: post.date || new Date().toLocaleDateString(), // Ngày đăng
          title: post.title || 'Untitled Post', // Tiêu đề bài viết
          description: post.description || 'No description available', // Mô tả ngắn
          content: post.content || 'No content available', // Nội dung bài viết
          likes: post.likes || 0, // Số lượt thích
          comments: post.comments || [], // Danh sách bình luận
          shares: post.shares || 0 // Số lần chia sẻ
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

  const handleLike = (index) => {
    const newPosts = [...posts];
    newPosts[index].likes += 1;
    setPosts(newPosts);
  };

  const handleCommentToggle = (index) => {
    const newShowComments = [...showComments];
    newShowComments[index] = !newShowComments[index];
    setShowComments(newShowComments);
  };

  const handleCommentChange = (index, value) => {
    const newCommentInputs = [...commentInputs];
    newCommentInputs[index] = value;
    setCommentInputs(newCommentInputs);
  };

  const handleCommentSubmit = (index) => {
    if (commentInputs[index].trim() === '') return;

    const newComment = {
      text: commentInputs[index],
      avatar: userAvatar, 
      name: userName, 
      date: new Date().toLocaleString(), 
      likes: 0, 
      replies: [] 
    };

    const newPosts = [...posts];
    newPosts[index].comments.push(newComment);
    setPosts(newPosts);
    handleCommentChange(index, ''); 
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleShareClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleShare = (platform) => {
    if (selectedPost !== null) {
      const newPosts = [...posts];
      newPosts[selectedPost].shares += 1;
      setPosts(newPosts);

      const post = posts[selectedPost];
      const url = encodeURIComponent(`https://myblog.com/posts/${selectedPost}`);
      const text = encodeURIComponent(`${post.title} - ${post.description}`);

      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'instagram':
          alert('Instagram không hỗ trợ chia sẻ qua web, bạn có thể copy link và chia sẻ thủ công!');
          return;
        default:
          return;
      }

      window.open(shareUrl, '_blank');
    }
    handleClose();
  };

  const userAvatar = 'https://randomuser.me/api/portraits/men/4.jpg'; 
  const userName = 'John Doe'; 

  const [page, setPage] = useState(1);
  const postsPerPage = 2; 

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
    setNewPost({ title: '', description: '', content: '' });
  };

  const handleNewPostChange = (field, value) => {
    setNewPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return;

    // Kiểm tra nếu bài viết đã tồn tại (tránh trùng lặp)
    const isDuplicate = posts.some((post) => post.title === newPost.title && post.content === newPost.content);
    if (isDuplicate) return;

    const newEntry = {
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      fullName: 'John Doe',
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
      shares: 0,
      ...newPost,
    };

    setPosts([newEntry, ...posts]);
    handleCloseDialog();
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
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, cursor: 'pointer', boxShadow: 3, '&:hover': { boxShadow: 6 } }} onClick={handleOpenDialog}>
          <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" sx={{ width: 50, height: 50, mr: 2 }} />
          <TextField fullWidth placeholder="What's on your mind?" variant="outlined" onClick={handleOpenDialog} sx={{ background: '#f0f2f5', borderRadius: 2 }} />
          <Button startIcon={<Add />} sx={{ ml: 2 }} variant="contained" onClick={handleOpenDialog}>Add</Button>
        </Card>
      </Container>

      {/* Dialog for New Post */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" margin="dense" value={newPost.title} onChange={(e) => handleNewPostChange('title', e.target.value)} />
          <TextField fullWidth label="Description" margin="dense" value={newPost.description} onChange={(e) => handleNewPostChange('description', e.target.value)} />
          <TextField fullWidth label="Content" multiline rows={4} margin="dense" value={newPost.content} onChange={(e) => handleNewPostChange('content', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleAddPost} variant="contained">Post</Button>
        </DialogActions>
      </Dialog>

      {/* Blog Posts */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {currentPosts.map((post, index) => (
          <Card key={index} sx={{ mb: 4, boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 8 } }}>
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
                {post.description}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: '#444' }}>
                {post.content}
              </Typography>

              {/* Like, Comment, Share Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, color: '#555' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThumbUpAlt sx={{ color: '#1877F2' }} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {post.likes} Likes
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {post.comments.length} Comments · {post.shares} Shares
                </Typography>
              </Box>

              <Stack direction="row" justifyContent="space-around" sx={{ mt: 1, borderTop: '1px solid #ddd', pt: 1 }}>
                <Button startIcon={<ThumbUp />} onClick={() => handleLike(index)}>
                  Like
                </Button>
                <Button startIcon={<ChatBubbleOutline />} onClick={() => handleCommentToggle(index)}>
                  Comment
                </Button>
                <Button startIcon={<Share />} onClick={(event) => handleShareClick(event, index)}>
                  Share
                </Button>
              </Stack>

              {/* Comment Section */}
              {showComments[index] && (
                <Box sx={{ mt: 2, p: 2, borderTop: '1px solid #ddd' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write a comment..."
                    value={commentInputs[index]}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Button startIcon={<Send />} onClick={() => handleCommentSubmit(index)} variant="contained" size="small">
                    Post
                  </Button>

                  {/* Danh sách bình luận */}
                  {post.comments.map((comment, cIndex) => (
                    <Box key={cIndex} sx={{ display: 'flex', alignItems: 'center', mt: 2, p: 1, background: '#f0f2f5', borderRadius: 2 }}>
                      <Avatar src={comment.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {comment.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {comment.date}
                        </Typography>
                        <Typography variant="body1">{comment.text}</Typography>
                      </Box>
                    </Box>
                  ))}
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

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleShare('facebook')}>
          <Facebook sx={{ color: '#1877F2', mr: 1 }} /> Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>
          <Twitter sx={{ color: '#1DA1F2', mr: 1 }} /> Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare('linkedin')}>
          <LinkedIn sx={{ color: '#0A66C2', mr: 1 }} /> LinkedIn
        </MenuItem>
        <MenuItem onClick={() => handleShare('instagram')}>
          <Instagram sx={{ color: '#E1306C', mr: 1 }} /> Instagram
        </MenuItem>
      </Menu>

      {/* Footer */}
      <Box sx={{ background: '#f5f5f5', py: 3, textAlign: 'center', mt: 4, borderTop: '1px solid #ddd' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 My Blog. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default BlogPage;
