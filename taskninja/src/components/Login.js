import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './login.css';
import moment from 'moment';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupStyle, setPopupStyle] = useState('');

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
      const newExpiry = moment().add(5, 'minutes').toISOString();
      localStorage.setItem('token_expiry', newExpiry);
      setPopupMessage('Login successful!');
      setPopupStyle('success'); // Set popup style to success (green)
      setTimeout(() => {
        navigate('/Profile'); // Redirect to profile page after 2 seconds
      }, 5000);
    } catch (error) {
      setPopupMessage('Invalid credentials. Please try again.');
      setPopupStyle('failure'); // Set popup style to failure (red)
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
    <div className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Form fields */}
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
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
              className="form-input"
              required
            />
          </div>
          
          {/* Submit button */}
          <button type="submit" className="form-button">Login</button>
        </form>
        {/* Popup message for success */}
        {popupMessage && (
          <div className={`popup-message ${popupStyle}`}>
            {popupMessage}
          </div>
        )}
        
        {/* Forgot Password link */}
        <div className="forgot-password-link">
          <Link to="/reset-password">Forgot Password?</Link>
        </div>

        {/* Empty div to push footer down */}
        <div className="spacer"></div> {/* Empty div to push footer down */}
      </div>
    </div>
  );
};

export default Login;
