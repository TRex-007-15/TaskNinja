import React, { useState } from 'react';

const AddressForm = ({ onSubmit, Name, existingAddresses }) => {
  const [name, setName] = useState("Home");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [full_address, setAddress] = useState("");

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
    e.preventDefault(); // Prevent form from refreshing the page

    const isHomeExisting = existingAddresses.some(address => address.name === "Home");
    const isWorkExisting = existingAddresses.some(address => address.name === "Work");

    if ((name === "Home" && isHomeExisting) || (name === "Work" && isWorkExisting)) {
      alert(`You can only have one ${name} address.`);
      return;
    }

    onSubmit({ name, state, city, full_address });
    setName("Home");
    setState("");
    setCity("");
    setAddress("");
  };

  return (
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
          <label>Address:</label>
          <textarea value={full_address} onChange={(e) => setAddress(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default AddressForm;
