//post_blog.js
import axios from 'axios';
import API_URL from '../api_service.js';

export const createBlog = async (blogData) => {
  try {
    // Lấy userId từ localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}blogAPI/createBlog?userId=${userId}`, blogData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};
