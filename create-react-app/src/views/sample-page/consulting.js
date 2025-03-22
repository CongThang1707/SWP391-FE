import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getBooking } from '../../service/booking_services/get_booking.js';
import { createConsulting } from '../../service/consulting_service/create_consulting.js';
import { getHealthRecordByChildId } from '../../service/healthrecord_services/get_healthrecord.js';
import { getConsultingByBookingId } from '../../service/consulting_service/get_consulting.js';
import { completeBooking } from 'service/booking_services/update_booking.js';
import { getFeedbackByConsultingId } from '../../service/feedback_service/get_feedback.js';
import { createFeedback } from '../../service/feedback_service/create_feedback.js';
import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Card, CardHeader, CardContent, Divider, Rating, MenuItem } from '@mui/material';

const ConsultingForm = () => {
  const location = useLocation();
  const { state } = location;
  const bookId = state.bookId;
  const [appointment, setAppointment] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);
  const [consulting, setConsulting] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [newFeedback, setNewFeedback] = useState({ rate: '', comment: '' });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (appointment?.childId) {
      fetchHealthRecords(appointment.childId);
    }
    const role = localStorage.getItem('role');
    if (appointment?.status === 'PENDING' && role === 'Doctor') {
      setShowForm(true);
    } else if (appointment?.status === 'COMPLETED') {
      fetchConsultingAndFeedback(appointment);
      setShowForm(false);
    } else {
      setShowForm(false);
    }
  }, [appointment]);

  useEffect(() => {
    fetchBookedAppointment(bookId);
  }, [bookId]);
  const fetchBookedAppointment = async (bookId) => {
    try {
      const response = await getBooking(bookId);
      setAppointment(response);
      console.log('Fetched booked appointment:', response);
    } catch (error) {
      console.error('Error fetching booked appointment:', error);
    }
  };

  const fetchHealthRecords = async (childId) => {
    const data = await getHealthRecordByChildId(childId);
    setHealthRecords(data);
  };

  const fetchConsultingAndFeedback = async (appointment) => {
    try {
      const consultingData = await getConsultingByBookingId(appointment.bookId);
      if (consultingData && consultingData.length > 0) {
        setConsulting(consultingData[0]);
        const feedbackData = await getFeedbackByConsultingId(consultingData[0].consultingId);
        setFeedback(feedbackData[0]);
        console.log('Fetched consulting and feedback:', consultingData[0], feedbackData[0]);
      } else {
        console.error('No consulting data found');
      }
    } catch (error) {
      console.error('Error fetching consulting and feedback:', error);
    }
  };

  const handleSubmitConsulting = async (event) => {
    event.preventDefault();
    const requestBody = {
      title: title,
      comment: comment
    };

    try {
      const response = await createConsulting(
        appointment.doctorId,
        appointment.parentId,
        appointment.childId,
        appointment.bookId,
        requestBody
      );
      console.log('Create consulting successfully:', response);
      await completeBooking(appointment.bookId);
      console.log('Complete booking successfully');

      // Cập nhật trạng thái appointment thành COMPLETED
      setAppointment({ ...appointment, status: 'COMPLETED' });

      // Ẩn form sau khi tạo consulting thành công
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    const requestBody = {
      rate: newFeedback.rate,
      comment: newFeedback.comment
    };

    try {
      const response = await createFeedback(appointment.doctorId, appointment.parentId, consulting.consultingId, requestBody);
      console.log('Create feedback successfully:', response);
      setFeedback(response.data);
      console.log('Feedback:', response.data);
      setNewFeedback({ rate: '', comment: '' }); // Reset feedback form
      await fetchConsultingAndFeedback(appointment);

      // Ẩn form feedback sau khi tạo thành công
      setShowForm(false);
    } catch (error) {
      console.error('Error creating feedback:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const filteredHealthRecord = healthRecords.filter((record) => new Date(record.date).getFullYear() === selectedYear);

  const chartWidth = Math.max(500, Math.min(1100, filteredHealthRecord.length * 90));

  const role = localStorage.getItem('role');

  return (
    <Box p={3} sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" fontSize={28} color="primary">
        Consulting Form
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {appointment && (
            <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 3 }}>
              <CardHeader
                title="Appointment Details"
                sx={{
                  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                  color: '#fff'
                }}
              />
              <Divider />
              <CardContent>
                <Typography>
                  <strong>Parent Name:</strong> {appointment.parentName}
                </Typography>
                <Typography>
                  <strong>Date:</strong> {appointment.bookDate}
                </Typography>
                <Typography>
                  <strong>Time:</strong> {appointment.scheduleWork}
                </Typography>
                <Typography>
                  <strong>Comment:</strong> {appointment.comment}
                </Typography>
              </CardContent>
            </Card>
          )}
          {consulting && (
            <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 3 }}>
              <CardHeader
                title="Consulting Details"
                sx={{
                  background: 'linear-gradient(90deg, #388E3C 0%, #66BB6A 100%)',
                  color: '#fff'
                }}
              />{' '}
              <Divider />
              <CardContent>
                <Typography>
                  <strong>Title:</strong> {consulting.title}
                </Typography>
                <Typography>
                  <strong>Comment:</strong> {consulting.comment}
                </Typography>
              </CardContent>
            </Card>
          )}

          {feedback && (
            <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 3 }}>
              <CardHeader
                title="Feedback"
                sx={{
                  background: 'linear-gradient(90deg, #F9A825 0%, #FFD54F 100%)',
                  color: '#fff'
                }}
              />
              <Divider />
              <CardContent>
                <Typography>
                  <strong>Rating:</strong>
                </Typography>
                <Rating value={feedback.rate} readOnly />
                <Typography sx={{ mt: 1 }}>
                  <strong>Comment:</strong> {feedback.comment}
                </Typography>
              </CardContent>
            </Card>
          )}
          {!feedback && role === 'Parent' && (
            <Box border={1} borderRadius={2} p={2} mb={3}>
              <Typography variant="h6">Submit Feedback</Typography>
              <form onSubmit={handleSubmitFeedback}>
                <TextField
                  label="Rating"
                  value={newFeedback.rate}
                  type="number"
                  onChange={(e) => setNewFeedback({ ...newFeedback, rate: e.target.value })}
                  fullWidth
                  margin="dense"
                  required
                />
                <TextField
                  label="Comment"
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                  fullWidth
                  margin="dense"
                  required
                  multiline
                  rows={4}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Submit
                </Button>
              </form>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          {healthRecords.length > 0 && (
            <Box
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 3,
                p: 3,
                mb: 3
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary" fontSize={18}>
                Health Records
              </Typography>
              <Box mb={2}>
                <Typography>Select Year:</Typography>
                <TextField
                  select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: 2
                  }}
                >
                  {[...new Set(healthRecords.map((record) => new Date(record.date).getFullYear()))]
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
              {filteredHealthRecord.length > 0 ? (
                <BarChart
                  dataset={filteredHealthRecord.map((record) => ({
                    date: record.date,
                    weight: record.weight,
                    height: record.height,
                    bmi: record.bmi
                  }))}
                  xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                  series={[
                    { dataKey: 'weight', label: 'Weight (kg)' },
                    { dataKey: 'height', label: 'Height (cm)' },
                    { dataKey: 'bmi', label: 'BMI' }
                  ]}
                  width={chartWidth}
                  height={450}
                />
              ) : (
                <Typography>No health record found for {selectedYear}.</Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
      {showForm && (
        <Box
          sx={{
            backgroundColor: '#f0f7ff',
            borderRadius: 2,
            boxShadow: 3,
            p: 3,
            mb: 3
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary" fontSize={18}>
            Submit Consulting
          </Typography>
          <form onSubmit={handleSubmitConsulting}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="dense"
              required
              sx={{ borderRadius: 2, backgroundColor: '#fff' }}
            />
            <TextField
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              margin="dense"
              required
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, borderRadius: 3, py: 1.5, fontWeight: 'bold', boxShadow: 3 }}
            >
              Submit Consulting
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default ConsultingForm;
