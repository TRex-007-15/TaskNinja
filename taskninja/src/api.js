import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';


const api = axios.create({
  baseURL: 'http://localhost:8000',
});


const refreshAuthLogic = async (failedRequest) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:8000/api/refresh', { token: refreshToken });
    
    const { accessToken } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
    
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};


createAuthRefreshInterceptor(api, refreshAuthLogic);


api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
