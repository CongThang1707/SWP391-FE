import React, { useState, useEffect } from 'react';
import { getBookingByDoctorId } from '../../../service/booking_services/get_booking.js';
import { getScheduleByDoctorId } from '../../../service/schedule_services/get_schedule.js';
import { createSchedule } from '../../../service/schedule_services/create_schedule.js';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Chip
} from '@mui/material';
import { CheckCircle, EventNote, EventAvailable, EventBusy, DoneAll } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ scheduleDate: '', scheduleWork: [] });
  const [tabIndex, setTabIndex] = useState(0);
  const [timeOptions, setTimeOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    fetchSchedule();
  }, []);

  const fetchAppointments = async () => {
    const data = await getBookingByDoctorId(localStorage.getItem('userId'));
    setAppointments(data);
  };

  const fetchSchedule = async () => {
    const data = await getScheduleByDoctorId(localStorage.getItem('userId'));
    setSchedule(data);
  };

  const generateTimeOptions = (selectedDate, currentTime = null) => {
    const times = [];
    const existingTimes = schedule.filter((s) => s.scheduleDate === selectedDate).map((s) => s.scheduleTime);

    for (let hour = 8; hour <= 21; hour++) {
      const time00 = `${hour < 10 ? `0${hour}` : hour}:00`;
      const time30 = `${hour < 10 ? `0${hour}` : hour}:30`;

      times.push({ value: time00, disabled: existingTimes.includes(time00) || (currentTime && time00 < currentTime) });
      if (hour < 21) {
        times.push({ value: time30, disabled: existingTimes.includes(time30) || (currentTime && time30 < currentTime) });
      }
    }
    setTimeOptions(times);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSchedule({ scheduleDate: '', scheduleWork: [] });
  };

  const handleSaveSchedule = async () => {
    const schedules = newSchedule.scheduleWork.map((time) => ({
      scheduleDate: newSchedule.scheduleDate,
      scheduleWork: time
    }));
    await Promise.all(schedules.map((schedule) => createSchedule(schedule)));
    fetchSchedule();
    handleCloseDialog();
  };

  const handleConfirmAppointment = async (appointment) => {
    // Xử lý sự kiện khi người dùng nhấn nút Confirm
    console.log('Confirm appointment:', appointment);
    // await confirmBooking(appointment.bookId);
    // fetchAppointments();
    // Thực hiện các hành động cần thiết, ví dụ: cập nhật trạng thái cuộc hẹn
    navigate('/consulting', { state: { appointment } });
  };

  const renderAppointments = (status) => {
    const statusIcon = {
      PENDING: <EventNote color="action" />,
      CONFIRMED: <EventAvailable color="success" />,
      CANCELLED: <EventBusy color="error" />,
      COMPLETED: <DoneAll color="primary" />
    };

    return (
      <Grid container spacing={2}>
        {appointments
          .filter((appointment) => appointment.status === status)
          .map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.bookId}>
              <Card sx={{ border: '1px solid #ddd', boxShadow: 3, mb: 1 }}>
                <CardHeader avatar={statusIcon[status]} title={appointment.parentName} subheader={`Date: ${appointment.bookDate}`} />
                <CardContent>
                  <Typography variant="body2">Date: {appointment.scheduleDate}</Typography>
                  <Typography variant="body2">Time: {appointment.scheduleWork}</Typography>
                  <Typography variant="body2">Comment: {appointment.comment}</Typography>
                  <Typography variant="body2">Status: {appointment.status}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleConfirmAppointment(appointment)}>
                    <CheckCircle />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  };

  const renderSchedules = () => {
    const filteredSchedules = schedule
      .filter((s) => s.scheduleDate === selectedDate)
      .sort((a, b) => {
        const [aHour, aMinute] = a.scheduleTime.split(':').map(Number);
        const [bHour, bMinute] = b.scheduleTime.split(':').map(Number);
        return aHour * 60 + aMinute - (bHour * 60 + bMinute);
      });

    return (
      <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400, overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>IsBooked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSchedules.map((s) => (
              <TableRow key={s.scheduleId}>
                <TableCell>{s.scheduleTime}</TableCell>
                <TableCell>{s.book ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay ở định dạng YYYY-MM-DD

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setNewSchedule({ ...newSchedule, scheduleDate: selectedDate });

    if (selectedDate === today) {
      const currentTime = new Date().toTimeString().split(' ')[0].substring(0, 5); // Lấy giờ hiện tại ở định dạng HH:MM
      generateTimeOptions(selectedDate, currentTime);
    } else {
      generateTimeOptions(selectedDate);
    }
  };

  const handleTimeChange = (time) => {
    setNewSchedule((prevState) => {
      const scheduleWork = prevState.scheduleWork.includes(time)
        ? prevState.scheduleWork.filter((t) => t !== time)
        : [...prevState.scheduleWork, time];
      return { ...prevState, scheduleWork };
    });
  };

  return (
    <Box p={2} sx={{ maxWidth: 1050, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5">Appointments</Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="appointment tabs">
            <Tab label="Pending" />
            <Tab label="Completed" />
            <Tab label="Cancelled" />
          </Tabs>
          <Box mt={2}>
            {tabIndex === 0 && renderAppointments('PENDING')}
            {tabIndex === 1 && renderAppointments('COMPLETED')}
            {tabIndex === 2 && renderAppointments('CANCELLED')}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Schedule</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ mt: 2 }}>
            Create a work schedule
          </Button>
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel id="select-date-label">Select date</InputLabel>
            <Select labelId="select-date-label" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} label="Chọn ngày">
              {[...new Set(schedule.map((s) => s.scheduleDate))].map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedDate && renderSchedules()}
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create a work schedule</DialogTitle>
        <DialogContent>
          <TextField
            label="Schedule date"
            type="date"
            value={newSchedule.scheduleDate}
            onChange={handleDateChange}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              min: today // Chỉ cho phép chọn ngày từ hôm nay trở đi
            }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {timeOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.value}
                clickable
                color={newSchedule.scheduleWork.includes(option.value) ? 'primary' : 'default'}
                onClick={() => handleTimeChange(option.value)}
                disabled={option.disabled}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveSchedule} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAppointment;
