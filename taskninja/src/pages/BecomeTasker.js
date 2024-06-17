import React, { useState, useEffect } from 'react';
import api from '../api';
import AddressForm from '../components/AdressForm'; // Correct import for AddressForm component
import '../App.css';
import './BecomeTasker.css';

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

const BecomeTasker = () => {
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddressSubmit = (addressData) => {
    setAddresses([...addresses, addressData]);
    setShowAddressForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskerData = {
      name,
      email,
      password,
      about,
      service: selectedService,
      addresses
    };

    try {
      const response = await api.post('/api/v1/taskers/', taskerData);
      console.log("Tasker Registration Successful: ", response.data);
      setPopupMessage("Tasker registered successfully!");
      setTimeout(() => {
        setPopupMessage(""); // Hide the popup after 2 seconds
        window.location.href = '/'; // Redirect to homepage
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setPopupMessage("Email already exists!");
      } else {
        setPopupMessage("Error registering tasker!");
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [popupMessage]);

  return (
    <div className="form-container">
      <h2 className="Header">Become a Tasker</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>About:</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Services:</label>
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
            <option value="" disabled>Select Service</option>
            {services.map((service, index) => (
              <option key={index} value={service.name}>{service.name}</option>
            ))}
          </select>
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
                <p><strong>Full Address:</strong> {address.full_address}</p>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
      {popupMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={() => setPopupMessage("")}>&times;</span>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
      {showAddressForm && (
        <AddressForm Name="Add New Address" onSubmit={handleAddressSubmit} existingAddresses={addresses} />
      )}
    </div>
  );
};

export default BecomeTasker;
