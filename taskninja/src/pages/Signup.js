import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import "./BecomeTasker.css"

const Signup = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    contact_number: '',
    addresses: [] // Initialize addresses
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddressSubmit = (addressData) => {
    setAddresses([...addresses, addressData]);
    setFormData(prevFormData => ({
      ...prevFormData,
      addresses: [...prevFormData.addresses, addressData]
    }));
    setShowAddressForm(false);
  };

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
      const response = await api.post('/user/register/', formData);
      console.log('User registered:', response.data);
      setPopupMessage("Registered successfully!");
      setTimeout(() => {
        navigate('/');
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
          <label>Addresses:</label>
          {!showAddressForm && <button type="button" className="add-address-button" onClick={() => setShowAddressForm(true)}>+</button>}
          <div className='address-cards'>
            {addresses.map((address, index) => (
              <div key={index} className='address-card'>
                <p><strong>Name:</strong> {address.name}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>Pincode:</strong> {address.pincode}</p>
                <p><strong>Full Address:</strong> {address.full_address}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Submit button */}
        <button type="submit" className="form-button">Sign Up</button>
      </form>
      {/* Popup message for success/error */}
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
      {showAddressForm && (
      <AddressForm Name="Add New Address" onSubmit={handleAddressSubmit} existingAddresses={addresses} />
    )}
    </div>
  );
};

export default Signup;
