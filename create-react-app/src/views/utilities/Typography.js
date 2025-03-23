import { Grid, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from '@mui/material';
import { getUserByRoleId } from '../../service/user_service/get_user.js';
import { deleteUser } from '../../service/user_service/delete_user.js';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const EnhancedTable = () => {
  const [parentData, setParentData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserByRoleId(1);
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
        await deleteUser(userId);

        // Cập nhật danh sách sau khi xóa thành công
        setParentData((prevData) => prevData.filter((user) => user.user_id !== userId));

        console.log(`User ${userId} deleted successfully!`);
        alert('Delete success!'); // Thông báo khi xóa thành công
      } catch (error) {
        console.error('Failed to delete user:', error.response ? error.response.data : error.message);
        alert('Error deleting user. Please try again.');
      }
    }
  };

  return (
    <MainCard title="Parent" content={false}>
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
                  { id: 'delete', label: 'Delete' },
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
              {parentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((parent) => (
                <TableRow key={parent.user_id}>
                  <TableCell>{parent.username}</TableCell>
                  <TableCell>{parent.fullName}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>{parent.phone}</TableCell>
                  <TableCell>
                    {parent.delete ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/parent-detail/${parent.user_id}`)}>
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDeleteUser(parent.user_id)}
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
    </MainCard>
  );
};

export default EnhancedTable;
