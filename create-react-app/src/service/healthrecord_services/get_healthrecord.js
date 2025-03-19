//get_healthrecord.js
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

export const updateRecord = async (recordId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}healthRecord/updateRecord/${recordId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

export const deleteRecord_Admin = async (recordId) => {
  try {
    const response = await axios.delete(`${API_URL}healthRecord/deleteRecord_Admin/${recordId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting health record:', error);
    throw error;
  }
};

export const createRecord = async (parentId, childId, updatedData) => {
  try {
    console.log('Data sent to API:', updatedData); // Debug log
    const response = await axios.post(`${API_URL}healthRecord/createRecord?parentId=${parentId}&childId=${childId}`, updatedData);
    console.log('Response from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating health record:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getGrowthStatusChange = async (childId, bmiLastRecord, bmiCurrentRecord) => {
  try {
    const response = await axios.get(
      `${API_URL}healthRecord/getGrowthStatusChange/childId/${childId}?bmiLastRecord=${bmiLastRecord}&bmiCurrentRecord=${bmiCurrentRecord}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
