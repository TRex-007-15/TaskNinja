// components/navbar/navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';  // Import the CSS file
import Logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ onLoginClick, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      onLoginClick();
      navigate('/form');
    }
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
          <Link to="/form" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>Login/Signup</Link>
        </li>
        <li className="nav-item">
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
        </li>
        <li className="nav-item">
          <button className="nav-button">
            <Link to="/BecomeTasker" onClick={() => setIsMenuOpen(false)}>Become Tasker</Link>
          </button>
        </li>
        <li className="nav-item" onClick={handleProfileClick}>
          <AccountCircleIcon className="user-icon" />
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
