import React from 'react';
import Login from './Login.js';
import '../App.css';
const FormContainer = ({ formType, onFormTypeChange }) => (
  <div className="form-container">
 <Login />
  </div>
);

export default FormContainer;
