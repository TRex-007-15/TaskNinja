import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import './App.css';

const App = () => {
  const [view, setView] = useState("home");
  const [formType, setFormType] = useState("login");

  const services = [
    { name: "Packers and Movers", image: "packers_and_movers.jpg" },
    { name: "Plumbers", image: "plumbers.jpg" },
    { name: "Electricians", image: "electricians.jpg" },
    { name: "Cleaning Services", image: "cleaning_services.jpg" },
    { name: "Carpenters", image: "carpenters.jpg" },
    { name: "Pest Control", image: "pest_control.jpg" },
    { name: "Painters", image: "painters.jpg" },
    { name: "AC Services", image: "ac_services.jpg" },
    { name: "Gardening", image: "gardening.jpg" },
    { name: "Home Security", image: "home_security.jpg" },
    { name: "Laundry", image: "laundry.jpg" },
    { name: "Moving Services", image: "moving_services.jpg" },
    { name: "Home Cleaning", image: "home_cleaning.jpg" },
    { name: "Furniture Assembly", image: "furniture_assembly.jpg" },
    { name: "Computer Repair", image: "computer_repair.jpg" },
    { name: "Interior Design", image: "interior_design.jpg" }
  ];

  const handleLoginClick = () => {
    setFormType("login");
    setView("form");
  };

  const handleSignupClick = () => {
    setFormType("signup");
    setView("form");
  };

  const handleBackToHome = () => {
    setView("home");
  };

  return (
    <div>
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      {view === "home" && (
        <>
          <h1 className="Header">Book Trusted Help for Home Tasks</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for tasks or help..."
            />
            <button className="search-button">Search</button>
          </div>
          <div className="services-container">
            {services.map((service, index) => (
              <ServiceTile key={index} service={service} />
            ))}
          </div>
        </>
      )}
      {view === "form" && (
        <FormContainer formType={formType} onFormTypeChange={setFormType} onBackClick={handleBackToHome} />
      )}
    </div>
  );
};

const ServiceTile = ({ service }) => (
  <div className="service-tile">
    <img src={service.image} alt={service.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
    <div className="service-name">{service.name}</div>
  </div>
);

const FormContainer = ({ formType, onFormTypeChange, onBackClick }) => (
  <div className="form-container">
    {formType === "login" ? <h2>Login</h2> : <h2>Sign Up</h2>}
    <form>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" />
      </div>
      {formType === "signup" && (
        <div className="form-group">
          <label>Email:</label>
          <input type="email" />
        </div>
      )}
      <button type="submit" className="form-button">
        {formType === "login" ? "Login" : "Sign Up"}
      </button>
      <button type="button" className="form-button" onClick={onBackClick}>Back</button>
    </form>
    <button type="button" className="form-button" onClick={() => onFormTypeChange(formType === "login" ? "signup" : "login")}>
      {formType === "login" ? "Switch to Sign Up" : "Switch to Login"}
    </button>
  </div>
);

export default App;
