import { Grid, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from '@mui/material';
import { getUserByRoleId } from '../../service/user_service/get_user.js';

const EnhancedTable = () => {
  const [parentData, setParentData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <MainCard title="Doctor" content={false}>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: 'username', label: 'Username' },
                  { id: 'fullName', label: 'Full Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'action', label: 'Action' },
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
                  <TableCell>{parent.gender}</TableCell>
                  <TableCell>{parent.phone}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small">Update</Button>
                    <Button variant="contained" color="secondary" size="small" style={{ marginLeft: 8 }}>Delete</Button>
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
