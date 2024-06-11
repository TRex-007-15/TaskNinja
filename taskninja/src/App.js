import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import FormContainer from "./components/FormContainer";
import Services from "./components/services";
import BecomeTasker from "./pages/BecomeTasker";
import './App.css';
import services from "./ServiceData";

const App = () => {
  const [formType, setFormType] = useState("login");
  const [searchQuery, setSearchQuery] = useState("");


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
            <Services/>
          } />
          <Route path="/BecomeTasker" element={
            <BecomeTasker />
          }/>
        </Routes>
    </div>
  );
};

export default App;
