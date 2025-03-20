import axios from 'axios';
import API_URL from '../api_service.js';

export const createComment = async (blogId, commentData) => {
    try {
        const response = await axios.post(`${API_URL}commentAPI/createComment?&blogId=${blogId}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error?.response?.data || error.message);
        throw error;
    }
};

export const getCommentByBlogId = async (blogId) => {
    try {
      const response = await axios.get(`${API_URL}commentAPI/getCommentByBlogId/${blogId}`);
      return response.data; // Trả về danh sách comment
    } catch (error) {
      console.error('Error fetching comments:', error?.response?.data || error.message);
      throw error;
    } 
  };