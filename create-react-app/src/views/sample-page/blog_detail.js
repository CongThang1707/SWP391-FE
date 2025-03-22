import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById, approveBlog, rejectBlog, checkBlogByAdmin } from '../../service/blog_services/get_blog.js';
import { Button } from '@mui/material';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlogById(id);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  const handleApprove = async () => {
    if (window.confirm('Are you sure you want to approve this blog?')) {
      try {
        await approveBlog(blog.blogId);
        alert('Blog approved successfully!');
        const updatedBlog = await getBlogById(id);
        setBlog(updatedBlog);
      } catch (error) {
        alert('Failed to approve the blog. Please try again.');
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this blog?')) {
      try {
        await rejectBlog(blog.blogId);
        alert('Blog rejected successfully!');
        const updatedBlog = await getBlogById(id);
        setBlog(updatedBlog);
      } catch (error) {
        alert('Failed to reject the blog. Please try again.');
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm('Are you sure you want to report this blog?')) {
      try {
        await checkBlogByAdmin(blog.blogId);
        alert('Blog reported successfully!');
        const updatedBlog = await getBlogById(id);
        setBlog(updatedBlog);
      } catch (error) {
        alert('Failed to report the blog. Please try again.');
      }
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2>Blog Detail</h2>
      <p><strong>Blog ID:</strong> {blog.blogId}</p>
      <p><strong>Title:</strong> {blog.title}</p>
      <p><strong>Hashtag:</strong> {blog.hashtag}</p>
      <p><strong>Content:</strong> {blog.content}</p>
      <p><strong>Parent ID:</strong> {blog.fullName}</p>
      <p><strong>Date:</strong> {blog.date}</p>
      <p><strong>Status:</strong> {blog.status}</p>

      {/* Nút Approve */}
      <Button
        variant="contained"
        color="success"
        onClick={handleApprove}
        disabled={blog.status === 'COMPLETED' || blog.status === 'CANCELLED'}
        style={{ marginRight: '10px' }}
      >
        Approve
      </Button>

      {/* Nút Reject */}
      <Button
        variant="contained"
        color="error"
        onClick={handleReject}
        disabled={blog.status === 'COMPLETED' || blog.status === 'CANCELLED'}
        style={{ marginRight: '10px' }}
      >
        Reject
      </Button>

      {/* Nút Report */}
      <Button
        variant="contained"
        color="warning"
        onClick={handleReport}
        disabled={blog.status === 'CANCELLED'||blog.status === 'PENDING'}
      >
        Report
      </Button>
    </div>
  );
};

export default BlogDetail;
