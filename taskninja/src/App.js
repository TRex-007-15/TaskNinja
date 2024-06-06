// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import SignupLogin from './pages/SignupLogin';
import BecomeATasker from './pages/BecomeATasker';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} index/>
        <Route path="/services" element={<Services />} />
        <Route path="/signup-login" element={<SignupLogin />} />
        <Route path="/become-a-tasker" element={<BecomeATasker />} />
      </Routes>
    </>
  );
};

export default App;
