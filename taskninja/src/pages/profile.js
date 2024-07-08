import React, { useState, useEffect } from 'react';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './profile.css'; // Import the CSS file for styling
import AddressForm from '../components/AddressForm'; // Corrected typo in component import
import BookingStatusPane from '../components/BookingStatusPane'; // Import the new component
import BookingHistory from '../components/BookingHistory';
import { verifyAndRefreshToken } from '../middleware/authmiddleware';

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
  const [bookingRequests, setBookingRequests] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
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
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
        setLoading(false); // Set loading to false in case of error
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

    const fetchBookingHistory = async () =>
    {
      const accessToken = await verifyAndRefreshToken();
      if (!accessToken) {
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('requests/history/', {
          headers : {
            Authorization : `Bearer ${accessToken}`
          }
        });
        console.log('Booking History:', response.data);
        setBookingHistory(response.data);
      }
      catch(error)
      {
        console.error('Error fetching booking history:', error);
        setError('Error fetching booking history. Please try again.');
      }

    }

    fetchUserData();
    fetchBookingRequests();
    fetchBookingHistory();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };
  

  const updateAddress = async (id, updatedData) => {
    setLoading(true); // Set loading to true when updating address
    const accessToken = await verifyAndRefreshToken();
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
    const accessToken = await verifyAndRefreshToken();
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
      const accessToken = await verifyAndRefreshToken();
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
      setLoading(false); // Ensure loading is set to false after attempting deletion
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="booking-status-pane profile-section">
          <BookingHistory bookingHistory={bookingHistory}/>
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
                    <button onClick={handleAddAddress}>
                      <FontAwesomeIcon icon={faPlus} /> Add Address
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <BookingStatusPane bookingRequests={bookingRequests} setBookingRequests={setBookingRequests} />
      </div>

      {showAddressForm && (
        <div className="address-form overlay">
          {isEditing ? (
            <div>
              <h3>Update Address</h3>
              <form onSubmit={handleUpdateAddress}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>Full Address</label>
                  <textarea
                    name="full_address"
                    value={address.full_address}
                    onChange={handleAddressChange}
                  />
                </div>
                <button type="submit">Update Address</button>
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