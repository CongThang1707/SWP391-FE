import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsultingById } from '../../service/consulting_service/get_consulting.js';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  CircularProgress
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import TitleIcon from '@mui/icons-material/Title';

const ConsultingDetail = () => {
  const { id } = useParams();
  const [consulting, setConsulting] = useState(null);

  useEffect(() => {
    const fetchConsulting = async () => {
      const data = await getConsultingById(id);
      setConsulting(data);
    };
    fetchConsulting();
  }, [id]);

  if (!consulting) return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>Loading Consulting Detail...</Typography>
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
            🩺 Consulting Detail
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <TitleIcon sx={{ mr: 1 }} /> <strong>Title:</strong> {consulting.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <CalendarMonthIcon sx={{ mr: 1 }} /> <strong>Date:</strong> {consulting.date}
              </Typography>
            </Grid>

            {/* Comment */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <CommentIcon sx={{ mr: 1 }} /> Comment:
              </Typography>
              <Typography variant="body1" sx={{ bgcolor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
                {consulting.comment}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConsultingDetail;
