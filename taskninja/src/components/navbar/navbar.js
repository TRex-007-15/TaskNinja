import React,{useState} from "react";
import Logo from "../images/logo.png";
import { FaBars,FaTimes } from "react-icons/fa";
import './navbar.css'
const Navbar = () => {
const [click,SetClick] = useState(false);

const HandleClick = () => SetClick(!click);
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/">Services</a></li>
        <li className="nav-item"><a href="/">Sign up/Login</a></li>
        <li className="nav-item"><a href="/">Become a tasker</a></li>
      </ul>
      <div className="Hamburger" onClick={HandleClick}>
      {click ? (<FaTimes size={30} style={{ color: '#f8f8f8' }} />) : (<FaBars size={30} style={{ color: '#f8f8f8' }} />)}
      </div>
    </div>
  );
};

export default Navbar;
