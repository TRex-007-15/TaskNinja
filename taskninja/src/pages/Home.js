import React from 'react';
import '../App.css';

const Home = ({ searchQuery, setSearchQuery, filteredServices }) => {
  return (
    <div>
      <h1 className="Header">Book Trusted Help for Home Tasks</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for tasks or help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="services-container">
        {filteredServices.map((service, index) => (
          <div className="service-tile" key={index}>
            <img src={service.image} alt={service.name} className="service-image" />
            <p className="service-name">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
