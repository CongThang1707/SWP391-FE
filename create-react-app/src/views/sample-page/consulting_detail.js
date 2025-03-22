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
  CircularProgress,
  Chip,
  Paper
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import TitleIcon from '@mui/icons-material/Title';
import PersonIcon from '@mui/icons-material/Person';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

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
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3, fontSize: '1.5rem' }}
          >
            🩺 Consulting Detail
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <MedicalServicesIcon sx={{ mr: 1, color: '#1976d2' }} />
                <strong>Doctor:</strong>&nbsp; {consulting.nameDoctor}
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: '#1976d2' }} />
                <strong>Parent:</strong>&nbsp; {consulting.nameParent}
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <ChildCareIcon sx={{ mr: 1, color: '#1976d2' }} />
                <strong>Child:</strong>&nbsp; {consulting.nameChild}
              </Typography>

              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <TitleIcon sx={{ mr: 1, color: '#1976d2' }} />
                <strong>Title:</strong>&nbsp; {consulting.title}
              </Typography>

              <Chip
                icon={<CalendarMonthIcon />}
                label={`Date: ${consulting.date}`}
                color="primary"
                variant="outlined"
                sx={{ mt: 2 }}
              />
            </Grid>

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
                {consulting.comment}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConsultingDetail;
