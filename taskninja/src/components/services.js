import React from 'react';
import Cover from './images/s1.jpg';

const Services = ({ services }) => (
  <>
    <div className="cover">
      <img id="cover-image" src={Cover} alt="cover-img" className="cover-image" />
      <p className="cover-text">Your To-do list is on us!</p>
    </div>
    <div className="services-grid">
      {services.map((service, index) => (
        <div className="service-tile" key={index}>
          <img src={service.image} alt={service.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
          <div className="service-name">{service.name}</div>
        </div>
      ))}
    </div>
  </>
);

export default Services;