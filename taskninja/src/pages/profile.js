import React, { useState, useEffect } from 'react';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './profile.css'; // Import the CSS file for styling
import AddressForm from '../components/AddressForm'; // Corrected typo in component import

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    id: '',
    name: '',
    state: '',
    city: '',
    pincode: '',
    full_address: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/user/data/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('User data:', response.data);
        setUserData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserData();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value
    });
  };

  const updateAddress = async (id, updatedData) => {
    setLoading(true); // Set loading to true when updating address
    const accessToken = localStorage.getItem('access_token');
    const url = `/api/addresses/update/${id}/`;

    try {
      const response = await api.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Address updated:', response.data);

      const updatedAddresses = userData.addresses.map(addr =>
        addr.id === id ? response.data : addr
      );

      const updatedUserData = { ...userData, addresses: updatedAddresses };
      setUserData(updatedUserData);
      setShowAddressForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating address:', error);
      setError('Error updating address. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after update attempt
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const { id, ...updatedData } = address;
    await updateAddress(id, updatedData);
  };

  const handleEditAddress = (addr) => {
    setAddress(addr);
    setShowAddressForm(true);
    setIsEditing(true);
  };

  const handleAddAddress = () => {
    setAddress({
      id: '',
      name: 'Home',
      state: '',
      city: '',
      pincode: '',
      full_address: ''
    });
    setShowAddressForm(true);
    setIsEditing(false);
  };

  const handleSaveNewAddress = async (newAddress) => {
    setLoading(true); // Set loading to true when adding new address
    const accessToken = localStorage.getItem('access_token');
    const url = `/users/${userData.username}/addresses/`;
  
    // Check if the address type already exists
    const existingAddress = userData.addresses.find(addr => addr.name === newAddress.name);
  
    if (existingAddress) {
      alert(`Address type '${newAddress.name}' already exists.`);
      setLoading(false); // Reset loading state
      return;
    }
  
    try {
      const response = await api.post(url, newAddress, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Address added:', response.data);
  
      const updatedUserData = { ...userData, addresses: [...userData.addresses, response.data] };
      setUserData(updatedUserData);
      setShowAddressForm(false);
    } catch (error) {
      console.error('Error adding address:', error);
      setError('Error adding address. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the address addition attempt
    }
  };
  

  const handleDeleteAddress = async (id) => {
    setLoading(true);
  
    try {
      const accessToken = localStorage.getItem('access_token');
      const url = `/api/addresses/delete/${id}/`;
  
      const response = await api.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      console.log('Address deleted:', response.data);
  
      const updatedAddresses = userData.addresses.filter(addr => addr.id !== id);
      setUserData({ ...userData, addresses: updatedAddresses });
  
      // Optional: Show a success message to the user
      alert('Address deleted successfully.');
    } catch (error) {
      console.error('Error deleting address:', error);
      // Show an error message to the user without altering the user data or dashboard
      alert('Error deleting address. Please try again.');
    } finally {
      setLoading(false); // Ensure loading state is set to false
    }
  };
  
  
  

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
              <strong>Addresses:</strong>
              <div className="profile-address">
                {userData.addresses && userData.addresses.map((addr) => (
                  <div key={addr.id} className="address-item">
                    <div>
                      <span className="address-type">{addr.name}:</span>
                      <span>{addr.full_address}, </span>
                      <span>{addr.city}, {addr.state} - {addr.pincode}</span>
                    </div>
                    <div>
                      <button onClick={() => handleEditAddress(addr)}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button onClick={() => handleDeleteAddress(addr.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="add-address-button" onClick={handleAddAddress}>
          <FontAwesomeIcon icon={faPlus} /> Add Address
        </button>
      </div>

      {showAddressForm && (
        <div className="address-form">
          {isEditing ? (
            <div>
              <h3>Update Address</h3>
              <form onSubmit={handleUpdateAddress}>
                <div>
                  <label>Name:</label>
                  <select
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    required
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {address.name === 'Other' && (
                  <div>
                    <label>Address Type:</label>
                    <input
                      type="text"
                      name="customName"
                      value={address.customName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                )}
                <div>
                  <label>State:</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div>
                  <label>Pincode:</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div>
                  <label>Full Address:</label>
                  <textarea
                    name="full_address"
                    value={address.full_address}
                    onChange={handleAddressChange}
                    required
                  ></textarea>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowAddressForm(false)}>Cancel</button>
              </form>
            </div>
          ) : (
            <AddressForm 
              onSubmit={handleSaveNewAddress}
              onCancel={() => setShowAddressForm(false)} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
