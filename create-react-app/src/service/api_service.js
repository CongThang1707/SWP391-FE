const API_URL = 'http://localhost:8080/';

import axios from 'axios';

const getUserByRoleId = async (roleId) => {
  try {
    const response = await axios.get(`${API_URL}api/getUserByRoleId/${roleId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUserByRoleId };
