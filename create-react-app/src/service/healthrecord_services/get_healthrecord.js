import axios from 'axios';
import API_URL from '../api_service.js';

export const getHealthRecordByChildId = async (childId) => {
  try {
    const response = await axios.get(`${API_URL}healthRecord/records/${childId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
