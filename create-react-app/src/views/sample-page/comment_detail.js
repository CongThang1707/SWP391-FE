import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentById, approveCommentByAdmin, rejectComment, reportCommentByAdmin } from '../../service/comment_services/get_comment.js';
import { Button, Card, CardContent, Typography, Stack, Divider, Box, Chip, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CommentDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      const data = await getCommentById(id);
      setComment(data);
    };
    fetchComment();
  }, [id]);

  const handleApprove = async () => {
    if (window.confirm('Are you sure you want to approve this comment?')) {
      try {
        await approveCommentByAdmin(comment.commentId);
        alert('Comment approved successfully!');
        const updatedComment = await getCommentById(id);
        setComment(updatedComment);
      } catch (error) {
        alert('Failed to approve the comment. Please try again.');
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this comment?')) {
      try {
        await rejectComment(comment.commentId);
        alert('Comment rejected successfully!');
        const updatedComment = await getCommentById(id);
        setComment(updatedComment);
      } catch (error) {
        alert('Failed to reject the comment. Please try again.');
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm('Are you sure you want to report this comment?')) {
      try {
        await reportCommentByAdmin(comment.commentId);
        alert('Comment reported successfully!');
        const updatedComment = await getCommentById(id);
        setComment(updatedComment);
      } catch (error) {
        alert('Failed to report the comment. Please try again.');
      }
    }
  };

  const renderStatusChip = (status) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="COMPLETED"
            sx={{
              bgcolor: '#00e676',
              color: 'black',
              fontWeight: 'bold',
              px: 2,
              py: 1
            }}
          />
        );
      case 'CANCELLED':
        return (
          <Chip
            icon={<CancelIcon />}
            label="CANCELLED"
            sx={{
              bgcolor: '#e0e0e0',
              color: 'black',
              fontWeight: 'bold',
              px: 2,
              py: 1
            }}
          />
        );
      case 'PENDING':
        return (
          <Chip
            icon={<ReportProblemIcon />}
            label="PENDING"
            sx={{
              bgcolor: '#ffe082',
              color: 'black',
              fontWeight: 'bold',
              px: 2,
              py: 1
            }}
          />
        );
      default:
        return <Chip label={status} />;
    }
  };

  if (!comment) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: '1100px', margin: '50px auto', padding: '30px' }}>
      <Card
        sx={{
          boxShadow: 8,
          borderRadius: 4,
          p: 4,
          transition: '0.3s',
          '&:hover': { boxShadow: 12, transform: 'scale(1.01)' },
          background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)'
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '1.5rem' }}>
            💬 Comment Detail
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1rem' }}>
                <strong>Comment:</strong> {comment.comment}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem'
                }}
              >
                <PersonIcon sx={{ mr: 1 }} /> <strong>Parent Name: </strong> {comment.fullName}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem'
                }}
              >
                <CalendarMonthIcon sx={{ mr: 1 }} /> <strong>Date:</strong> {comment.date}
              </Typography>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>
              {/* Status */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', fontSize: '1rem' }}>
                  Status:
                </Typography>
                <Box sx={{ animation: 'fadeIn 1s' }}>{renderStatusChip(comment.status)}</Box>
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
              disabled={comment.status === 'COMPLETED' || comment.status === 'CANCELLED'}
              startIcon={<CheckCircleIcon />}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.8,
                fontWeight: 'bold',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleReject}
              disabled={comment.status === 'COMPLETED' || comment.status === 'CANCELLED'}
              startIcon={<CancelIcon />}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.8,
                fontWeight: 'bold',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Reject
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={handleReport}
              disabled={comment.status === 'CANCELLED' || comment.status === 'PENDING'}
              startIcon={<ReportProblemIcon />}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.8,
                fontWeight: 'bold',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Report
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentDetail;
