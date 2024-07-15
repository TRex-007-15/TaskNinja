import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import FormContainer from "./components/FormContainer";
import Services from "./components/services";
import BecomeTasker from "./pages/BecomeTasker";
import Footer from "./components/Footer"; // Import Footer component
import "./App.css";
import services from "./ServiceData";
import Profile from "./pages/profile";
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Signup from './pages/Signup';


const App = () => {
  const [formType, setFormType] = useState("login");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoginClick = () => {
    setFormType("login");
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar onLoginClick={handleLoginClick} />
      <Routes>
        {/* ... existing routes ... */}
        <Route path="/login" element={<Login />} /> {/* Ensure this route is defined */}
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Home
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredServices={filteredServices}
            />
          }
        />
        <Route
          path="/form"
          element={<FormContainer formType={formType} onFormTypeChange={setFormType} />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="/BecomeTasker" element={<BecomeTasker />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/BecomeTasker" element={<BecomeTasker/>}/>
      </Routes>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default App;
