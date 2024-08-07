import React, { useState } from 'react';
import './AddressForm.css';

const EditAddressForm = ({ onSubmit, onCancel, address, existingAddresses }) => {
  const [name, setName] = useState(address.name  !== "Home" && address.name !== "Work" ? "Other" : address.name);
  const [customName, setCustomName] = useState(address.name !== "Home" && address.name !== "Work" ? address.name : "");
  const [state, setState] = useState(address.state || "");
  const [city, setCity] = useState(address.city || "");
  const [pincode, setPincode] = useState(address.pincode || "");
  const [fullAddress, setFullAddress] = useState(address.full_address || "");

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

    // const isHomeExisting = existingAddresses && existingAddresses.some(addr => addr.name === "Home");
    // const isWorkExisting = existingAddresses && existingAddresses.some(addr => addr.name === "Work");

    // if ((name === "Home" && isHomeExisting) || (name === "Work" && isWorkExisting)) {
    //   alert(`You can only have one ${name} address.`);
    //   return;
    // }

    const addressName = name === "Other" ? customName : name;

    onSubmit({ id: address.id, name: addressName, state, city, pincode, full_address: fullAddress });
    resetForm();
  };

  const handleCancel = () => {
    onCancel();
    resetForm();
  };

  const resetForm = () => {
    setName(address.name || "");
    setCustomName(address.name !== "Home" && address.name !== "Work" ? address.name : "");
    setState(address.state || "");
    setCity(address.city || "");
    setPincode(address.pincode || "");
    setFullAddress(address.full_address || "");
  };

  return (
    <div className="overlay">
      <div className="address-form">
        <h3>Edit Address</h3>
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
              <label>Custom Name:</label>
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
          <div className='from-group'>
          <label>Address:</label>
          <textarea 
            value={fullAddress} 
            onChange={(e) => setFullAddress(e.target.value)} 
            maxLength={30} 
            required
          ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="form-button">Submit</button>
            <button type="button" className="form-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;
