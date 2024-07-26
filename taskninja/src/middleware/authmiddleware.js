// src/middleware/authMiddleware.js

import moment from 'moment';
import api from '../api';

export const verifyAndRefreshToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!accessToken || !refreshToken) {
    throw new Error('Tokens not found.');
  }

  const tokenExpiry = localStorage.getItem('token_expiry');
  if (moment().isBefore(moment(tokenExpiry))) {
    return accessToken;
  }

  try {
    const response = await api.post('/api/token/refresh/', {
      refresh: refreshToken,
    });
    const { access, expiry } = response.data;

    localStorage.setItem('access_token', access);
    const newExpiry = moment().add(5, 'minutes').toISOString();
    localStorage.setItem('token_expiry', newExpiry);

    return access;
  } catch (error) {
    throw new Error('Failed to refresh token.');
  }
};
