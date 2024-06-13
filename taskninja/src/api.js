import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Ensure this is the correct base URL
});

export default api;
