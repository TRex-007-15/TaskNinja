import React, { useState } from 'react';
import './AddressForm.css';

const AddressForm = ({ onSubmit, onCancel, Name, existingAddresses }) => {
  const [name, setName] = useState("Home");
  const [customName, setCustomName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry",
    "Ladakh", "Jammu and Kashmir"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const isHomeExisting = existingAddresses && existingAddresses.some(address => address.name === "Home");
    const isWorkExisting = existingAddresses && existingAddresses.some(address => address.name === "Work");

    if ((name === "Home" && isHomeExisting) || (name === "Work" && isWorkExisting)) {
      alert(`You can only have one ${name} address.`);
      return;
    }

    const addressName = name === "Other" ? customName : name;
    
    onSubmit({ name: addressName, state, city, pincode, full_address: fullAddress });
    resetForm();
  };

  const handleCancel = () => {
    onCancel(); // Invoke the onCancel function passed from props
    resetForm(); // Reset form fields when cancelling
  };

  const resetForm = () => {
    setName("Home");
    setCustomName("");
    setState("");
    setCity("");
    setPincode("");
    setFullAddress("");
  };

  return (
    <div className="overlay">
      <div className="address-form">
        <h3>{Name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <select value={name} onChange={(e) => setName(e.target.value)} required>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {name === "Other" && (
            <div className="form-group">
              <label>Address Type:</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>State:</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
              <option value="" disabled>Select your state</option>
              {indianStates.map((stateName, index) => (
                <option key={index} value={stateName}>{stateName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>City:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Pincode:</label>
            <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} required></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="form-button" onClick={handleSubmit}>Submit</button>
            <button type="button" className="form-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;