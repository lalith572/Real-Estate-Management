import axios from 'axios';

const BASE_URL = 'http://localhost:8080/properties';

export const addProperty = async (formData) => {
  try {
      const response = await axios.post('http://localhost:8080/properties/add', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error adding property:', error.response ? error.response.data : error.message);
      throw new Error('Error adding property');
  }
};

export const updateProperty = async (id, propertyData, imageFile) => {
  const formData = new FormData();
  formData.append('propertyJson', JSON.stringify(propertyData)); 
  
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  await axios.delete(`${BASE_URL}/delete/${id}`);
};

export const getPropertyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

export const searchProperties = async (params) => {
  const response = await axios.get(`${BASE_URL}/search`, { params });
  return response.data;
};

export const getProperties = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Error fetching properties');
  }
};