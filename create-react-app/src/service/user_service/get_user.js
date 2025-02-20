import axios from 'axios';
import API_URL from '../api_service.js';

const getUserByRoleId = async (roleId) => {
  try {
    const response = await axios.get(`${API_URL}api/getUserByRoleId/${roleId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUserByRoleId };

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}api/getUserById/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};
