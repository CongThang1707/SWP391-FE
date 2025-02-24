import axios from 'axios';
import API_URL from '../api_service.js';

const updateUserById = async (updatedUserData) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    console.log('Sending update request with data:', updatedUserData); // Debug

    const response = await axios.put(`${API_URL}api/updateUser/${userId}`, updatedUserData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export { updateUserById };
