import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';  // Import the CSS file
import Logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const isLoggedIn = accessToken && refreshToken;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    onLoginClick();
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    // Redirect to home page or login page
    navigate('/');
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
              <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </li>
            <li className="nav-item" onClick={handleProfileClick}>
              <AccountCircleIcon className="user-icon" />
            </li>
          </>
        ) : (
          <>
             <li className="nav-item">
              <button className='nav-button'>
              <Link to="/BecomeTasker" onClick={() => setIsMenuOpen(false)}> Become Tasker</Link>
              </button>
            </li>
            <li className="nav-item">
              <Link to="/form" onClick={handleLoginClick}>Login/Signup</Link>
            </li>
          </>
        )}
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
