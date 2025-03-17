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
  Button
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { getAllFeedback, deleteFeedback } from '../../service/feedback_service/get_feedback.js';
import { useNavigate } from 'react-router-dom';

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('feedbackId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const data = await getAllFeedback();
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchFeedbackData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setFeedbackData((prevData) =>
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

  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await deleteFeedback(feedbackId);
        setFeedbackData((prevData) => prevData.filter((feedback) => feedback.feedbackId !== feedbackId));
        alert(`Feedback ${feedbackId} deleted successfully!`);
      } catch (error) {
        console.error('Failed to delete feedback:', error.response ? error.response.data : error.message);
        alert('Error deleting feedback. Please try again.');
      }
    }
  };

  return (
    <MainCard title="Feedbacks" content={false}>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: 'feedbackId', label: 'Feedback ID' },
                  { id: 'rate', label: 'Rate' },
                  { id: 'comment', label: 'Comment' },
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
              {feedbackData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((feedback, index) => (
                <TableRow key={feedback.feedbackId || `feedback-${index}`}>
                  <TableCell>{feedback.feedbackId}</TableCell>
                  <TableCell>{feedback.rate}</TableCell>
                  <TableCell>{feedback.comment}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => navigate(`/feedback-detail/${feedback.feedbackId}`)}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDeleteFeedback(feedback.feedbackId)}
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
          count={feedbackData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </MainCard>
  );
};

export default FeedbackTable;
