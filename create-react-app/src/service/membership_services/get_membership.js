//get_membership.js
import axios from 'axios';
import API_URL from '../api_service.js';

export const getAllMembership = async () => {
    try {
        const response = await axios.get(`${API_URL}getAllMembership`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all membership records:', error);
        throw error;
    }
};

export const getMembershipByType = async (type) => {
    if (!type) {
        console.error("Error: Membership type is undefined");
        return null;
    }
    try {
        const response = await axios.get(`${API_URL}getMembership?membershipType=${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching membership by type:', error);
        throw error;
    }
};

export const deleteMembership = async (type) => {
    try {
        const response = await axios.delete(`${API_URL}deleteMembership?type=${type}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting consulting:', error);
        throw error;
    }
};

export const createMembership = async (type, price) => {
    try {
      const response = await axios.post(`${API_URL}createMembership?type=${type}&price=${price}`);
      return response.data;
    } catch (error) {
      console.error('Error creating membership:', error);
      throw error;
    }
  };

  export const updateMembership = async (membershipId, updatedData) => {
    if (!membershipId || !updatedData) {
        console.error("Error: Membership ID or updated data is missing");
        return null;
    }
    try {
        const response = await axios.put(`${API_URL}updateMembership?id=${membershipId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating membership:', error);
        throw error;
    }
};

