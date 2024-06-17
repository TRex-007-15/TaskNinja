import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', formData); // Make POST request to token API
      console.log('User logged in:', response.data);
      setPopupMessage("Logged in successfully!");
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/Profile');
      }, 2000);
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      }
      setError(errorMessage);
      console.error('Error logging in:', errorMessage);
    }
  };

  // Clear popup message after 2 seconds
  useEffect(() => {
    if (popupMessage) {
      const timeout = setTimeout(() => {
        setPopupMessage("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [popupMessage]);

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="form-button">Login</button>
      </form>
      {/* Popup message for success */}
      {popupMessage && <p>{popupMessage}</p>}
    </div>
  );
};

export default Login;
