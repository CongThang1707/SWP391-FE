import axios from 'axios';
import API_URL from '../api_service.js';

export const createSchedule = async (newSchedule) => {
  try {
    const response = await axios.post(`${API_URL}ScheduleWorking/createSchedule?doctor=${localStorage.getItem('userId')}`, newSchedule);
    return response.data;
  } catch (error) {
    console.error('Error creating schedule:', error);
    throw error;
  }
};
