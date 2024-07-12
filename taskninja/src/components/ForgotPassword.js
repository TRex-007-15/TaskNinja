import React, { useState } from 'react';
import api from '../api';

const ForgotPassword = () => {
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await api.post('/send_password_reset_otp/', { contact_number: contactNumber });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="text"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        placeholder="Enter your contact number"
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
