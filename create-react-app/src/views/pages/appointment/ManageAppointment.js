import React, { useState, useEffect } from 'react';
import { getBookingByDoctorId } from '../../../service/booking_services/get_booking.js';
import { getScheduleByDoctorId } from '../../../service/schedule_services/get_schedule.js';
import { createSchedule } from '../../../service/schedule_services/create_schedule.js';
// import { confirmBooking } from '../../../service/booking_services/update_booking.js';
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
  Tab
} from '@mui/material';
import { CheckCircle, EventNote, EventAvailable, EventBusy, DoneAll } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ scheduleDate: '', scheduleWork: '' });
  const [tabIndex, setTabIndex] = useState(0);
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSchedule({ scheduleDate: '', scheduleWork: '' });
  };

  const handleSaveSchedule = async () => {
    await createSchedule(newSchedule);
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
              <Card sx={{ border: '1px solid #ddd', boxShadow: 3, mb: 1, ml: 2 }}>
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
    const filteredSchedules = schedule.filter((s) => s.scheduleDate === selectedDate);
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Giờ</TableCell>
              <TableCell>Đã đặt</TableCell>
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

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5">Appointments</Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="appointment tabs">
            <Tab label="Pending" />
            <Tab label="Confirmed" />
            <Tab label="Cancelled" />
            <Tab label="Completed" />
          </Tabs>
          <Box mt={2}>
            {tabIndex === 0 && renderAppointments('PENDING')}
            {tabIndex === 1 && renderAppointments('CONFIRMED')}
            {tabIndex === 2 && renderAppointments('CANCELLED')}
            {tabIndex === 3 && renderAppointments('COMPLETED')}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Schedule</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ mt: 2 }}>
            Tạo lịch làm việc
          </Button>
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel id="select-date-label">Chọn ngày</InputLabel>
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
        <DialogTitle>Tạo lịch làm việc</DialogTitle>
        <DialogContent>
          <TextField
            label="Ngày làm việc"
            type="date"
            value={newSchedule.scheduleDate}
            onChange={(e) => setNewSchedule({ ...newSchedule, scheduleDate: e.target.value })}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Giờ làm việc"
            type="time"
            value={newSchedule.scheduleWork}
            onChange={(e) => setNewSchedule({ ...newSchedule, scheduleWork: e.target.value })}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSaveSchedule} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAppointment;
