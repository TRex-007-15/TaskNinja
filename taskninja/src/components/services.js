import React, { useState, useEffect } from 'react';
import Cover from './images/s1.jpg';
import services from '../ServiceData';
import '../App.css';
import TaskersList from './TaskerList';
import { verifyAndRefreshToken } from '../middleware/authmiddleware';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
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
            setAddresses(response.data.addresses);
          } catch (error) {
            console.error('Error fetching addresses:', error);
          }
        }
      }
    };
    fetchAddresses();
  }, []);

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

  const handleAddressSelect = (event) => {
    const address = JSON.parse(event.target.value);
    if (isLoggedIn()) {
      setSelectedAddress(address);
    } else {
      window.location.href = '/form';
    }
  };

  return (
    <>
      <div className="cover">
        <img id="cover-image" src={Cover} alt="cover-img" className="cover-image" />
        <p className="cover-text">Your To-do list is on us!</p>
      </div>
      <div className="address-dropdown">
        <div className="dropdown-container">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="pin-icon" />
          <select value={selectedAddress ? JSON.stringify(selectedAddress) : ''} onChange={handleAddressSelect}>
            <option value="">Select Address</option>
            {addresses.map((address) => (
              <option key={address.id} value={JSON.stringify(address)}>
                {address.full_address}, {address.city}, {address.state}, {address.pincode}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-tile" key={index} onClick={() => handleServiceClick(service)}>
            <img src={service.image} alt={service.name} />
            <div className="service-name">{service.name}</div>
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
