//get_consulting.js
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

export const getAllConsulting = async () => {
  try {
    const response = await axios.get(`${API_URL}consultingAPI/getAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all consulting records:', error);
    throw error;
  }
};

export const getConsultingById = async (consultingId) => {
  try {
    const response = await axios.get(`${API_URL}consultingAPI/getConsultingById/${consultingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching consulting by ID:', error);
    throw error;
  }
};

export const deleteConsulting = async (consultingId) => {
  try {
    const response = await axios.delete(`${API_URL}consultingAPI/deleteConsulting?consulting_id=${consultingId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting consulting:', error);
    throw error;
  }
};
