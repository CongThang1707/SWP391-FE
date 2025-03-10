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
    const response = await axios.delete(`${API_URL}blogAPI/deleteBlog/${Blog_id}`);
    return response.data;    
  } catch (error) {
    console.error(`Error deleting blog with ID ${Blog_id}:`, error);
    return null;
  }
};

export default getAllBlog;
export { getBlogById, deleteBlog };
