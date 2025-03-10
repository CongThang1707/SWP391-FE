import axios from 'axios';
import API_URL from '../api_service.js';

export const getScheduleByDoctorId = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}ScheduleWorking/scheduleDoctor?doctorId=${doctorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule by doctor ID:', error);
  }
};
