import React, { useState, useEffect } from 'react';
import api from '../api';
import './profile.css'; // Import the CSS file for styling
import '../components/Footer'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/api/userdata/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('User data:', response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="user-profile">
          <h2>User Profile</h2>
          <div className="profile-info">
            <div className="profile-item">
              <strong>Username:</strong> <span>{userData.username}</span>
            </div>
            <div className="profile-item">
              <strong>Contact Number:</strong> <span>{userData.contact_number}</span>
            </div>
            <div className="profile-item">
              <strong>Email:</strong> <span>{userData.email}</span>
            </div>
            <div className="profile-item">
              <strong>Name:</strong> <span>{userData.first_name} {userData.last_name}</span>
            </div>
            <div className="profile-item">
              <strong>Address:</strong>
              <div className="profile-address">
                <span>{userData.address}</span>
                <span>{userData.city}, {userData.state} - {userData.pincode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
