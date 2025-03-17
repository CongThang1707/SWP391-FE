import React from 'react';
import { Box, Typography, List, Rating } from '@mui/material';

const FeedbackList = ({ feedbacks }) => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, p: 2 }}>
      <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
        Feedbacks
      </Typography>
      <List>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <Box key={feedback.feedbackId} sx={{ borderBottom: '1px solid #ddd', mb: 2, pb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  {`From: ${feedback.fullNameParent}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`To: ${feedback.fullNameDoctor}`}
                </Typography>
              </Box>
              <Rating name={`rating-${feedback.feedbackId}`} value={feedback.rate} readOnly sx={{ mt: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {feedback.comment}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
            No feedback available
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default FeedbackList;
