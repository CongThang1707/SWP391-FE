import axios from 'axios';
import API_URL from '../api_service.js';

export const getChildrenByParentId = async () => {
  try {
    const parentId = localStorage.getItem('userId'); // Lấy parentId từ localStorage
    if (!parentId) {
      throw new Error('Parent ID not found in localStorage');
    }

    const response = await axios.get(`${API_URL}childrenAPI/childrenByParentId?parentId=${parentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching children by parent ID:', error);
    throw error;
  }
};

export const getAllChildren = async () => {
  try {
    const response = await axios.get(`${API_URL}childrenAPI/children-admin`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getChildrenById = async (childId) => {
  try {
    const response = await axios.get(`${API_URL}childrenAPI/child/${childId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
