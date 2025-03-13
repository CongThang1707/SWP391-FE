import axios from 'axios';
import API_URL from '../api_service.js';

export const createFeedback = async (doctorId, parentId, consultingId, requestBody) => {
  try {
    console.log('Sending create feedback request with data:', requestBody); // Debug
    const response = await axios.post(
      `${API_URL}feedbackAPI/createFeedBack?doctorId=${doctorId}&parentId=${parentId}&consulting_id=${consultingId}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching consulting:', error);
    throw error;
  }
};
