import React from "react";
import Navbar from "./components/navbar/navbar";
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <h1 className="Header">Book Trusted Help for home tasks</h1>
      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Search for tasks or help..." />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default App;
