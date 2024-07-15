import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';  // Import the CSS file
import Logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
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
    // Perform logout action (e.g., clear local storage, redirect to login page)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleBecomeTaskerClick = () => {
    if (location.pathname === '/BecomeTasker') {
      navigate('/signup');
    } else {
      navigate('/BecomeTasker');
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        {!isLoggedIn && (
          <li className="nav-item">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
        )}
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
              <button className="nav-button" onClick={handleBecomeTaskerClick}>
                {location.pathname === '/BecomeTasker' ? 'Register as User' : 'Register as Tasker'}
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
