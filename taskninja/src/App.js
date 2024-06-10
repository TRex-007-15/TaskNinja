import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import FormContainer from "./components/FormContainer";
import Services from "./components/services";
import Footer from "./components/footer";
import Logo from "./components/images/logo.jpg"
import './App.css';
import Cover from "./components/images/s1.jpg";
import Home from './pages/Home'; // Import Home component

const App = () => {
  const [view, setView] = useState("home");
  const [formType, setFormType] = useState("login");
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { name: "Packers and Movers", image: "/Users/utsavishnoi/Desktop/TaskNinja/taskninja/src/packers_and_movers.webp" },
    { name: "Plumbers", image: "/images/plumbers.jpg" },
    { name: "Electricians", image: "/images/electricians.jpg" },
    { name: "Cleaning Services", image: "/images/cleaning_services.jpg" },
    { name: "Carpenters", image: "/images/carpenters.jpg" },
    { name: "Pest Control", image: "/images/pest_control.jpg" },
    { name: "Painters", image: "/images/painters.jpg" },
    { name: "AC Services", image: "/images/ac_services.jpg" },
    { name: "Gardening", image: "/images/gardening.jpg" },
    { name: "Home Security", image: "/images/home_security.jpg" },
    { name: "Laundry", image: "/images/laundry.jpg" },
    { name: "Moving Services", image: "/images/moving_services.jpg" },
    { name: "Home Cleaning", image: "/images/home_cleaning.jpg" },
    { name: "Furniture Assembly", image: "/images/furniture_assembly.jpg" },
    { name: "Computer Repair", image: "/images/computer_repair.jpg" },
    { name: "Interior Design", image: "/images/interior_design.jpg" }
  ];

  const handleLoginClick = () => {
    setFormType("login");
    setView("form");
  };

  const handleSignupClick = () => {
    setFormType("signup");
    setView("form");
  };

  const handleServices = () => {
    setView("services");
  };

  const handleHomeClick = () => {
    setView("home");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar 
        onHomeClick={handleHomeClick} 
        onLoginClick={handleLoginClick} 
        onSignupClick={handleSignupClick} 
        onServiceClick={handleServices} 
      />
      {/* Render Home component when view is "home" */}
      {view === "home" && (
        <Home 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredServices={filteredServices}
        />
      )}
      {/* Render Footer component */}
      <Footer />
    </div>
  );
};

export default App;
