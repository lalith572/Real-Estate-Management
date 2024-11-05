import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/clients';

export const getClientProfile = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateClientProfile = async (id, clientData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, clientData);
  return response.data;
};

export const getPurchaseHistory = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}/purchase-history`);
  return response.data;
};

export const getSavedItems = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}/saved-items`);
  return response.data;
};



