// get_feedback.js
import axios from 'axios';
import API_URL from '../api_service.js';

export const getFeedbackByConsultingId = async (consultingId) => {
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getFeedbackByConsultingId/${consultingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const getFeedbackByDoctorId = async () => {
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getFeedbackByDoctorId/${localStorage.getItem('userId')}`);
    console.log('Feedback data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};
export const getAllFeedback = async () => {
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getALl`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    throw error;
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getFeedBackId/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    throw error;
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await axios.delete(`${API_URL}feedbackAPI/deleteFeedBack?feedback_id=${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

export const getRatingByDoctorId = async (doctorId) => {
  console.log('Doctor ID:', doctorId);
  try {
    const response = await axios.get(`${API_URL}feedbackAPI/getRatingByDoctorId?doctorId=${doctorId}`);
    return response.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};
