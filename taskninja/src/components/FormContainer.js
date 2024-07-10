import React from 'react';
import Login from './Login.js';
import Signup from '../pages/Signup.js';
import '../App.css';
const FormContainer = ({ formType, onFormTypeChange }) => (
  <div className="form-container">
    {formType === "login" ? <Login /> : <Signup />}
    <button
      type="button"
      className="form-button"
      onClick={() => onFormTypeChange(formType === "login" ? "signup" : "login")}
    >
      {formType === "login" ? "Switch to Sign Up" : "Switch to Login"}
    </button>
  </div>
);

export default FormContainer;
