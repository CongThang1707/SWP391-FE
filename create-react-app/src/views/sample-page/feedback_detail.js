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
  CircularProgress
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
        sx={{ fontWeight: 'bold', px: 2 }}
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
    <Box sx={{ maxWidth: '1000px', margin: '50px auto', padding: '30px' }}>
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
            📝 Feedback Detail
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} /> <strong>Parent:</strong> {feedback.fullNameParent}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} /> <strong>Doctor:</strong> {feedback.fullNameDoctor}
              </Typography>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>
              {/* Rate */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>Rate:</Typography>
                {renderRateChip(feedback.rate)}
              </Box>
            </Grid>

            {/* Comment */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <CommentIcon sx={{ mr: 1 }} /> Comment:
              </Typography>
              <Typography variant="body1" sx={{ bgcolor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
                {feedback.comment}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeedBackDetail;
