import axios from 'axios';
import API_URL from '../api_service.js';

const createUser = async (roleId, userData) => {
  try {
    const response = await axios.post(`${API_URL}api/register/${roleId}`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}api/verifyOtp?email=${email}&enterCode=${otp}`);
    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export { createUser, verifyOtp };
