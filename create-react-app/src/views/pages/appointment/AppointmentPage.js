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
  Tab,
  Chip,
  Rating,
  Snackbar,
  Alert
} from '@mui/material';
import { Edit, Cancel, EventBusy, EventNote, DoneAll, Visibility } from '@mui/icons-material';
import { getBookingByParentId } from '../../../service/booking_services/get_booking.js';
import { cancelledBooking } from '../../../service/booking_services/delete_booking.js';
import { createBooking } from '../../../service/booking_services/create_booking.js';
import { getUserByRoleId } from '../../../service/user_service/get_user.js';
import { getRatingByDoctorId } from '../../../service/feedback_service/get_feedback.js';
import { getScheduleByDoctorId } from '../../../service/schedule_services/get_schedule.js';
import { updateBooking } from '../../../service/booking_services/update_booking.js';
import { getChildrenByParentId } from '../../../service/children_services/get_children.js';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [ratings, setRatings] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [children, setChildren] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [nearestAppointment, setNearestAppointment] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
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

  useEffect(() => {
    if (appointments.length > 0) {
      findNearestAppointment();
    }
  }, [appointments]);

  useEffect(() => {
    const snackbarState = localStorage.getItem('openSnackbar');
    if (snackbarState === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('openSnackbar');
    }
  }, []);

  const fetchAppointments = async () => {
    const data = await getBookingByParentId();
    setAppointments(data);
  };

  const fetchDoctors = async () => {
    const data = await getUserByRoleId(2);
    setDoctors(data);
    const ratingsData = {};
    for (const doctor of data) {
      const rating = await getRatingByDoctorId(doctor.user_id);
      ratingsData[doctor.user_id] = rating;
    }
    setRatings(ratingsData);
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
    const membership = localStorage.getItem('membership');
    if (membership === 'Default') {
      localStorage.setItem('openSnackbar', 'true');
      navigate('/');
      return;
    }
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
      childId: selectedChild
    };

    if (currentAppointment.bookId) {
      await updateBooking({ id: currentAppointment.bookId, comment: currentAppointment.comment });
    } else {
      await createBooking(appointmentData);
    }
    fetchAppointments();
    handleCloseDialog();
  };

  const handleCancelAppointment = async (bookId, parentId) => {
    await cancelledBooking(bookId, parentId);
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

  const handleSelectChild = (child) => {
    setSelectedChild(child.childrenId);
  };

  const handleTimeChange = (time) => {
    setCurrentAppointment((prevState) => ({
      ...prevState,
      schedule: prevState.schedule === time ? '' : time
    }));
  };

  const findNearestAppointment = () => {
    const now = dayjs();
    const upcomingAppointments = appointments.filter((appointment) => {
      const appointmentDate = dayjs(appointment.scheduleDate + ' ' + appointment.scheduleWork);
      return appointmentDate.isAfter(now);
    });

    if (upcomingAppointments.length > 0) {
      const nearest = upcomingAppointments.reduce((prev, curr) => {
        const prevDate = dayjs(prev.scheduleDate + ' ' + prev.scheduleWork);
        const currDate = dayjs(curr.scheduleDate + ' ' + curr.scheduleWork);
        return currDate.isBefore(prevDate) ? curr : prev;
      });
      setNearestAppointment(nearest);
    } else {
      setNearestAppointment(null);
    }
  };

  const renderAppointments = (status) => {
    const filteredAppointments = appointments.filter((appointment) => appointment.status === status);
    const statusIcon = {
      PENDING: <EventNote color="action" />,
      COMPLETED: <DoneAll color="primary" />,
      CANCELLED: <EventBusy color="error" />
    };

    if (filteredAppointments.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            There are no appointments {status.toLowerCase()}
          </Typography>
        </Grid>
      );
    }

    return filteredAppointments.map((appointment) => (
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
            ) : status === 'PENDING' ? (
              <>
                <IconButton onClick={() => handleOpenDialog(appointment)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleCancelAppointment(appointment.bookId, appointment.parentId)}>
                  <Cancel />
                </IconButton>
              </>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderNearestAppointmentNotification = () => {
    if (!nearestAppointment) {
      return null;
    }

    const appointmentDate = dayjs(nearestAppointment.scheduleDate + ' ' + nearestAppointment.scheduleWork);
    const now = dayjs();
    const diff = appointmentDate.diff(now, 'minute');
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    const timeLeft =
      diff > 0 ? (
        <>
          Your next appointment is in <span style={{ color: 'red' }}>{hours}</span> hours and{' '}
          <span style={{ color: 'red' }}>{minutes}</span> minutes
        </>
      ) : (
        'The appointment has passed'
      );

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          {timeLeft}
        </Typography>
      </Box>
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={2} sx={{ maxWidth: 1050, margin: 'auto' }}>
      {renderNearestAppointmentNotification()}
      <Grid container alignItems="center" spacing={2} justifyContent={'space-between'}>
        <Grid item xs>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="appointment tabs">
            <Tab label="Pending" />
            <Tab label="Completed" />
            <Tab label="Cancelled" />
          </Tabs>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
            Make an appointment
          </Button>
        </Grid>
      </Grid>
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
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: 200,
                      '&:hover': {
                        boxShadow: 6
                      }
                    }}
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <img src="https://picsum.photos/100" alt={doctor.fullName} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                    <Typography variant="h6">{doctor.fullName}</Typography>
                    <Typography variant="body2">{doctor.specialty}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Rating value={ratings[doctor.user_id] || 0} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {ratings[doctor.user_id]} / 5
                      </Typography>
                    </Box>
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
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {schedule
                      .filter((s) => s.scheduleDate === selectedDate)
                      .sort((a, b) => a.scheduleTime.localeCompare(b.scheduleTime)) // Sắp xếp thời gian theo thứ tự tăng dần
                      .map((s) => (
                        <Chip
                          key={s.scheduleId}
                          label={s.scheduleTime}
                          clickable
                          color={currentAppointment?.schedule === s.scheduleId ? 'primary' : 'default'}
                          onClick={() => handleTimeChange(s.scheduleId)}
                          disabled={s.book}
                        />
                      ))}
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Select a Child
                  </Typography>
                  <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>
                    {children.map((child) => (
                      <Box
                        key={child.childrenId}
                        sx={{
                          border: selectedChild === child.childrenId ? '2px solid blue' : '1px solid #ddd',
                          boxShadow: 3,
                          p: 2,
                          m: 1,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minWidth: 200,
                          '&:hover': {
                            boxShadow: 6
                          }
                        }}
                        onClick={() => handleSelectChild(child)}
                      >
                        <Typography variant="h6">{child.childrenName}</Typography>
                      </Box>
                    ))}
                  </Box>
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          You are not a member. Please purchase a membership package.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppointmentPage;
