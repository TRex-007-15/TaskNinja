import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';


const api = axios.create({
  baseURL: 'http://localhost:8000',
});


const refreshAuthLogic = async (failedRequest) => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.post('/api/token/refresh/', { 'refresh' : refreshToken });
    
    const { accessToken } = response.data;
    
    localStorage.setItem('access_token', accessToken);
    
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
    
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};


createAuthRefreshInterceptor(api, refreshAuthLogic);


api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;




api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);