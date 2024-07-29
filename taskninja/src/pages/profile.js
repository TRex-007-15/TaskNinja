import React, { useState, useEffect } from 'react';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './profile.css';
import AddressForm from '../components/AddressForm';
import EditAddressForm from '../components/EditAdressForm';
import BookingStatusPane from '../components/BookingStatusPane';
import BookingHistory from '../components/BookingHistory';
import TaskerEditForm from '../components/TaskerEditform';
import { verifyAndRefreshToken } from '../middleware/authmiddleware';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showEditAddressForm, setShowEditAddressForm] = useState(false);
  const [showTaskerEditForm, setShowTaskerEditForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    id: '',
    name: '',
    state: '',
    city: '',
    pincode: '',
    full_address: ''
  });
  const [bookingRequests, setBookingRequests] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [userType, setUsertype] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await verifyAndRefreshToken();
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
        setUsertype(response.data.user_type);
        setLoading(false);
        localStorage.setItem('user_type', response.data.user_type);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
        setLoading(false);
      }
    };

    const fetchBookingRequests = async () => {
      const accessToken = await verifyAndRefreshToken();
      if (!accessToken) {
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/requests/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Booking requests:', response.data);
        setBookingRequests(response.data);
      } catch (error) {
        console.error('Error fetching booking requests:', error);
        setError('Error fetching booking requests. Please try again.');
      }
    };

    const fetchBookingHistory = async () => {
      const accessToken = await verifyAndRefreshToken();
      if (!accessToken) {
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/requests/history/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Booking History:', response.data);
        setBookingHistory(response.data);
      } catch (error) {
        console.error('Error fetching booking history:', error);
        setError('Error fetching booking history. Please try again.');
      }
    };

    fetchUserData();
    fetchBookingRequests();
    fetchBookingHistory();
  }, []);

  const updateTasker = async (updatedData) => {
    setLoading(true);
    const accessToken = await verifyAndRefreshToken();
    const url = `/tasker/update/${userData.id}`;
  
    try {
      const response = await api.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Tasker details updated:', response.data);
      setUserData({ ...userData, ...response.data });
      setShowTaskerEditForm(false);
    } catch (error) {
      console.error('Error updating tasker details:', error);
      setError('Error updating tasker details. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEditTasker = () => {
    setShowTaskerEditForm(true);
  };

  const updateAddress = async (id, updatedData) => {
    setLoading(true);
    const accessToken = await verifyAndRefreshToken();
    const url = `/api/addresses/update/${id}/`;

    try {
      const response = await api.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Address updated:', response.data);

      const updatedAddresses = userData.addresses.map((addr) =>
        addr.id === id ? response.data : addr
      );

      const updatedUserData = { ...userData, addresses: updatedAddresses };
      setUserData(updatedUserData);
      setShowEditAddressForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating address:', error);
      setError('Error updating address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async (updatedAddress) => {
    const { id, ...updatedData } = updatedAddress;
    await updateAddress(id, updatedData);
  };

  const handleEditAddress = (addr) => {
    setAddress(addr);
    setShowEditAddressForm(true);
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
    setLoading(true);
    const accessToken = await verifyAndRefreshToken();
    const url = `/users/${userData.username}/addresses/`;

    const existingAddress = userData.addresses.find((addr) => addr.name === newAddress.name);

    if (existingAddress) {
      alert(`Address type '${newAddress.name}' already exists.`);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    setLoading(true);

    try {
      const accessToken = await verifyAndRefreshToken();
      const url = `/api/addresses/delete/${id}/`;

      const response = await api.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('Address deleted:', response.data);

      const updatedAddresses = userData.addresses.filter((addr) => addr.id !== id);
      setUserData({ ...userData, addresses: updatedAddresses });

      alert('Address deleted successfully.');
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Error deleting address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="booking-status-pane profile-section">
          <BookingHistory bookingHistory={bookingHistory} />
        </div>
        <div className="user-details-address profile-section">
          <h3>User Details</h3>
          <div className="user-details">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              userData && (
                <div>
                  <div>
                    <strong>Username:</strong> {userData.username}
                  </div>
                  <div>
                    <strong>Email:</strong> {userData.email}
                  </div>
                  {userType === "tasker" && (  // Check if user is a tasker
                    <div>
                      <button onClick={handleEditTasker}>
                        <FontAwesomeIcon icon={faPencilAlt} /> Edit Tasker Details
                      </button>
                    </div>
                  )}
                  <div className="address-list">
                    <h4>Addresses</h4>
                    {userData.addresses.map((addr) => (
                      <div key={addr.id} className="address-item">
                        <div>
                          <strong>{addr.name}:</strong> {addr.full_address}, {addr.city}, {addr.state}, {addr.pincode}
                        </div>
                        <div className="address-actions">
                          <button onClick={() => handleEditAddress(addr)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </button>
                          <button onClick={() => handleDeleteAddress(addr.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className='addbut' onClick={handleAddAddress}>
                      <FontAwesomeIcon icon={faPlus} /> Add Address
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <BookingStatusPane bookingRequests={bookingRequests} setBookingRequests={setBookingRequests} userType={userType} />
      </div>
      {showAddressForm && (
        <div className="overlay">
          <AddressForm
            onSubmit={handleSaveNewAddress}
            onCancel={() => setShowAddressForm(false)}
            existingAddresses={userData.addresses}
          />
        </div>
      )}
      {showEditAddressForm && (
        <div className="overlay">
          <EditAddressForm
            onSubmit={handleUpdateAddress}
            onCancel={() => setShowEditAddressForm(false)}
            address={address}
            existingAddresses={userData.addresses}
          />
        </div>
      )}
      {showTaskerEditForm && (
        <div className="overlay">
          <TaskerEditForm
            tasker={userData}
            onSubmit={updateTasker}
            onCancel={() => setShowTaskerEditForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
