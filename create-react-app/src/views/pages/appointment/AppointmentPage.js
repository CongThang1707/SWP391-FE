import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { Edit, Delete, EventBusy, EventNote, DoneAll, Visibility } from '@mui/icons-material';
import { getBookingByParentId } from '../../../service/booking_services/get_booking.js';
import { deleteBookingById } from '../../../service/booking_services/delete_booking.js';
import { createBooking } from '../../../service/booking_services/create_booking.js';
import { getUserByRoleId } from '../../../service/user_service/get_user.js';
import { getScheduleByDoctorId } from '../../../service/schedule_services/get_schedule.js';
import { updateBooking } from '../../../service/booking_services/update_booking.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';
import { useNavigate } from 'react-router-dom';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [children, setChildren] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchChildren();
  }, []);

  useEffect(() => {
    if (currentAppointment?.doctor) {
      fetchSchedule(currentAppointment.doctor);
    }
  }, [currentAppointment?.doctor]);

  const fetchAppointments = async () => {
    const data = await getBookingByParentId();
    setAppointments(data);
  };

  const fetchDoctors = async () => {
    const data = await getUserByRoleId(2);
    setDoctors(data);
  };

  const fetchSchedule = async (doctorId) => {
    const data = await getScheduleByDoctorId(doctorId);
    setSchedule(data);
  };

  const fetchChildren = async () => {
    const data = await getChildrenByParentId();
    setChildren(data);
  };

  const handleOpenDialog = (appointment = null) => {
    setCurrentAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setCurrentAppointment(null);
    setOpenDialog(false);
  };

  const handleSaveAppointment = async () => {
    const parentId = localStorage.getItem('userId'); // Lấy parentId từ local storage
    const appointmentData = {
      scheduleId: currentAppointment.schedule,
      parentId: parentId,
      comment: currentAppointment.comment,
      childId: currentAppointment.childId
    };

    if (currentAppointment.bookId) {
      await updateBooking({ id: currentAppointment.bookId, comment: currentAppointment.comment });
    } else {
      await createBooking(appointmentData);
    }
    fetchAppointments();
    handleCloseDialog();
  };

  const handleDeleteAppointment = async (bookId) => {
    await deleteBookingById(bookId);
    fetchAppointments();
  };

  const handleViewAndFeedback = (appointment) => {
    // Xử lý sự kiện khi người dùng nhấn nút View and Feedback
    console.log('View and Feedback:', appointment);
    navigate(`/consulting`, { state: { appointment } });
    // Thực hiện các hành động cần thiết, ví dụ: chuyển hướng đến trang chi tiết
  };

  const handleSelectDoctor = (doctor) => {
    setCurrentAppointment({ ...currentAppointment, doctor: doctor.user_id });
    setSelectedDoctor(doctor);
    setSelectedDate('');
  };

  const renderAppointments = (status) => {
    const statusIcon = {
      PENDING: <EventNote color="action" />,
      COMPLETED: <DoneAll color="primary" />,
      CANCELLED: <EventBusy color="error" />
    };

    return appointments
      .filter((appointment) => appointment.status === status)
      .map((appointment) => (
        <Grid item xs={12} sm={6} md={4} key={appointment.bookId}>
          <Card sx={{ border: '1px solid #ddd', boxShadow: 3, mb: 2 }}>
            <CardHeader avatar={statusIcon[status]} title={appointment.doctorName} subheader={`Date: ${appointment.bookDate}`} />
            <CardContent>
              <Typography variant="body2">Date: {appointment.scheduleDate}</Typography>
              <Typography variant="body2">Time: {appointment.scheduleWork}</Typography>
              <Typography variant="body2">Parent: {appointment.parentName}</Typography>
              <Typography variant="body2">Comment: {appointment.comment}</Typography>
              <Typography variant="body2">Status: {appointment.status}</Typography>
            </CardContent>
            <CardActions>
              {status === 'COMPLETED' ? (
                <IconButton onClick={() => handleViewAndFeedback(appointment)}>
                  <Visibility />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={() => handleOpenDialog(appointment)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAppointment(appointment.bookId)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      ));
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box p={2} sx={{ maxWidth: 1050, margin: 'auto' }}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Make an appointment
      </Button>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="appointment tabs" sx={{ mt: 2 }}>
        <Tab label="Pending" />
        <Tab label="Completed" />
        <Tab label="Cancelled" />
      </Tabs>
      <Grid container spacing={2} mt={2}>
        {tabIndex === 0 && renderAppointments('PENDING')}
        {tabIndex === 1 && renderAppointments('COMPLETED')}
        {tabIndex === 2 && renderAppointments('CANCELLED')}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentAppointment?.bookId ? 'Edit appointment schedule' : 'Make an appointment'}</DialogTitle>
        <DialogContent>
          {!currentAppointment?.bookId && (
            <>
              <Typography variant="h6">Select a Doctor</Typography>
              <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>
                {doctors.map((doctor) => (
                  <Box
                    key={doctor.user_id}
                    sx={{
                      border: selectedDoctor?.user_id === doctor.user_id ? '2px solid blue' : '1px solid #ddd',
                      boxShadow: 3,
                      p: 2,
                      m: 1,
                      cursor: 'pointer',
                      minWidth: 200,
                      '&:hover': {
                        boxShadow: 6
                      }
                    }}
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <Typography variant="h6">{doctor.fullName}</Typography>
                    <Typography variant="body2">{doctor.specialty}</Typography>
                  </Box>
                ))}
              </Box>
              {selectedDoctor && (
                <>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="demo-simple-select-label">Date</InputLabel>
                    <Select label="Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} fullWidth>
                      {[...new Set(schedule.map((s) => s.scheduleDate))].map((date) => (
                        <MenuItem key={date} value={date}>
                          {date}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                    <Select
                      label="Time"
                      value={currentAppointment?.schedule || ''}
                      onChange={(e) => setCurrentAppointment({ ...currentAppointment, schedule: e.target.value })}
                      fullWidth
                    >
                      {schedule
                        .filter((s) => s.scheduleDate === selectedDate)
                        .map((s) => (
                          <MenuItem key={s.scheduleId} value={s.scheduleId} disabled={s.book}>
                            {s.scheduleTime}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="demo-simple-select-label">Child</InputLabel>
                    <Select
                      label="Child"
                      value={currentAppointment?.childId || ''}
                      onChange={(e) => setCurrentAppointment({ ...currentAppointment, childId: e.target.value })}
                      fullWidth
                    >
                      {children.map((child) => (
                        <MenuItem key={child.childrenId} value={child.childrenId}>
                          {child.childrenName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </>
          )}
          <TextField
            label="Comment"
            value={currentAppointment?.comment || ''}
            onChange={(e) => setCurrentAppointment({ ...currentAppointment, comment: e.target.value })}
            fullWidth
            multiline
            rows={4}
            margin="dense"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveAppointment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentPage;
