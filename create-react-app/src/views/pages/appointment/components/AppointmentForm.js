import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';

const AppointmentForm = ({ open, handleClose, handleSave, appointment }) => {
  const [formData, setFormData] = useState(appointment || { doctor: '', date: '', time: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.doctor || !formData.date || !formData.time) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{appointment ? 'Chỉnh sửa cuộc hẹn' : 'Tạo cuộc hẹn mới'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Bác sĩ" name="doctor" value={formData.doctor} onChange={handleChange} fullWidth margin="dense" />
        <TextField type="date" name="date" value={formData.date} onChange={handleChange} fullWidth margin="dense" />
        <TextField type="time" name="time" value={formData.time} onChange={handleChange} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;
