import React, { useState, useEffect } from 'react';
import Cover from './images/s1.jpg';
import services from '../ServiceData';
import './services.css';
import TaskersList from './TaskerList';
import { verifyAndRefreshToken } from '../middleware/authmiddleware';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); // Initialize as null
  const [addresses, setAddresses] = useState([]);

  const isLoggedIn = () => {
    return !!localStorage.getItem('access_token');
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      if (isLoggedIn()) {
        const accessToken = await verifyAndRefreshToken();
        if (accessToken) {
          try {
            const response = await api.get('/user/data/', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const fetchedAddresses = response.data.addresses;
            setAddresses(fetchedAddresses);
            
            // Set the first address as selected by default
            if (fetchedAddresses.length > 0) {
              setSelectedAddress(fetchedAddresses[0]);
            }
          } catch (error) {
            console.error('Error fetching addresses:', error);
          }
        }
      }
    };
    fetchAddresses();
  }, []);

  // Update selected address
  const handleAddressSelect = (event) => {
    const address = JSON.parse(event.target.value);
    setSelectedAddress(address);
  };

  const handleServiceClick = (service) => {
    if (isLoggedIn()) {
      setSelectedService(service);
    } else {
      window.location.href = '/form'; // Redirect to login page
    }
  };

  const handleCloseTaskersList = () => {
    setSelectedService(null);
  };

  return (
    <>
      <div className="services-cover">
        <img id="services-cover-image" src={Cover} alt="cover-img" className="services-cover-image" />
        <p className="services-cover-text">Your To-do list is on us!</p>
      </div>
      {isLoggedIn() && (
        <div className="services-address-dropdown">
          <div className="services-dropdown-container">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="services-pin-icon" />
            <select value={selectedAddress ? JSON.stringify(selectedAddress) : ''} onChange={handleAddressSelect}>
              {addresses.map((address) => (
                <option key={address.id} value={JSON.stringify(address)}>
                  {address.full_address}, {address.city}, {address.state}, {address.pincode}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="services-tile" key={index} onClick={() => handleServiceClick(service)}>
            <img src={service.image} alt={service.name} />
            <div className="services-name">{service.name}</div>
          </div>
        ))}
      </div>
      {selectedService && selectedAddress && (
        <TaskersList
          service={selectedService}
          selectedAddress={selectedAddress}
          onClose={handleCloseTaskersList}
        />
      )}
    </>
  );
};

export default Services;
