import axios from 'axios';
import API_URL from '../api_service.js';

export const deleteBookingById = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}BookingAPI/delete-admin?bookId=${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};
