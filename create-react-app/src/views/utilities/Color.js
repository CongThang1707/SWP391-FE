import { Grid, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from '@mui/material';
import { getUserByRoleId } from '../../service/user_service/get_user.js';
import { deleteUserById } from '../../service/user_service/delete_user.js';
import { createUser } from '../../service/user_service/create_user.js';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserByRoleId(2);
      setParentData(data);
    };
    fetchUserData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setParentData((prevData) =>
      [...prevData].sort((a, b) => {
        if (property === 'phone') {
          return isAsc ? a[property] - b[property] : b[property] - a[property];
        }
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      })
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserById(userId);
        setParentData((prevData) => prevData.filter((user) => user.user_id !== userId));
        console.log(`User ${userId} deleted successfully!`);
      } catch (error) {
        console.error('Failed to delete user:', error.response ? error.response.data : error.message);
        alert('Error deleting user. Please try again.');
      }
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUser({ username: '', password: '', email: '', fullName: '', gender: '', phone: '', address: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser(2, newUser); // Gọi API để tạo user mới
      const updatedData = await getUserByRoleId(2); // Lấy lại danh sách user mới nhất
      setParentData(updatedData); // Cập nhật danh sách hiển thị ngay lập tức
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
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
          {['username', 'password', 'email', 'fullName', 'gender', 'phone', 'address'].map((field) => (
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
            />
          ))}
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
