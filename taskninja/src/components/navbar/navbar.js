import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Import the CSS file
import Logo from '../images/logo.png'

const Navbar = ({ onLoginClick}) => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/form" onClick={onLoginClick}>Login/Signup</Link>
        </li>
        <li className="nav-item">
          <Link to="/services">Services</Link>
        </li>
        <li className="nav-item">
          <button className="nav-button">
          <Link to="/BecomeTasker">Become Tasker</Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
