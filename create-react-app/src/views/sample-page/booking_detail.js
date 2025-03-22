import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../service/booking_services/get_booking.js';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CommentIcon from '@mui/icons-material/Comment';

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await getBooking(id);
      setBooking(data);
    };
    fetchBooking();
  }, [id]);

   const renderStatusChip = (status) => {
        switch (status) {
          case 'COMPLETED':
            return (
              <Chip
                icon={<CheckCircleIcon sx={{ color: '#fff' }} />}
                label="COMPLETED"
                sx={{ bgcolor: '#00e676', color: '#fff', fontWeight: 'bold' }}
              />
            );
          case 'PENDING':
            return (
              <Chip
                icon={<ReportProblemIcon sx={{ color: '#000' }} />}
                label="PENDING"
                sx={{ bgcolor: '#ffe082', color: '#000', fontWeight: 'bold' }}
              />
            );
          case 'CANCELLED':
            return (
              <Chip
                icon={<CancelIcon sx={{ color: '#000' }} />}
                label="CANCELLED"
                sx={{ bgcolor: '#e0e0e0', color: '#000', fontWeight: 'bold' }}
              />
            );
          default:
            return <Chip label={status} />;
        }
      };

  if (!booking) return <Typography variant="h6">Loading...</Typography>;

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
            📋 Booking Detail
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} /> <strong>Doctor Name:</strong> {booking.doctorName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} /> <strong>Parent Name:</strong> {booking.parentName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <ChildCareIcon sx={{ mr: 1 }} /> <strong>Children Name:</strong> {booking.childName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Schedule Work:</strong> {booking.scheduleWork}
              </Typography>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CalendarMonthIcon sx={{ mr: 1 }} /> <strong>Booking Date:</strong> {booking.bookDate}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CalendarMonthIcon sx={{ mr: 1 }} /> <strong>Schedule Date:</strong> {booking.scheduleDate}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CommentIcon sx={{ mr: 1 }} /> <strong>Comment:</strong> {booking.comment}
              </Typography>

              {/* Status */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>Status:</Typography>
                {renderStatusChip(booking.status)}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingDetail;
