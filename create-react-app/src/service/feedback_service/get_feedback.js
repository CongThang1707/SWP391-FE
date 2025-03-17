import axios from 'axios';
import API_URL from '../api_service.js';

export const getFeedbackByConsultingId = async (consultingId) => {
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getFeedbackByConsultingId/${consultingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const getFeedbackByDoctorId = async () => {
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getFeedbackByDoctorId/${localStorage.getItem('userId')}`);
    console.log('Feedback data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};
