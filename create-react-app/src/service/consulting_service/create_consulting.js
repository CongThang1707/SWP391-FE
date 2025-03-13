import axios from 'axios';
import API_URL from '../api_service.js';

export const createConsulting = async (doctorId, parentId, childId, bookingId, newConsulting) => {
  try {
    const response = await axios.post(
      `${API_URL}consultingAPI/createConsulting?doctorId=${doctorId}&parentId=${parentId}&childId=${childId}&bookingId=${bookingId}`,
      newConsulting
    );
    console.log('Create consulting successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating consulting:', error);
    throw error;
  }
};
