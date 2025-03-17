//post_blog.js
import axios from 'axios';
import API_URL from '../api_service.js';

export const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${API_URL}blogAPI/createBlog?userId=${localStorage.getItem('userId')}`, blogData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};
