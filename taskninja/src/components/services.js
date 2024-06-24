import React, { useState } from 'react';
import Cover from './images/s1.jpg';
import services from '../ServiceData';
import '../App.css';
import TaskersList from './TaskerList';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const isLoggedIn = () =>{
    return !!localStorage.getItem('access_token');
  }
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
      <div className="cover">
        <img id="cover-image" src={Cover} alt="cover-img" className="cover-image" />
        <p className="cover-text">Your To-do list is on us!</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-tile" key={index} onClick={() => handleServiceClick(service)}>
            <img src={service.image} alt={service.name} />
            <div className="service-name">{service.name}</div>
          </div>
        ))}
      </div>
      {selectedService && <TaskersList service={selectedService} onClose={handleCloseTaskersList} />}
    </>
  );
};

export default Services;
