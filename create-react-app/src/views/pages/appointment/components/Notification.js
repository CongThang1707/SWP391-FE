import React from 'react';
import { Alert } from '@mui/material';

const Notification = ({ message }) => {
  return message ? <Alert severity="info">{message}</Alert> : null;
};

export default Notification;
