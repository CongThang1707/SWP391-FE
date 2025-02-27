import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AppointmentList = ({ appointments, handleEdit, handleDelete }) => {
  return (
    <List>
      {appointments.map((appt, index) => (
        <ListItem key={index} divider>
          <ListItemText primary={`Bác sĩ: ${appt.doctor}`} secondary={`Ngày: ${appt.date} - Giờ: ${appt.time}`} />
          <IconButton onClick={() => handleEdit(appt)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(appt)}>
            <DeleteIcon color="error" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AppointmentList;
