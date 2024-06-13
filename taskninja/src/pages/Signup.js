import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    contact_number: '',
    state: '',
    city: '',
    pincode: '',
    address: ''
  });
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [popupMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register/', formData);
      console.log('User registered:', response.data);
      setPopupMessage("Registered successfully!");
      setTimeout(() => {
        navigate('/'); // Redirect after successful registration using react-router-dom
      }, 2000);
    } catch (error) {
      setPopupMessage("Unable to Register!");
      console.error('Error registering user:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};

export default Signup;
