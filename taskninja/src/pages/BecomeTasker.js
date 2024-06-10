import React, { useState } from 'react';
import '../App.css';

const statesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Delhi (National Capital Territory of Delhi)", "Puducherry",
  "Ladakh", "Jammu and Kashmir"
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

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label>State/Union Territory:</label>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="" disabled>Select State/UT</option>
            {statesAndUTs.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>City:</label>
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="" disabled>Select City</option>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
            <option value="city3">City 3</option>
          </select>
        </div>
        <div className="form-group">
          <label>Services:</label>
          <select value={selectedService} onChange={handleServiceChange}>
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
