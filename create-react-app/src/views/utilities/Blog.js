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
import getBlogs, { deleteBlog } from '../../service/blog_services/get_blog.js';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const EnhancedTable = () => {
  const [blogData, setBlogData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      const data = await getBlogs();
      setBlogData(data);
    };
    fetchBlogData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setBlogData((prevData) =>
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

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(blogId);
        setBlogData((prevData) => prevData.filter((blog) => blog.blogId !== blogId));
        console.log(`Blog ${blogId} deleted successfully!`);
        alert('Blog deleted successfully!.');
      } catch (error) {
        console.error('Failed to delete blog:', error.response ? error.response.data : error.message);
        alert('Error deleting blog. Please try again.');
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
    <MainCard title="Blog List" content={false}>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                {[
                  { id: 'fullName', label: 'Author' },
                  { id: 'title', label: 'Title' },
                  { id: 'hashtag', label: 'Hashtag' },
                  { id: 'date', label: 'Date' },
                  { id: 'status', label: 'Status' },
                  { id: 'action', label: 'Action' }
                ].map((head) => (
                  <TableCell key={head.id} sx={{ fontWeight: 'bold' }}>
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
              {blogData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog, index) => (
                <TableRow key={blog.blogId || `blog-${index}`}>
                  <TableCell>{blog.parentId.fullName}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>#{blog.hashtag}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell>{renderStatusChip(blog.status)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/blog-detail/${blog.blogId}`)}>
                        Detail
                      </Button>
                      <Button variant="contained" color="error" size="small" onClick={() => handleDeleteBlog(blog.blogId)}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={blogData.length}
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
