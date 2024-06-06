// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../images/logo.png';
import './navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
      <li className="nav-item">
          <Link to="/Home" onClick={handleClick}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/services" onClick={handleClick}>Services</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup-login" onClick={handleClick}>Signup/Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/become-a-tasker" onClick={handleClick}>Become a tasker</Link>
        </li>
      </ul>
      <div className="Hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: '#f8f8f8' }} />
        ) : (
          <FaBars size={30} style={{ color: '#f8f8f8' }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
