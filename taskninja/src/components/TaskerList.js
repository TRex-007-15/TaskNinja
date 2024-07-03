import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskerList.css';
import api from '../api';
import moment from 'moment';

const TaskersList = ({ service, onClose }) => {
  const [taskers, setTaskers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceDesc, setServiceDesc] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskerId, setSelectedTaskerId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskers = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          setError('Access token not found.');
          setLoading(false);
          return;
        }
        if (!service || !service.name) {
          setError('Service not specified.');
          setLoading(false);
          return;
        }
        const serviceName = service.name;
        const response = await api.get(`/taskers/${serviceName}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.data;
        setTaskers(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setTaskers([]);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

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
        setUserData(response.data);
      } catch (error) {
        setError('Error fetching user data. Please try again.');
      }
    };

    fetchTaskers();
    fetchUserData();
  }, [service]);

  const handleAddressChange = (e) => {
    const selectedAddressId = parseInt(e.target.value, 10);
    setSelectedAddressId(selectedAddressId);
  };

  const handleBooking = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found.');
      }

      if (!userData) {
        throw new Error('User data not available.');
      }

      if (!serviceDesc) {
        throw new Error('Service description is required.');
      }

      if (!appointmentDate) {
        throw new Error('Appointment date is required.');
      }

      const formattedDate = moment(appointmentDate).format('YYYY-MM-DD');

      const requestBody = {
        user: userData.id,
        tasker: selectedTaskerId,
        service_desc: serviceDesc,
        service_date: formattedDate,
        status: 1,
        address: selectedAddressId // Pass the selectedAddressId
      };

      const response = await api.post('/user/request/', requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Tasker booked successfully!');
      setIsModalOpen(false); // Close the modal
      setServiceDesc(""); // Clear the service description
      setAppointmentDate(""); // Clear the appointment date

      // Redirect to /Profile after successful booking
      navigate('/Profile');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';

      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const { errors } = error.response.data;
        if (errors && typeof errors === 'object') {
          errorMessage = Object.keys(errors).map(key => `${key}: ${errors[key]}`).join('\n');
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  const openModal = (taskerId) => {
    setSelectedTaskerId(taskerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setServiceDesc("");
    setAppointmentDate("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="taskers-list-overlay">
      <div className="taskers-list">
        <h2>Taskers for {service && service.name ? service.name : 'the selected service'}</h2>
        {taskers.length === 0 ? (
          <div>No taskers for this service</div>
        ) : (
          <ul>
            {taskers.map((tasker, index) => (
              <li key={index}>
                <ul>
                  <li>{tasker.first_name} {tasker.last_name}</li>
                  <li>{tasker.contact_number}</li>
                  <li>Price Per Hour: ₹ {tasker.price}</li>
                  <li>Experience: {tasker.experience}</li>
                  <li>
                    <button
                      className='tasker-submit'
                      onClick={() => openModal(tasker.id)}
                    >
                      Book
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}
        <button type="button" onClick={onClose}>Close</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Service Description</h2>
            <label>
              Description:
              <input
                type="text"
                value={serviceDesc}
                onChange={(e) => setServiceDesc(e.target.value)}
              />
            </label>
            <label>
              Appointment Date:
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </label>
            <label>
              Address:
              <select onChange={handleAddressChange} value={selectedAddressId}>
                <option value="">Select an address</option>
                {userData.addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.full_address}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleBooking}>Submit</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskersList;
