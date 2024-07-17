import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // Import your global styles
import './Home.css';
import TaskersList from '../components/TaskerList';

const Home = ({ searchQuery, setSearchQuery, filteredServices }) => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const isLoggedIn = () => {
    return !!localStorage.getItem('access_token');
  };

  const handleServiceClick = (service) => {
    if (isLoggedIn()) {
      setSelectedService(service);
    } else {
      navigate('/form'); // Redirect to login page
    }
  };

  const handleCloseTaskersList = () => {
    setSelectedService(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="home-hero">
        <h1 className="home-hero-header">Book Trusted Help for Home Tasks</h1>
        <p className="home-hero-subheader">Find and book top-rated professionals for all your home service needs.</p>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <h2 className="home-section-header">Our Services</h2>
        <div className="home-search-container">
          <input
            type="text"
            className="home-search-bar"
            placeholder="Search for tasks or help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="home-services-container">
          {filteredServices.map((service, index) => (
            <div className="home-service-tile" key={index} onClick={() => handleServiceClick(service)}>
              <img src={service.image} alt={service.name} className="home-service-image" />
              <p className="home-service-name">{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="home-about-us">
        <h2 className="home-section-header">Why Choose Us?</h2>
        <p className="home-about-us-content">
          At TaskNinja, we are dedicated to providing you with the best home service professionals. Our team is carefully
          vetted and trained to ensure that you get the highest quality of service. Whether you need help with cleaning,
          plumbing, electrical work, or any other home task, we have the right experts for you.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="home-testimonials">
        <h2 className="home-section-header">What Our Customers Say</h2>
        <div className="home-testimonials-container">
          <div className="home-testimonial">
            <p className="home-testimonial-content">"TaskNinja made it so easy to find a reliable plumber. The service was excellent!"</p>
            <p className="home-testimonial-author">- John D.</p>
          </div>
          <div className="home-testimonial">
            <p className="home-testimonial-content">"Highly recommend TaskNinja for any home task. Very professional and efficient."</p>
            <p className="home-testimonial-author">- Sarah W.</p>
          </div>
          <div className="home-testimonial">
            <p className="home-testimonial-content">"I found a great electrician through TaskNinja. Quick and hassle-free booking process."</p>
            <p className="home-testimonial-author">- Michael K.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="home-call-to-action">
        <h2 className="home-section-header">Get Started Today!</h2>
        <p className="home-call-to-action-content">
          Ready to book a professional for your home tasks? Browse our services and find the help you need now.
        </p>
        <button className="home-cta-button" onClick={() => navigate('/services')}>Browse Services</button> {/* Navigate to services */}
      </section>

      {/* Information for Seekers and Providers */}
      <section className="home-info-section">
        <h2 className="home-section-header">Connecting Task Providers and Task Seekers</h2>
        <p className="home-info-content">
          TaskNinja is designed to bridge the gap between task providers and task seekers. Our platform allows task seekers to
          easily find service providers in their area, view the services they offer, and check their rates. Whether you need
          a handyman, cleaner, or any other professional, TaskNinja helps you find the right person for the job.
        </p>
        <p className="home-info-content">
          For task providers, TaskNinja offers a simple way to showcase your skills and connect with potential clients. You can
          register on our platform, list the tasks you specialize in, and set your hourly rates. This makes it easy for clients
          to find you and hire you for the services they need.
        </p>
        <p className="home-info-content">
          Join TaskNinja today and start experiencing the benefits of a well-connected service marketplace.
        </p>
      </section>
      {selectedService && <TaskersList service={selectedService} onClose={handleCloseTaskersList} />}
    </div>
  );
};

export default Home;
