import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedbackById } from '../../service/feedback_service/get_feedback.js';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Grid,
  CircularProgress,
  Paper
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';

const FeedBackDetail = () => {
  const { id } = useParams();
  const [feedback, setFeedBack] = useState(null);

  useEffect(() => {
    const fetchFeedBack = async () => {
      const data = await getFeedbackById(id);
      setFeedBack(data);
    };
    fetchFeedBack();
  }, [id]);

  const renderRateChip = (rate) => {
    let color = 'default';
    if (rate >= 4) color = 'success';
    else if (rate === 3) color = 'warning';
    else color = 'error';

    return (
      <Chip
        icon={<StarIcon sx={{ color: '#fff' }} />}
        label={`${rate} / 5`}
        color={color}
        sx={{ fontWeight: 'bold', px: 2, fontSize: '1rem' }}
      />
    );
  };

  if (!feedback) return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>Loading Feedback...</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: '1000px', margin: '50px auto', padding: '20px' }}>
      <Card
        sx={{
          boxShadow: 8,
          borderRadius: 4,
          p: 4,
          transition: '0.4s',
          '&:hover': { boxShadow: 12, transform: 'scale(1.01)' },
          background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}
          >
            📝 Feedback Detail
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: '#1976d2' }} /> 
                <strong>Parent:</strong>&nbsp; {feedback.fullNameParent}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: '#1976d2' }} /> 
                <strong>Doctor:</strong>&nbsp; {feedback.fullNameDoctor}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Rate:
              </Typography>
              {renderRateChip(feedback.rate)}
            </Grid>

            {/* COMMENT */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <CommentIcon sx={{ mr: 1 }} /> Comment:
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: '#fafafa',
                  borderLeft: '6px solid #1976d2',
                  fontStyle: 'italic',
                  color: '#555'
                }}
              >
                {feedback.comment}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeedBackDetail;
