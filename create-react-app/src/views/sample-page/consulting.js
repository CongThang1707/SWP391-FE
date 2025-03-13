import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createConsulting } from '../../service/consulting_service/create_consulting.js';
import { getHealthRecordByChildId } from '../../service/healthrecord_services/get_healthrecord.js';
import { getConsultingByBookingId } from '../../service/consulting_service/get_consulting.js';
import { completeBooking } from 'service/booking_services/update_booking.js';
import { getFeedbackByConsultingId } from '../../service/feedback_service/get_feedback.js';
import { createFeedback } from '../../service/feedback_service/create_feedback.js';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const ConsultingForm = () => {
  const location = useLocation();
  const { appointment: initialAppointment } = location.state || {};
  const [appointment, setAppointment] = useState(initialAppointment);
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
    <Box p={2}>
      <Typography variant="h5">Consulting Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {appointment && (
            <Box mb={2}>
              <Typography variant="h6">Appointment Details</Typography>
              <Typography variant="body1">Parent Name: {appointment.parentName}</Typography>
              <Typography variant="body1">Date: {appointment.bookDate}</Typography>
              <Typography variant="body1">Time: {appointment.scheduleWork}</Typography>
              <Typography variant="body1">Comment: {appointment.comment}</Typography>
            </Box>
          )}
          {consulting && (
            <Box>
              <Typography variant="h6">Consulting Details</Typography>
              <Typography variant="body1">Title: {consulting.title}</Typography>
              <Typography variant="body1">Comment: {consulting.comment}</Typography>
            </Box>
          )}
          {feedback && (
            <Box>
              <Typography variant="h6">Feedback</Typography>
              <Typography variant="body1">Rating: {feedback.rate}</Typography>
              <Typography variant="body1">Comment: {feedback.comment}</Typography>
            </Box>
          )}
          {!feedback && role === 'Parent' && (
            <Box mt={4}>
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Submit
                </Button>
              </form>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {healthRecords.length > 0 && (
            <Box>
              <Typography variant="h6">Health Records</Typography>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="yearSelect">
                  <strong>Select Year:</strong>{' '}
                </label>
                <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                  {[...new Set(healthRecords.map((record) => new Date(record.date).getFullYear()))]
                    .sort((a, b) => b - a) // Sắp xếp giảm dần
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
              {filteredHealthRecord.length > 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                      width={chartWidth} // Cập nhật width động
                      height={450}
                      yAxis={[
                        {
                          label: 'Health Data',
                          min: 0,
                          max: 160
                        }
                      ]}
                      sx={{
                        [`.${axisClasses.left} .${axisClasses.label}`]: {
                          transform: 'translate(-20px, 0)'
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p>No health record found for {selectedYear}.</p>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
      {showForm && (
        <form onSubmit={handleSubmitConsulting}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="dense" required />
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ConsultingForm;
