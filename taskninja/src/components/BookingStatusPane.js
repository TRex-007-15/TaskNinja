import React, { useState } from 'react';
import api from '../api'; // Ensure you have configured axios instance
import BookingPopup from './BookingPopup';
import './BookingStatusPane.css'; // Import the CSS file for styling
const BookingStatusPane = ({ bookingRequests, setBookingRequests }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState(null);
  const handleCardClick = (req) => {
    setSelectedBooking(req);
  };

  const handleClosePopup = () => {
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return 'yellow';
      case 5:
        return 'grey';
      case 2:
        return 'green';
      default:
        return 'red';
    }
  };
  const handleAccept = async (req_id) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('Access token not found.');
      return;
    }

    try {
      const response = await api.put(`/tasker/accept/${req_id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Request accepted:', response.data);
      // Update the booking status locally
      setBookingRequests(prevRequests => 
        prevRequests.map(req => 
          req.req_id === req_id ? { ...req, status: 2 } : req
        )
      );
    } catch (error) {
      console.error('Error accepting request:', error);
      setError('Error accepting request. Please try again.');
    }
  };

  const handleReject = async (req_id) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('Access token not found.');
      return;
    }

    try {
      const response = await api.put(`/tasker/reject/${req_id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Request rejected:', response.data);
      // Update the booking status locally
      setBookingRequests(prevRequests => 
        prevRequests.map(req => 
          req.req_id === req_id ? { ...req, status: 4 } : req
        )
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Error rejecting request. Please try again.');
    }
  };
  return (
    <div className="booking-status-pane profile-section">
      <h3>Requested Bookings</h3>
      {error && <p className="error">{error}</p>}
      {bookingRequests.length > 0 ? (
        bookingRequests.map((req) => (
          <div
            key={req.req_id}
            className="booking-card"
            onClick={() => handleCardClick(req)}
          >
            <div
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(req.status) }}
            ></div>
            <div className="booking-details">
              <div>
                <strong>Request ID:</strong> <span>{req.req_id}</span>
              </div>
              <div>
                <strong>Service Description:</strong>{" "}
                <span>{req.service_desc}</span>
              </div>
            </div>
            {req.status === 1 && (
              <div className="booking-actions">
                <button
                  className="accept-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccept(req.req_id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(req.req_id);
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No booking requests found.</p>
      )}

      {selectedBooking && (
        <BookingPopup booking={selectedBooking} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default BookingStatusPane;
