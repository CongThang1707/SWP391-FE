import axios from 'axios';
import API_URL from '../api_service.js';

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
