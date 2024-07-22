import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import "./Signup.css"; // Update with the appropriate CSS file path

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
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent state
  const [otp, setOtp] = useState(""); // State to store OTP input

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [popupMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "contact_number" && !/^\d{0,10}$/.test(value)) {
      // Allow only 10 numeric digits for contact_number
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if OTP has been sent and entered or if bypass OTP is entered
      if ((!otpSent || !otp) && otp !== '123456') {
        setPopupMessage("Please send and enter OTP first!");
        return;
      }
      if (addresses.length <= 0){
        setPopupMessage("Please enter at least one address!");
        return;
      }
      const data = {
        ...formData,
        otp: otp,
      };

      const response = await api.post('/user/register/', data);
      console.log('User registered:', response.data);
      setPopupMessage("Registered successfully!");
      setTimeout(() => {
        navigate('/form');
      }, 2000);
    } catch (error) {
      setPopupMessage(error.response?.data?.error || 'Error Registering. Please try again.');
      console.error('Error registering user:', error.response?.data?.error);
    }
  };

  const handleSendOTP = async () => {
    try {
      await api.post('/otp/', { contact_number: formData.contact_number });
      setOtpSent(true);
      setPopupMessage("OTP Sent!");
    } catch (error) {
      setPopupMessage("Error sending OTP!");
      console.error('Error sending OTP:', error.response?.data || error.message);
    }
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
  };

  const handleAddressSubmit = (addressData) => {
    setAddresses([...addresses, addressData]);
    setFormData(prevFormData => ({
      ...prevFormData,
      addresses: [...prevFormData.addresses, addressData]
    }));
    setShowAddressForm(false);
  };

  return (
    <div className='sup'>
      <div className="signup-container">
        <h2 className="signup-header">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
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
            {/* Button to send OTP */}
            <button type="button" className="form-button button-primary" onClick={handleSendOTP} disabled={otpSent}>
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>
          {/* OTP input field */}
          <div className="form-group">
            <label>Enter OTP:</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => { 
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  setOtp(value); 
                  setOtpSent(true);
                }
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Addresses:</label>
            {!showAddressForm && <button type="button" className="add-address-button button-success" onClick={() => setShowAddressForm(true)}>+</button>}
            <div className="address-cards">
              {addresses.map((address, index) => (
                <div key={index} className="address-card">
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
          <button type="submit" className="form-button button-primary">Sign Up</button>
        </form>
        {/* Popup message for success/error */}
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
        {showAddressForm && (
          <AddressForm Name="Add New Address" onSubmit={handleAddressSubmit} onCancel={handleCancelAddressForm} existingAddresses={addresses}/>
        )}
      </div>
    </div>
  );
};

export default Signup;