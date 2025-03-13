import axios from 'axios';
import API_URL from '../api_service.js';

export const getConsultingByBookingId = async (bookingId) => {
  try {
    const response = await axios.get(`${API_URL}consultingAPI/getConsultingByBookingId/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching consulting:', error);
    throw error;
  }
};
