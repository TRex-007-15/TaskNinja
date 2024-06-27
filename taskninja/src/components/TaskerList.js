import React, { useEffect, useState } from 'react';
import './TaskerList.css';
import api from '../api';

const TaskersList = ({ service, onClose }) => {
  const [taskers, setTaskers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskers = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          setError('Access token not found.');
          setLoading(false);
          return;
        }
        const serviceName = service.name;
        console.log(`Fetching taskers for service: ${serviceName}`); // Log the service name or ID
        const response = await api.get(`/taskers/${serviceName}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Response status:', response.status); // Log the response status
        const data = await response.data;
        console.log('Fetched taskers:', data); // Log the fetched data
        setTaskers(data);
      } catch (error) {
        console.error('Error fetching taskers:', error); // Log the error
        if (error.response && error.response.status === 404) {
          setTaskers([]); // Set to empty array if 404
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTaskers();
  }, [service]);

  console.log('Loading:', loading); // Log loading state
  console.log('Error:', error); // Log error state
  console.log('Taskers:', taskers); // Log taskers state

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="taskers-list-overlay">
      <div className="taskers-list">
        <h2>Taskers for {typeof service === 'object' ? service.name : service}</h2>
        {taskers.length === 0 ? (
          <div>No taskers for this service</div>
        ) : (
          <ul>
            {taskers.map((tasker, index) => (
              <li key={index}>
                <ul>
                  <li>{tasker.first_name} {tasker.last_name}</li>
                  <li>{tasker.contact_number}</li>
                  <li>Price Per Hour : ₹ {tasker.price}</li>
                  <li>Experience: {tasker.experience}</li> {/* Display experience */}
                </ul>
              </li>
            ))}
          </ul>
        )}
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskersList;
