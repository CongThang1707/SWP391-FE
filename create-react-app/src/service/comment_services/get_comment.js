import axios from 'axios';
import API_URL from '../api_service.js';

export const getAllComment = async () => {
  try {
    const response = await axios.get(`${API_URL}commentAPI/getAllComment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all comments:', error?.response?.data || error.message);
    throw error;
  }
};

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
    const response = await axios.get(`${API_URL}commentAPI/getCommentByBlogId?blogId=${blogId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error?.response?.data || error.message);
    throw error;
  }
};

export const getCommentById = async (commentId) => {
  try {
    const response = await axios.get(`${API_URL}commentAPI/getCommentById?comment_id=${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment by ID:', error?.response?.data || error.message);
    throw error;
  }
};

export const updateComment = async (commentId, newContent) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }
    const response = await axios.put(
      `${API_URL}commentAPI/updateComment?comment_id=${commentId}&parent_id=${userId}&newContent=${newContent}`
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error?.response?.data || error.message);
    throw error;
  }
};

export const deleteCommentByAdmin = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}commentAPI/deleteByAdmin?commentId=${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment by admin:', error?.response?.data || error.message);
    throw error;
  }
};

export const deleteCommentByUser= async (commentId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.delete(`${API_URL}commentAPI/deleteByUser?commentId=${commentId}&parentId=${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting comment by admin:', error?.response?.data || error.message);
    throw error;
  }
};

export const reportByUser = async (commentId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}commentAPI/reportByUser?comment_id=${commentId}&parent_id=${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error reporting comment:', error?.response?.data || error.message);
    throw error;
  }
};

export const approveCommentByAdmin = async (commentId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}commentAPI/approve?comment_id=${commentId}&admin_id=${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error approving comment by admin:', error?.response?.data || error.message);
    throw error;
  }
};

export const rejectComment = async (commentId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}commentAPI/reject?comment_id=${commentId}&admin_id=${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error rejecting comment:', error?.response?.data || error.message);
    throw error;
  }
};

export const reportCommentByAdmin = async (commentId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}commentAPI/reportByAdmin?comment_id=${commentId}&admin_id=${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error reporting comment by admin:', error?.response?.data || error.message);
    throw error;
  }
};
