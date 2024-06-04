import React from "react";
import Navbar from "./components/navbar/navbar";
import './App.css';
import SearchBarFilter from "./components/SearchBar/SearchBar";
const App = () => {
  return (
  <div>
    <div>
      <Navbar/>
    </div>
    <div>
      <h1 className="Header">Book Trusted Help for home tasks</h1>
    </div>
    <div><SearchBarFilter/></div>
  </div>
  );
};

export default App;