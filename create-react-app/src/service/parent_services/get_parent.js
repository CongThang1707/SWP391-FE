import axios from 'axios';
import API_URL from '../../service/api_service.js';

const getUserByRoleId = async (roleId) => {
  try {
    const response = await axios.get(`${API_URL}api/getUserByRoleId/${roleId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUserByRoleId };
