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
const getAllBookingAdmin = async () => {
  try {
    const response = await axios.get(`${API_URL}BookingAPI/getAllBooking-admin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

const getBooking = async (Booking_id) => {
  try {
    const response = await axios.get(`${API_URL}BookingAPI/getBooking?bookId=${Booking_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
};

export const getBookingByDoctorId = async () => {
  try {
    const response = await axios.get(`${API_URL}BookingAPI/listBookingPending-doctor?doctorId=${localStorage.getItem('userId')}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export default getAllBookingAdmin;
export { getBooking };
