import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Chip,
  Button
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import getAllBookingAdmin from '../../service/booking_services/get_booking.js';
import { deleteBookingById } from '../../service/booking_services/delete_booking.js';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CancelIcon from '@mui/icons-material/Cancel';

const EnhancedTable = () => {
  const [bookingData, setBookingData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('bookDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      const data = await getAllBookingAdmin();
      setBookingData(data);
    };
    fetchBookingData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setBookingData((prevData) =>
      [...prevData].sort((a, b) => {
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

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBookingById(bookingId);
        setBookingData((prevData) => prevData.filter((booking) => booking.bookId !== bookingId));
        console.log(`Booking ${bookingId} deleted successfully!`);
      } catch (error) {
        console.error('Failed to delete booking:', error.response ? error.response.data : error.message);
        alert('Error deleting booking. Please try again.');
      }
    }
  };

   const renderStatusChip = (status) => {
      switch (status) {
        case 'COMPLETED':
          return (
            <Chip
              icon={<CheckCircleIcon sx={{ color: '#fff' }} />}
              label="COMPLETED"
              sx={{ bgcolor: '#00e676', color: '#fff', fontWeight: 'bold' }}
            />
          );
        case 'PENDING':
          return (
            <Chip
              icon={<ReportProblemIcon sx={{ color: '#000' }} />}
              label="PENDING"
              sx={{ bgcolor: '#ffe082', color: '#000', fontWeight: 'bold' }}
            />
          );
        case 'CANCELLED':
          return (
            <Chip
              icon={<CancelIcon sx={{ color: '#000' }} />}
              label="CANCELLED"
              sx={{ bgcolor: '#e0e0e0', color: '#000', fontWeight: 'bold' }}
            />
          );
        default:
          return <Chip label={status} />;
      }
    };

  return (
    <MainCard title="Bookings" content={false}>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: 'doctorname', label: 'Doctorname' },
                  { id: 'username', label: 'Username' },
                  { id: 'bookDate', label: 'Booking Date' },
                  { id: 'comment', label: 'Comment' },
                  { id: 'bookingStatus', label: 'Status' },
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
              {bookingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking, index) => (
                <TableRow key={booking.bookId || `booking-${index}`}>
                  <TableCell>{booking.schedule.doctor.fullName}</TableCell>
                  <TableCell>{booking.parent.fullName}</TableCell>
                  <TableCell>{booking.bookDate}</TableCell>
                  <TableCell>{booking.comment}</TableCell>
                  <TableCell>{renderStatusChip(booking.bookingStatus)}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/booking-detail/${booking.bookId}`)}>
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDeleteBooking(booking.bookId)}
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
          count={bookingData.length}
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
