import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // Import your global styles
import './Home.css';

const Home = ({ searchQuery, setSearchQuery, filteredServices }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-header">Book Trusted Help for Home Tasks</h1>
        <p className="hero-subheader">Find and book top-rated professionals for all your home service needs.</p>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2 className="section-header">Our Services</h2>
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
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2 className="section-header">Why Choose Us?</h2>
        <p className="about-us-content">
          At TaskNinja, we are dedicated to providing you with the best home service professionals. Our team is carefully
          vetted and trained to ensure that you get the highest quality of service. Whether you need help with cleaning,
          plumbing, electrical work, or any other home task, we have the right experts for you.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-header">What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p className="testimonial-content">"TaskNinja made it so easy to find a reliable plumber. The service was excellent!"</p>
            <p className="testimonial-author">- John D.</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-content">"Highly recommend TaskNinja for any home task. Very professional and efficient."</p>
            <p className="testimonial-author">- Sarah W.</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-content">"I found a great electrician through TaskNinja. Quick and hassle-free booking process."</p>
            <p className="testimonial-author">- Michael K.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action">
        <h2 className="section-header">Get Started Today!</h2>
        <p className="call-to-action-content">
          Ready to book a professional for your home tasks? Browse our services and find the help you need now.
        </p>
        <button className="cta-button" onClick={() => navigate('/services')}>Browse Services</button> {/* Navigate to services */}
      </section>

      {/* Information for Seekers and Providers */}
      <section className="info-section">
        <h2 className="section-header">Connecting Task Providers and Task Seekers</h2>
        <p className="info-content">
          TaskNinja is designed to bridge the gap between task providers and task seekers. Our platform allows task seekers to
          easily find service providers in their area, view the services they offer, and check their rates. Whether you need
          a handyman, cleaner, or any other professional, TaskNinja helps you find the right person for the job.
        </p>
        <p className="info-content">
          For task providers, TaskNinja offers a simple way to showcase your skills and connect with potential clients. You can
          register on our platform, list the tasks you specialize in, and set your hourly rates. This makes it easy for clients
          to find you and hire you for the services they need.
        </p>
        <p className="info-content">
          Join TaskNinja today and start experiencing the benefits of a well-connected service marketplace.
        </p>
      </section>
    </div>
  );
};

export default Home;
