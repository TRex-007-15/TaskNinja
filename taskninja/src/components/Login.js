import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Link } from 'react-router-dom';

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
    try {
      const response = await api.post('/api/token/', formData);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/Profile'); // Redirect to home page after successful login
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Clear popup message after 2 seconds
  useEffect(() => {
    if (popupMessage) {
      const timeout = setTimeout(() => {
        setPopupMessage('');
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
        <Link to="/forgot-password">Forgot Password?</Link>
      </form>
      {/* Popup message for success */}
      {popupMessage && <p>{popupMessage}</p>}
    </div>
  );
};

export default Login;