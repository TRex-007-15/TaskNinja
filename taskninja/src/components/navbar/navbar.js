import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Import the CSS file
import Logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/form" onClick={() => {onLoginClick(); setIsMenuOpen(false);}}>Login/Signup</Link>
        </li>
        <li className="nav-item">
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
        </li>
        <li className="nav-item">
          <button className="nav-button">
            <Link to="/BecomeTasker" onClick={() => setIsMenuOpen(false)}>Become Tasker</Link>
          </button>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
