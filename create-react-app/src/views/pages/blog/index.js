import React, { useState } from 'react';
import { Avatar, Typography, Container, Card, CardContent, Box, Button, Stack, TextField, InputAdornment } from '@mui/material';
import { ThumbUp, ChatBubbleOutline, Share, ThumbUpAlt, Send, Search } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { Pagination } from '@mui/material';


const blogPosts = [
  {
    title: 'How to Improve Your Coding Skills',
    description: 'Learn the best practices to become a better programmer and write cleaner code.',
    content: 'Coding is an essential skill in the digital age. To improve your skills, practice daily, read code from experienced developers, and work on real projects.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Avatar
    date: 'February 20, 2025', // Ngày đăng
    likes: 120,
    comments: [],
    shares: 10
  },
  {
    title: 'Top 10 JavaScript Frameworks in 2025',
    description: 'Explore the most popular JavaScript frameworks and libraries to stay ahead.',
    content: 'JavaScript frameworks evolve quickly. In 2025, the top frameworks include React, Vue, Svelte, and more, each offering unique advantages.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: 'February 18, 2025',
    likes: 250,
    comments: [],
    shares: 25
  },
  {
    title: 'Why UI/UX Design Matters',
    description: 'Discover how good design improves user experience and engagement.',
    content: 'A well-designed UI/UX improves usability, retention, and customer satisfaction, making it crucial for any product.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: 'February 15, 2025',
    likes: 180,
    comments: [],
    shares: 15
  }
];


const BlogPage = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [commentInputs, setCommentInputs] = useState(Array(posts.length).fill(""));
  const [showComments, setShowComments] = useState(Array(posts.length).fill(false));

  const filteredPosts = searchTerm
  ? posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (commentInputs[index].trim() === "") return;

    const newComment = {
      text: commentInputs[index],
      avatar: userAvatar, // Avatar của người bình luận
      name: userName, // Tên người bình luận
      date: new Date().toLocaleString(), // Ngày đăng bình luận
      likes: 0, // Thêm số lượt thích ban đầu là 0
      replies: [] // Thêm mảng phản hồi rỗng
    };

    const newPosts = [...posts];
    newPosts[index].comments.push(newComment); // Lưu bình luận vào danh sách
    setPosts(newPosts);
    handleCommentChange(index, ""); // Xóa nội dung input sau khi gửi
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
      newPosts[selectedPost].shares += 1; // Tăng số lần chia sẻ
      setPosts(newPosts);

      const post = posts[selectedPost];
      const url = encodeURIComponent(`https://myblog.com/posts/${selectedPost}`);
      const text = encodeURIComponent(`${post.title} - ${post.description}`);

      let shareUrl = "";
      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case "instagram":
          alert("Instagram không hỗ trợ chia sẻ qua web, bạn có thể copy link và chia sẻ thủ công!");
          return;
        default:
          return;
      }

      window.open(shareUrl, "_blank");
    }
    handleClose();
  };

  const userAvatar = "https://randomuser.me/api/portraits/men/4.jpg"; // Avatar của người bình luận
  const userName = "John Doe"; // Tên người dùng giả lập

  const [page, setPage] = useState(1);
  const postsPerPage = 2; // Số bài viết mỗi trang

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Lọc bài viết theo trang
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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
          boxShadow: 3,
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
            ),
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        {currentPosts.map((post, index) => (
          <Card key={index} sx={{ mb: 4, boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 8 } }}>
            <CardContent>
              {/* Avatar + Author Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={post.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>Author Name</Typography>
                  <Typography variant="body2" color="text.secondary">{post.date}</Typography>
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
                  <Typography variant="body2" sx={{ ml: 1 }}>{post.likes} Likes</Typography>
                </Box>

                <Typography variant="body2">{post.comments.length} Comments · {post.shares} Shares</Typography>
              </Box>

              <Stack direction="row" justifyContent="space-around" sx={{ mt: 1, borderTop: '1px solid #ddd', pt: 1 }}>
                <Button startIcon={<ThumbUp />} onClick={() => handleLike(index)}>Like</Button>
                <Button startIcon={<ChatBubbleOutline />} onClick={() => handleCommentToggle(index)}>Comment</Button>
                <Button startIcon={<Share />} onClick={(event) => handleShareClick(event, index)}>Share</Button>
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
                        <Typography variant="body2" fontWeight={600}>{comment.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{comment.date}</Typography>
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
        <Pagination 
          count={Math.ceil(filteredPosts.length / postsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      </Container>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleShare("facebook")}>
          <Facebook sx={{ color: "#1877F2", mr: 1 }} /> Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare("twitter")}>
          <Twitter sx={{ color: "#1DA1F2", mr: 1 }} /> Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare("linkedin")}>
          <LinkedIn sx={{ color: "#0A66C2", mr: 1 }} /> LinkedIn
        </MenuItem>
        <MenuItem onClick={() => handleShare("instagram")}>
          <Instagram sx={{ color: "#E1306C", mr: 1 }} /> Instagram
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
