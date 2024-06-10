// src/Footer.js
import React from 'react';
import './footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We are a team of passionate developers dedicated to creating beautiful web experiences.
          </p>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: support@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
