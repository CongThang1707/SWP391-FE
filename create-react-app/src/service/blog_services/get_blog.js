//get_blog.js
import axios from 'axios';
import API_URL from '../api_service.js';

const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}blogAPI/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const getAllBlogComplete = async () => {
  try {
    const response = await axios.get(`${API_URL}blogAPI/getAllBlogCompleted`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const getBlogByUserId = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }
    const response = await axios.get(`${API_URL}blogAPI/getBlogsByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const getBlogById = async (Blog_id) => {
  try {
    const response = await axios.get(`${API_URL}blogAPI/getBlogById/${Blog_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${Blog_id}:`, error);
    return null;
  }
};

const deleteBlog = async (Blog_id) => {
  try {
    const response = await axios.delete(`${API_URL}blogAPI/deleteBlogByAdmin?blog_id=${Blog_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with ID ${Blog_id}:`, error);
    return null;
  }
};

const getBlogByParentId = async () => {
  try {
    const response = await axios.get(`${API_URL}blogAPI/getBlogsByUserId/${localStorage.getItem('userId')}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const updateBlog = async (blogId, updatedData) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }
    console.log('Data sent to API:', updatedData);
    const response = await axios.put(`${API_URL}blogAPI/updateBlog?blog_id=${blogId}&parentId=${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${blogId}:`, error);
    return null;
  }
};

const approveBlog = async (blogId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.put(`${API_URL}blogAPI/approve/${blogId}?adminId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error approving blog with ID ${blogId}:`, error);
    return null;
  }
};

const rejectBlog = async (blogId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.put(`${API_URL}blogAPI/reject?blogId=${blogId}&adminId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error rejecting blog with ID ${blogId}:`, error);
    return null;
  }
};

const checkBlog = async (blogId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.put(`${API_URL}blogAPI/check/${blogId}?parentId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error checking blog with ID ${blogId}:`, error);
    return null;
  }
};

const checkBlogByAdmin = async (blogId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.put(`${API_URL}blogAPI/checkByAdmin/${blogId}?adminId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error checking blog with ID ${blogId}:`, error);
    return null;
  }
};

export default getBlogs;
export { getBlogById, deleteBlog, getBlogByUserId, updateBlog, getBlogByParentId, getAllBlogComplete, approveBlog, rejectBlog, checkBlog, checkBlogByAdmin };
