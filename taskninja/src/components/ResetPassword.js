import React, { useState } from 'react';
import api from '../api';
import './ResetPassword.css'; // Import the CSS file for styles
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ResetPassword = () => {
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [message]);
  const handleSendOTP = async () => {
    try {
      const response = await api.post('/send_password_reset_otp/', { contact_number: contactNumber });
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await api.post('/reset_password_with_otp/', {
        contact_number: contactNumber,
        otp: otp,
        new_password: newPassword,
      });
      setTimeout(() => {
        navigate('/form');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error resetting password');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <p className="description">Please enter your contact number to receive an OTP for password reset.</p>
        {!otpSent ? (
          <>
            <input
              type="text"
              className="input-field"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              required
            />
            <button className="action-button" onClick={handleSendOTP}>Send OTP</button>
          </>
        ) : (
          <>
            <p className="description">Enter the OTPsent to your contact number and set a new password.</p>
            <input
              type="text"
              className="input-field"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              required
            />
            <input
              type="password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <button className="action-button" onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;