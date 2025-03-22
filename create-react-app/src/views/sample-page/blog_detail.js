import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById, approveBlog, rejectBlog, checkBlogByAdmin } from '../../service/blog_services/get_blog.js';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlogById(id);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  const handleApprove = async () => {
    if (window.confirm('Are you sure you want to approve this blog?')) {
      try {
        await approveBlog(blog.blogId);
        alert('Blog approved successfully!');
        const updatedBlog = await getBlogById(id);
        setBlog(updatedBlog);
      } catch (error) {
        alert('Failed to approve the blog. Please try again.');
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this blog?')) {
      try {
        await rejectBlog(blog.blogId);
        alert('Blog rejected successfully!');
        const updatedBlog = await getBlogById(id);
        setBlog(updatedBlog);
      } catch (error) {
        alert('Failed to reject the blog. Please try again.');
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm('Are you sure you want to report this blog?')) {
      try {
        await checkBlogByAdmin(blog.blogId);
        alert('Blog reported successfully!');
        const updatedBlog = await getBlogById(id);
        setBlog(updatedBlog);
      } catch (error) {
        alert('Failed to report the blog. Please try again.');
      }
    }
  };

  const renderStatusChip = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <Chip icon={<CheckCircleIcon />} label="COMPLETED" sx={{ bgcolor: '#00e676', color: 'black', fontWeight: 'bold', px: 2, py: 1 }} />;
      case 'CANCELLED':
        return <Chip icon={<CancelIcon />} label="CANCELLED" sx={{ bgcolor: '#e0e0e0', color: 'black', fontWeight: 'bold', px: 2, py: 1 }} />;
      case 'PENDING':
        return <Chip icon={<ReportProblemIcon />} label="PENDING" sx={{ bgcolor: '#ffe082', color: 'black', fontWeight: 'bold', px: 2, py: 1 }} />;
      default:
        return <Chip label={status} />;
    }
  };

  if (!blog) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: '1100px', margin: '50px auto', padding: '30px' }}>
      <Card
        sx={{
          boxShadow: 8,
          borderRadius: 4,
          p: 4,
          transition: '0.3s',
          '&:hover': { boxShadow: 12, transform: 'scale(1.01)' },
          background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)',
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '1.5rem' }}>
            📝 Blog Detail
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold',  fontSize: '1rem' }}><strong>Title:</strong>{blog.title}</Typography>

              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                <TagIcon sx={{ mr: 1,fontSize: '1rem'}} /> <strong>Hashtag:</strong> <Box component="span" sx={{ ml: 1, bgcolor: '#1976d2', color: 'white', px: 1.5, borderRadius: 2 ,fontSize: '1rem'}}>#{blog.hashtag}</Box>
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center',fontSize: '1rem'}}>
                <PersonIcon sx={{ mr: 1 }} /> <strong>Parent Name: </strong> {blog.fullName}
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center',fontSize: '1rem'}}>
                <CalendarMonthIcon sx={{ mr: 1 }} /> <strong>Date:</strong> {blog.date}
              </Typography>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold',fontSize: '1rem' }}>Content:</Typography>
              <Typography
                variant="body2"
                sx={{
                  bgcolor: 'linear-gradient(135deg, #f9f9f9 0%, #e0e0e0 100%)',
                  p: 3,
                  borderRadius: 2,
                  minHeight: '180px',
                  color: '#333',
                  lineHeight: 1.7,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                }}
              >
                {blog.content}
              </Typography>

              {/* Status */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold',fontSize: '1rem' }}>Status:</Typography>
                <Box sx={{ animation: 'fadeIn 1s' }}>{renderStatusChip(blog.status)}</Box>
              </Box>
            </Grid>
          </Grid>

          {/* ACTIONS */}
          <Divider sx={{ my: 5 }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              disabled={blog.status === 'COMPLETED' || blog.status === 'CANCELLED'}
              startIcon={<CheckCircleIcon />}
              sx={{ borderRadius: 3, px: 5, py: 1.8, fontWeight: 'bold', '&:hover': { transform: 'scale(1.05)' } }}
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleReject}
              disabled={blog.status === 'COMPLETED' || blog.status === 'CANCELLED'}
              startIcon={<CancelIcon />}
              sx={{ borderRadius: 3, px: 5, py: 1.8, fontWeight: 'bold', '&:hover': { transform: 'scale(1.05)' } }}
            >
              Reject
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={handleReport}
              disabled={blog.status === 'CANCELLED' || blog.status === 'PENDING'}
              startIcon={<ReportProblemIcon />}
              sx={{ borderRadius: 3, px: 5, py: 1.8, fontWeight: 'bold', '&:hover': { transform: 'scale(1.05)' } }}
            >
              Report
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogDetail;
