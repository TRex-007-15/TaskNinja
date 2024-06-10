import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import FormContainer from "./components/FormContainer";
import Services from "./components/services";
import Logo from "./components/images/logo.jpg"
import BecomeTasker from "./pages/BecomeTasker";
import './App.css';

const App = () => {
  const [view, setView] = useState("home");
  const [formType, setFormType] = useState("login");
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { name: "Packers and Movers", image: Logo },
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
  };


  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
        <Navbar onLoginClick={handleLoginClick}/>
        <Routes>
          <Route path="/" element={
        <Home 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredServices={filteredServices}
        />
          } />
          <Route path="/form" element={
            <FormContainer formType={formType} onFormTypeChange={setFormType} />
          } />
          <Route path="/services" element={
            <Services services={services} />
          } />
          <Route path="/BecomeTasker" element={
            <BecomeTasker />
          }/>
        </Routes>
    </div>
  );
};

export default App;
