import React, { useState, useEffect } from 'react';
import api from '../api';
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
  const [selectedService, setSelectedService] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [price, setPrice] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [skillProofPdf, setSkillProofPdf] = useState(null); // State to store uploaded PDF file
  const [pricePerDay,setPricePerDay] = useState(null)
  // Handle address form submission
  const handleAddressSubmit = (addressData) => {
    setAddresses([...addresses, addressData]);
    setShowAddressForm(false);
  };

  // Handle main form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskerData = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      about,
      service: selectedService,
      experience: selectedExperience,
      price,
      contact_number: contactNumber,
      addresses,
      skill_proof_pdf: skillProofPdf.name, // Assuming backend expects the file name here
      price_per_day : pricePerDay
    };

    try {
      const formData = new FormData();
      formData.append('skill_proof_pdf', skillProofPdf);

      const response = await api.post('/tasker/register/', taskerData, {
        headers: {
          'Content-Type': 'application/json', // Ensure proper content type
        },
        params: formData // Send form data as params
      });

      console.log("Tasker Registration Successful: ", response.data);
      setPopupMessage("Tasker registered successfully!");
      setTimeout(() => {
        setPopupMessage("");
        window.location.href = '/';
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

  // Clear popup message after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [popupMessage]);

  // Function to handle file input change (PDF upload)
  const handleFileChange = (event) => {
    setSkillProofPdf(event.target.files[0]);
  };
  return (
    <div className="form-container">
      <h2 className="Header">Become a Tasker</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-column">
          {/* Username, Email, Password, First Name, Last Name */}
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>

        <div className="form-column">
          {/* About, Contact Number, Service, Experience, Price */}
          <div className="form-group">
            <label>About:</label>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} required></textarea>
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Service:</label>
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
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
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              required
            >
              <option value="">Select experience</option>
              {experienceOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
          </div>
          <div className="form-group">
            <label>Price Per Day:</label>
            <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(parseFloat(e.target.value))} required />
          </div>
        </div>

        <div className="form-column">
          {/* Addresses section */}
          <div className="form-group">
            <label>Addresses:</label>
            {!showAddressForm && <button type="button" className="add-address-button" onClick={() => setShowAddressForm(true)}>Add Address</button>}
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
        </div>

        {/* File input for Tasker Skill Proof PDF */}
        <div className="form-group">
          <label>Upload Tasker Skill Proof (PDF):</label>
          <input type="file" accept=".pdf" onChange={handleFileChange} required />
        </div>

        {/* Submit button */}
        <div className="form-group">
          <button type="submit" className="form-button">Sign Up</button>
        </div>
      </form>

      {/* Popup message for success or error */}
      {popupMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={() => setPopupMessage("")}>&times;</span>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}

      {/* AddressForm component if showAddressForm is true */}
      {showAddressForm && (
        <AddressForm Name="Add New Address" onSubmit={handleAddressSubmit} existingAddresses={addresses} />
      )}
    </div>
  );
};

export default BecomeTasker;
