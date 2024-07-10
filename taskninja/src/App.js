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
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password_reset_confirm/:uidb64/:token" element={<ResetPassword />} />
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
