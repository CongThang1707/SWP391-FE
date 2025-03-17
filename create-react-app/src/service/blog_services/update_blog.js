import axios from 'axios';
import API_URL from '../api_service.js';

const updateBlog = async (blogId, blogData) => {
  console.log('Updating blog with ID:', blogId);
  console.log('New blog data:', blogData);
  try {
    const response = await axios.put(`${API_URL}blogAPI/updateBlog?blog_id=${blogId}&parentId=${localStorage.getItem('userId')}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${blogId}:`, error);
    throw error;
  }
};

export default updateBlog;
