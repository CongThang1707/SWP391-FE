import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../service/blog_services/get_blog.js';

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

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2>Blog Detail</h2>
      <p>
        <strong>Blog ID:</strong> {blog.blogId}
      </p>
      <p>
        <strong>Title:</strong> {blog.title}
      </p>
      <p>
        <strong>Description:</strong> {blog.description}
      </p>
      <p>
        <strong>Content:</strong> {blog.content}
      </p>
      <p>
        <strong>Parent ID:</strong> {blog.parentId}
      </p>
      <p>
        <strong>Date:</strong> {blog.date}
      </p>
    </div>
  );
};

export default BlogDetail;
