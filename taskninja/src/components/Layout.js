// src/components/Layout.js
import React from "react";
import Navbar from "./navbar/navbar";

const Layout = ({ children, onLoginClick, onSignupClick }) => (
  <>
    <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
    {children}
  </>
);

export default Layout;
