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
  Chip
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import getBlogs from '../../service/blog_services/get_blog.js';
import { useNavigate } from 'react-router-dom';
import { deleteBlog } from '../../service/blog_services/get_blog.js';

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
      } catch (error) {
        console.error('Failed to delete blog:', error.response ? error.response.data : error.message);
        alert('Error deleting blog. Please try again.');
      }
    }
  };

  const renderStatusChip = (status) => {
    let color = 'default';
    if (status === 'COMPLETED') color = 'success';
    else if (status === 'PENDING') color = 'warning';
    else if (status === 'CANCEL') color = 'error';

    return <Chip label={status} color={color} />;
  };

  return (
    <MainCard title="Blog List" content={false}>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: 'fullName', label: 'Author' },
                  { id: 'title', label: 'Title' },
                  { id: 'hashtag', label: 'Hashtag' },
                  { id: 'date', label: 'Date' },
                  { id: 'status', label: 'Status' },
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
              {blogData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog, index) => (
                <TableRow key={blog.blogId || `blog-${index}`}>
                  <TableCell>{blog.parentId.fullName}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.hashtag}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell>{renderStatusChip(blog.status)}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/blog-detail/${blog.blogId}`)}>
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDeleteBlog(blog.blogId)}
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
