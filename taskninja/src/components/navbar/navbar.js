import React, { useState } from "react";
import Logo from "../images/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import './navbar.css';
const Navbar = ({ onLoginClick, onSignupClick,onServiceClick }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item"><a href="/" onClick={() => setClick(false)}>Home</a></li>
        <li className="nav-item"><a href="/" onClick={(e) => { e.preventDefault(); onServiceClick(); setClick(false); }}>Services</a></li>
        <li className="nav-item"><a href="/" onClick={(e) => { e.preventDefault(); onLoginClick(); setClick(false); }}>Sign up/Login</a></li>
        <li className="nav-item"><a href="/" onClick={(e) => { e.preventDefault(); onSignupClick(); setClick(false); }}>Become a tasker</a></li>
      </ul>
      <div className="Hamburger" onClick={handleClick}>
        {click ? (<FaTimes size={30} style={{ color: '#f8f8f8' }} />) : (<FaBars size={30} style={{ color: '#f8f8f8' }} />)}
      </div>
    </div>
  );
};

export default Navbar;
