import axios from 'axios';
import API_URL from '../api_service.js';

export const getBookingByParentId = async () => {
  try {
    const response = await axios.get(`${API_URL}BookingAPI/historyBooking-parent?parentId=${localStorage.getItem('userId')}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
