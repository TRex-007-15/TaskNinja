import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionTimer = ({ onLogout }) => {
    const [logoutTime, setLogoutTime] = useState(Date.now() + 300000); // 5 minutes in milliseconds
    const navigate = useNavigate();

    useEffect(() => {
    const interval = setInterval(() => {
        if (Date.now() > logoutTime) {
        onLogout(); // Call logout function if time is up
        clearInterval(interval);
        navigate('/login'); // Redirect to login page
        }
    }, 1000); // Check every second

    return () => clearInterval(interval);
    }, [logoutTime, onLogout, navigate]);

  // Reset timer when user interacts
    const resetTimer = () => {
    setLogoutTime(Date.now() + 600000); // Reset to 5 minutes ahead
    };

  // Add event listeners to reset timer on user interaction
    useEffect(() => {
    const resetTimerOnInteraction = () => {
    resetTimer();
    };

    document.addEventListener('mousedown', resetTimerOnInteraction); // Example interaction event

    return () => {
        document.removeEventListener('mousedown', resetTimerOnInteraction);
    };
    }, []);

  return null; // No UI elements needed for the timer itself
};

export default SessionTimer;
