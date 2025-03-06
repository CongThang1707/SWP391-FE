import axios from 'axios';
import API_URL from '../api_service.js';

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}BookingAPI/createBooking`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};
