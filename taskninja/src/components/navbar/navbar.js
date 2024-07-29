import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';  // Import the CSS file
import Logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Notifications from '../Notifications';  // Adjust the import path as needed

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const isLoggedIn = accessToken && refreshToken;
  const userType = localStorage.getItem('user_type');
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
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('user_type');
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
    <div className="navbar-container">
      {!isLoggedIn ? (<div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>):(<div className="navbar-logo">
        <img src={Logo} alt="Logo" />
        </div>)}
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        {!isLoggedIn && (
          <li className="navbar-item">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
        )}
        {isLoggedIn ? (
          <>
            {userType === "user" && (
              <li className="navbar-item">
                <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
              </li>
            )}
            <li className="navbar-item" onClick={handleProfileClick}>
              <AccountCircleIcon className="navbar-user-icon" />
            </li>
            <li className="navbar-item">
              <Notifications />
            </li>
            <li className="navbar-item">
              <button className="navbar-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            </li>
            <li className="navbar-item">
              <button className="navbar-button" onClick={handleBecomeTaskerClick}>
                {location.pathname === '/BecomeTasker' ? 'Register as User' : 'Register as Tasker'}
              </button>
            </li>
            <li className="navbar-item">
              <Link to="/form" onClick={handleLoginClick}>Login</Link>
            </li>
          </>
        )}
      </ul>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
