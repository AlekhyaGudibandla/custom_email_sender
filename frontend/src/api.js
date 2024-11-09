import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendEmails = async (formData) => {
  return await axios.post(`${API_URL}/send-emails`, formData);
};

export const fetchAnalytics = async () => {
  return await axios.get(`${API_URL}/analytics`);
};