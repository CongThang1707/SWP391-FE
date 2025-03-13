import axios from 'axios';
import API_URL from '../api_service.js';

export const updateBooking = async (updatedData) => {
  try {
    const response = await axios.put(`${API_URL}BookingAPI/updateBooking`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
  }
};

export const confirmBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${API_URL}BookingAPI/confirmBooking_doctor?bookId=${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error confirming booking:', error);
  }
};

export const completeBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${API_URL}BookingAPI/completeBooking?bookId=${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error);
  }
};
