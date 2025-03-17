//get_children.js
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
    const response = await axios.get(`${API_URL}childrenAPI/getChildren`);
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

export const deleteChild = async (childId) => {
  try {
    const response = await axios.delete(`${API_URL}childrenAPI/deleteChild/{childId}?childId=${childId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting child:', error);
    throw error;
  }
};

export const updateChild = async (childId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}childrenAPI/updateChild/${childId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating child:', error);
    throw error;
  }
};

export const createChild = async (childData) => {
  try {
    const parentId = localStorage.getItem('userId');
    if (!parentId) {
      throw new Error('Parent ID not found in localStorage');
    }

    const response = await axios.post(`${API_URL}childrenAPI/createChild?parentId=${parentId}`, childData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating child:', error.response ? error.response.data : error.message);
    throw error;
  }
};
