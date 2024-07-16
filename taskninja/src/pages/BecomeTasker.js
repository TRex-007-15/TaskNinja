import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import './BecomeTasker.css';

// Service options
const services = [
  { name: "Packers and Movers", image: "packers_and_movers.jpg" },
  { name: "Plumbers", image: "plumbers.jpg" },
  { name: "Electricians", image: "electricians.jpg" },
  { name: "Cleaning Services", image: "cleaning_services.jpg" },
  { name: "Carpenters", image: "carpenters.jpg" },
  { name: "Pest Control", image: "pest_control.jpg" },
  { name: "Painters", image: "painters.jpg" },
  { name: "AC Services", image: "ac_services.jpg" },
  { name: "Gardening", image: "gardening.jpg" },
  { name: "Home Security", image: "home_security.jpg" },
  { name: "Laundry", image: "laundry.jpg" },
  { name: "Moving Services", image: "moving_services.jpg" },
  { name: "Home Cleaning", image: "home_cleaning.jpg" },
  { name: "Furniture Assembly", image: "furniture_assembly.jpg" },
  { name: "Computer Repair", image: "computer_repair.jpg" },
  { name: "Interior Design", image: "interior_design.jpg" }
];

// Experience options
const experienceOptions = [
  { value: "Less than 1 year", label: "Less than 1 year" },
  { value: "1-2 years", label: "1-2 years" },
  { value: "2-3 years", label: "2-3 years" },
  { value: "More than 3 years", label: "More than 3 years" }
];

const BecomeTasker = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    contact_number: '',
    about: '',
    service: '',
    experience: '',
    price: 0,
    price_per_day: 0,
    addresses: [],
    skill_proof_pdf: '',
    otp: ''
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent state
  const [skillProofPdf, setSkillProofPdf] = useState(null);

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

  const handleFileChange = (event) => {
    setSkillProofPdf(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if OTP has been sent and entered
      if (formData.otp !== '123456' && (!otpSent || !formData.otp)) {
        setPopupMessage("Please send and enter OTP first!");
        return;
      }

      if (formData.addresses.length <= 0){
        setPopupMessage("Please enter atleast one address!");
        return;
      }

      const data = {
        ...formData,
        skill_proof_pdf: skillProofPdf ? skillProofPdf.name : '',
      };

      const response = await api.post('/tasker/register/', data);
      console.log("Tasker Registration Successful: ", response.data);
      setPopupMessage("Tasker registered successfully!");
      setTimeout(() => {
        navigate('/form');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setPopupMessage("Email already exists!");
      } else {
        setPopupMessage("Error registering tasker!");
      }
      console.error("Registration Error: ", error);
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
    <div className="form-container">
      <h2 className="Header">Become a Tasker</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-column">
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
        </div>

        <div className="form-column">
          <div className="form-group">
            <label>About:</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
            ></textarea>
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
            <button type="button" className="form-button" onClick={handleSendOTP} disabled={otpSent}>
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Service:</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Service</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Experience:</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Experience</option>
              {experienceOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price Per Day:</label>
            <input
              type="number"
              name="price_per_day"
              value={formData.price_per_day}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label>Addresses:</label>
            {!showAddressForm && <button type="button" className="add-address-button" onClick={() => setShowAddressForm(true)}>+</button>}
            <div className="address-cards">
              {addresses.map((address, index) => (
                <div key={index} className="address-card">
                  <p><strong>Type:</strong> {address.name}</p>
                  <p><strong>City:</strong> {address.city}</p>
                  <p><strong>State:</strong> {address.state}</p>
                  <p><strong>Country:</strong> {address.country}</p>
                  <p><strong>Pincode:</strong> {address.pincode}</p>
                  <p><strong>Address:</strong>{address.full_address}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Skill Proof (PDF):</label>
            <input
              type="file"
              name="skill_proof_pdf"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button type="submit" className="form-button">Register</button>
      </form>
      {showAddressForm && (
            <div className="address-form-popup">
              <AddressForm
                onCancel={handleCancelAddressForm}
                onSubmit={handleAddressSubmit}
                existingAddresses={addresses}
              />
            </div>
          )}
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};

export default BecomeTasker;
