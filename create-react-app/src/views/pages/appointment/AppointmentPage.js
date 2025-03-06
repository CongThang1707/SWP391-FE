// // src/views/pages/appointment/AppointmentPage.js
// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   TextField
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { getBookingByParentId } from '../../../service/booking_services/get_booking.js';
// import { deleteBookingById } from '../../../service/booking_services/delete_booking.js';
// import { createBooking } from '../../../service/booking_services/create_booking.js';
// import { getUserByRoleId } from '../../../service/user_service/get_user.js';
// import { getScheduleByDoctorId } from '../../../service/schedule_services/get_schedule.js';
// import { updateBooking } from '../../../service/booking_services/update_booking.js';

// const AppointmentPage = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentAppointment, setCurrentAppointment] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [schedule, setSchedule] = useState([]);

//   useEffect(() => {
//     fetchAppointments();
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     if (currentAppointment?.doctor) {
//       fetchSchedule(currentAppointment.doctor);
//     }
//   }, [currentAppointment?.doctor]);

//   const fetchAppointments = async () => {
//     const data = await getBookingByParentId();
//     setAppointments(data);
//   };

//   const fetchDoctors = async () => {
//     const data = await getUserByRoleId(2);
//     setDoctors(data);
//   };

//   const fetchSchedule = async (doctorId) => {
//     const data = await getScheduleByDoctorId(doctorId);
//     setSchedule(data);
//   };

//   const handleOpenDialog = (appointment = null) => {
//     setCurrentAppointment(appointment);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setCurrentAppointment(null);
//     setOpenDialog(false);
//   };

//   const handleSaveAppointment = async () => {
//     const parentId = localStorage.getItem('userId'); // Lấy parentId từ local storage
//     const appointmentData = {
//       scheduleId: currentAppointment.schedule,
//       parentId: parentId,
//       comment: currentAppointment.comment
//     };

//     if (currentAppointment.bookId) {
//       await updateBooking({ id: currentAppointment.bookId, comment: currentAppointment.comment });
//     } else {
//       await createBooking(appointmentData);
//     }
//     fetchAppointments();
//     handleCloseDialog();
//   };

//   const handleDeleteAppointment = async (bookId) => {
//     await deleteBookingById(bookId);
//     fetchAppointments();
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
//         Thêm lịch hẹn
//       </Button>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Doctor</TableCell>
//             <TableCell>Time</TableCell>
//             <TableCell>Parent</TableCell>
//             <TableCell>Comment</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {appointments.map((appointment) => (
//             <TableRow key={appointment.bookId}>
//               <TableCell>{appointment.doctorName}</TableCell>
//               <TableCell>{appointment.scheduleWork}</TableCell>
//               <TableCell>{appointment.parentName}</TableCell>
//               <TableCell>{appointment.comment}</TableCell>
//               <TableCell>{appointment.bookDate}</TableCell>
//               <TableCell>{appointment.status}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => handleOpenDialog(appointment)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteAppointment(appointment.bookId)}>
//                   <Delete />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>{currentAppointment?.bookId ? 'Sửa lịch hẹn' : 'Thêm lịch hẹn'}</DialogTitle>
//         <DialogContent>
//           {!currentAppointment?.bookId && (
//             <>
//               <FormControl fullWidth margin="dense">
//                 <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
//                 <Select
//                   label="Doctor"
//                   value={currentAppointment?.doctor || ''}
//                   onChange={(e) => setCurrentAppointment({ ...currentAppointment, doctor: e.target.value })}
//                   fullWidth
//                 >
//                   {doctors.map((doctor) => (
//                     <MenuItem key={doctor.user_id} value={doctor.user_id}>
//                       {doctor.fullName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth margin="dense">
//                 <InputLabel id="demo-simple-select-label">Schedule</InputLabel>
//                 <Select
//                   label="Schedule"
//                   value={currentAppointment?.schedule || ''}
//                   onChange={(e) => setCurrentAppointment({ ...currentAppointment, schedule: e.target.value })}
//                   fullWidth
//                 >
//                   {schedule.map((schedule) => (
//                     <MenuItem key={schedule.scheduleId} value={schedule.scheduleId}>
//                       {schedule.scheduleWork}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </>
//           )}
//           <TextField
//             label="Comment"
//             value={currentAppointment?.comment || ''}
//             onChange={(e) => setCurrentAppointment({ ...currentAppointment, comment: e.target.value })}
//             fullWidth
//             multiline
//             rows={4}
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Hủy
//           </Button>
//           <Button onClick={handleSaveAppointment} color="primary">
//             Lưu
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AppointmentPage;

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
  Box
} from '@mui/material';
import { Edit, Delete, EventAvailable, EventBusy, EventNote } from '@mui/icons-material';
import { getBookingByParentId } from '../../../service/booking_services/get_booking.js';
import { deleteBookingById } from '../../../service/booking_services/delete_booking.js';
import { createBooking } from '../../../service/booking_services/create_booking.js';
import { getUserByRoleId } from '../../../service/user_service/get_user.js';
import { getScheduleByDoctorId } from '../../../service/schedule_services/get_schedule.js';
import { updateBooking } from '../../../service/booking_services/update_booking.js';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
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
      comment: currentAppointment.comment
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

  const renderAppointments = (status) => {
    const statusIcon = {
      PENDING: <EventNote color="action" />,
      CONFIRMED: <EventAvailable color="success" />,
      CANCELLED: <EventBusy color="error" />
    };

    return appointments
      .filter((appointment) => appointment.status === status)
      .map((appointment) => (
        <Grid item xs={12} sm={6} md={4} key={appointment.bookId}>
          <Card sx={{ border: '1px solid #ddd', boxShadow: 3, mb: 2 }}>
            <CardHeader avatar={statusIcon[status]} title={appointment.doctorName} subheader={`Date: ${appointment.bookDate}`} />
            <CardContent>
              <Typography variant="body2">Time: {appointment.scheduleWork}</Typography>
              <Typography variant="body2">Parent: {appointment.parentName}</Typography>
              <Typography variant="body2">Comment: {appointment.comment}</Typography>
              <Typography variant="body2">Status: {appointment.status}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleOpenDialog(appointment)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDeleteAppointment(appointment.bookId)}>
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ));
  };

  return (
    <Box p={2}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Thêm lịch hẹn
      </Button>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Pending Appointments</Typography>
        </Grid>
        {renderAppointments('PENDING')}
        <Grid item xs={12}>
          <Typography variant="h5">Confirmed Appointments</Typography>
        </Grid>
        {renderAppointments('CONFIRMED')}
        <Grid item xs={12}>
          <Typography variant="h5">Cancelled Appointments</Typography>
        </Grid>
        {renderAppointments('CANCELLED')}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentAppointment?.bookId ? 'Sửa lịch hẹn' : 'Thêm lịch hẹn'}</DialogTitle>
        <DialogContent>
          {!currentAppointment?.bookId && (
            <>
              <FormControl fullWidth margin="dense">
                <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                <Select
                  label="Doctor"
                  value={currentAppointment?.doctor || ''}
                  onChange={(e) => setCurrentAppointment({ ...currentAppointment, doctor: e.target.value })}
                  fullWidth
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.user_id} value={doctor.user_id}>
                      {doctor.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel id="demo-simple-select-label">Schedule</InputLabel>
                <Select
                  label="Schedule"
                  value={currentAppointment?.schedule || ''}
                  onChange={(e) => setCurrentAppointment({ ...currentAppointment, schedule: e.target.value })}
                  fullWidth
                >
                  {schedule.map((schedule) => (
                    <MenuItem key={schedule.scheduleId} value={schedule.scheduleId}>
                      {schedule.scheduleWork}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            Hủy
          </Button>
          <Button onClick={handleSaveAppointment} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentPage;
