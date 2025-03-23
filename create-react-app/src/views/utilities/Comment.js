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
    Button,
    Chip,
    Stack
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { getAllComment, deleteCommentByAdmin } from '../../service/comment_services/get_comment.js';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const CommentTable = () => {
    const [commentData, setCommentData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getAllComment();
                setCommentData(data);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };
        fetchComments();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setCommentData((prevData) =>
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

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteCommentByAdmin(commentId);
                setCommentData((prevData) => prevData.filter((comment) => comment.commentId !== commentId));
                console.log(`Comment ${commentId} deleted successfully!`);
            } catch (error) {
                console.error('Failed to delete comment:', error.response ? error.response.data : error.message);
                alert('Error deleting comment. Please try again.');
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
        <MainCard title="Comment Management" content={false}>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 750 }}>
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                {[
                                    { id: 'fullName', label: 'Author' },
                                    { id: 'comment', label: 'Comment' },
                                    { id: 'date', label: 'Date' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'action', label: 'Action' }
                                ].map((head) => (
                                    <TableCell key={head.id} sx={{ fontWeight: 'bold' }}>
                                        {head.id !== 'action' ? (
                                            <TableSortLabel
                                                active={orderBy === head.id}
                                                direction={orderBy === head.id ? order : 'asc'}
                                                onClick={(event) => handleRequestSort(event, head.id)}
                                            >
                                                {head.label}
                                            </TableSortLabel>
                                        ) : head.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {commentData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No comments found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                commentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment, index) => (
                                    <TableRow key={comment.commentId || `comment-${index}`}>
                                        <TableCell>{comment.fullName}</TableCell>
                                        <TableCell>{comment.comment}</TableCell>
                                        <TableCell>{comment.date}</TableCell>
                                        <TableCell>{renderStatusChip(comment.status)}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => navigate(`/comment-detail/${comment.commentId}`)}
                                                >
                                                    Detail
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDeleteComment(comment.commentId)}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={commentData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </MainCard>
    );
};

export default CommentTable;
