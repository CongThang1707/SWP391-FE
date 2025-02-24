import axios from 'axios';
import API_URL from '../api_service.js';

const getAllBlog = async () => {
  try {
    const response = await axios.get(`${API_URL}blogAPI/getAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export default getAllBlog;
