import axios from 'axios';
import API_URL from '../api_service.js';

export const createComment = async (blogId, commentData) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}commentAPI/create?blog_id=${blogId}&parent_id=${userId}`, commentData);

    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCommentByBlogId = async (blogId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.get(`${API_URL}commentAPI/getCommentByBlogId?blogId=${blogId}&parentId=${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error?.response?.data || error.message);
    throw error;
  }
}