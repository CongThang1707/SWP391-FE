// Doctor.js
import {
  Grid, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper
} from '@mui/material';
import { getUserByRoleId } from '../../service/user_service/get_user.js';
import { deleteUser } from '../../service/user_service/delete_user.js';
import { createUser } from '../../service/user_service/create_user.js';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const EnhancedTable = () => {
  const [parentData, setParentData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    gender: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [touchedField, setTouchedField] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (touchedField && Array.isArray(touchedField)) validate();
    const fetchUserData = async () => {
      const data = await getUserByRoleId(2);
      setParentData(data);
    };
    fetchUserData();
  }, [touchedField]);

  const validate = () => {
    let tempErrors = {};
    Object.keys(newUser).forEach((key) => {
      if (!newUser[key]?.trim()) {
        tempErrors[key] = 'This field is required';
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setParentData((prevData) =>
      [...prevData].sort((a, b) => {
        if (property === 'phone') return isAsc ? a[property] - b[property] : b[property] - a[property];
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      })
    );
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setParentData((prevData) => prevData.filter((user) => user.user_id !== userId));
        console.log(`User ${userId} deleted successfully!`);
        alert('User deleted successfully!'); 
      } catch (error) {
        console.error('Failed to delete user:', error.response ? error.response.data : error.message);
        alert('Error deleting user. Please try again.');
      }
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUser({ username: '', password: '', email: '', fullName: '', gender: '', phone: '', address: '' });
    setErrors({});
    setTouchedField(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
    setTouchedField((prev) => (Array.isArray(prev) ? [...new Set([...prev, name])] : [name]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouchedField(Object.keys(newUser));
  
    if (!validate()) return;
  
    const isConfirmed = window.confirm('Are you sure you want to add this doctor?');
    if (!isConfirmed) return; 
  
    try {
      await createUser(2, newUser);
      const updatedData = await getUserByRoleId(2);
      setParentData(updatedData);
      handleCloseDialog();
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      alert(`Failed to create user: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  return (
    <MainCard
      title="Doctor"
      secondary={
        <IconButton color="primary" onClick={handleOpenDialog}>
          <AddIcon />
        </IconButton>
      }
      content={false}
    >
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[ 
                  { id: 'username', label: 'Username' },
                  { id: 'fullName', label: 'Full Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'delete', label: 'Delete' }, // ✅ Thêm cột Delete
                  { id: 'action', label: 'Action' }
                ].map((head) => (
                  <TableCell key={head.id}>
                    <TableSortLabel
                      active={orderBy === head.id}
                      direction={orderBy === head.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, head.id)}
                    >
                      {head.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {parentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doctor) => (
                <TableRow key={doctor.user_id}>
                  <TableCell>{doctor.username}</TableCell>
                  <TableCell>{doctor.fullName}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>
                    {doctor.delete ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/doctor-detail/${doctor.user_id}`)}>
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDeleteUser(doctor.user_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={parentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          {['username', 'password', 'email', 'fullName', 'phone', 'address'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === 'password' ? 'password' : 'text'}
              fullWidth
              variant="outlined"
              value={newUser[field]}
              onChange={handleInputChange}
              onBlur={() => setTouchedField((prev) => (Array.isArray(prev) ? [...new Set([...prev, field])] : [field]))}
              error={touchedField?.includes(field) && !!errors[field]}
              helperText={touchedField?.includes(field) ? errors[field] : ''}
            />
          ))}

          {/* Gender Select */}
          <Select
            fullWidth
            name="gender"
            value={newUser.gender}
            onChange={handleInputChange}
            onBlur={() => setTouchedField((prev) => (Array.isArray(prev) ? [...new Set([...prev, 'gender'])] : ['gender']))}
            displayEmpty
            error={touchedField?.includes('gender') && !!errors['gender']}
            sx={{ mt: 2 }}
          >
            <MenuItem value="" disabled>Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          {touchedField?.includes('gender') && errors['gender'] && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors['gender']}</span>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default EnhancedTable;
