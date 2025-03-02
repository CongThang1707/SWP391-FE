import axios from 'axios';
import API_URL from '../api_service.js';

const getAllBookingAdmin = async () => {
    try {
        const response = await axios.get(`${API_URL}BookingAPI/getAllBooking-admin`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
};

const deleteBooking = async (Booking_id) => {
    try {
        const response = await axios.delete(`${API_URL}BookingAPI/delete-admin?bookId=${Booking_id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting booking:', error);
        return null;
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

export default getAllBookingAdmin;
export { deleteBooking, getBooking };
