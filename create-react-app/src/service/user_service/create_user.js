import axios from 'axios';
import API_URL from '../api_service.js';

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}api/register/2`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export { createUser };
