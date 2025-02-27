import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import Notification from './components/Notification';
import Header from './components/Header';
import Footer from './components/Footer';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const handleOpenForm = (appt = null) => {
    setSelectedAppointment(appt);
    setFormOpen(true);
  };

  const handleSaveAppointment = (appt) => {
    if (selectedAppointment) {
      setAppointments(appointments.map((a) => (a === selectedAppointment ? appt : a)));
    } else {
      setAppointments([...appointments, appt]);
    }
    setNotification('Cuộc hẹn đã được cập nhật!');
  };

  const handleDeleteAppointment = (appt) => {
    setAppointments(appointments.filter((a) => a !== appt));
    setNotification('Cuộc hẹn đã bị xóa!');
  };

  return (
    <Container>
      <Header />
      <Notification message={notification} />
      <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
        Đặt lịch hẹn mới
      </Button>
      <AppointmentList appointments={appointments} handleEdit={handleOpenForm} handleDelete={handleDeleteAppointment} />
      <AppointmentForm
        open={formOpen}
        handleClose={() => setFormOpen(false)}
        handleSave={handleSaveAppointment}
        appointment={selectedAppointment}
      />
      <Footer />
    </Container>
  );
};

export default AppointmentPage;
