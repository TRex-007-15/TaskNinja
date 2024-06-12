import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import './BecomeTasker.css';

const statesAndUTs = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

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
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskerData = {
      name,
      email,
      password,
      state: selectedState,
      city: selectedCity,
      about,
      work: selectedService
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/taskers/', taskerData);
      console.log("Tasker Registration Successful: ", response.data);
      // Add any additional logic here, such as redirecting to a success page
    } catch (error) {
      console.error("Error registering tasker: ", error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
  <div className="form-container">
  <h2>Sign Up</h2>
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
      <label>State/Union Territory:</label>
      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
        <option value="" disabled>Select State/UT</option>
        {statesAndUTs.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>City:</label>
      <input type="text" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required />
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
    <button type="submit" className="form-button">Sign Up</button>
  </form>
</div>
);
};

export default BecomeTasker;