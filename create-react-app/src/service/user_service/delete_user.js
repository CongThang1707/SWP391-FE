import axios from 'axios';
import API_URL from '../api_service.js';

const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}api/deleteUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}api/deleteUser_User/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export { deleteUserById, deleteUser };
