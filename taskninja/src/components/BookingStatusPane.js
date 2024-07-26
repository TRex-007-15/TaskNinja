import React, { useState, useEffect } from 'react';
import api from '../api'; // Ensure you have configured axios instance
import BookingPopup from './BookingPopup';
import ConfirmationPopup from './ConfirmationPopup'; // Import the ConfirmationPopup component
import './BookingStatusPane.css'; // Import the CSS file for styling
import { verifyAndRefreshToken } from '../middleware/authmiddleware';

const BookingStatusPane = ({ bookingRequests, setBookingRequests, userType }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState({ show: false, action: null, req_id: null });

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

  const confirmAction = (action, req_id) => {
    setConfirmation({ show: true, action, req_id });
  };

  const performAction = async () => {
    const { action, req_id } = confirmation;
    const accessToken = await verifyAndRefreshToken();
    if (!accessToken) {
      setError('Access token not found.');
      return;
    }

    try {
      let response;
      switch (action) {
        case 'accept':
          response = await api.put(`/tasker/accept/${req_id}`, null, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          console.log('Request accepted:', response.data);
          setBookingRequests((prevRequests) =>
            prevRequests.map((req) =>
              req.req_id === req_id ? { ...req, status: 2 } : req
            )
          );
          break;
        case 'reject':
          response = await api.put(`/tasker/reject/${req_id}`, null, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          console.log('Request rejected:', response.data);
          setBookingRequests((prevRequests) =>
            prevRequests.map((req) =>
              req.req_id === req_id ? { ...req, status: 4 } : req
            )
          );
          break;
        case 'cancel':
          response = await api.put(`/cancel/${req_id}`, null, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          console.log('Request cancelled:', response.data);
          setBookingRequests((prevRequests) =>
            prevRequests.map((req) =>
              req.req_id === req_id ? { ...req, status: 4 } : req
            )
          );
          break;
        default:
          throw new Error('Unknown action');
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      setError(error.response?.data?.error || `Error ${action}ing request. Please try again.`);
    } finally {
      setConfirmation({ show: false, action: null, req_id: null });
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="booking-status-pane profile-section">
      <h3>Requested Bookings</h3>
      {error && <p className="error">{error}</p>}
      <div className="booking-history-container">
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
                  <strong>Name </strong> : <span>{req.username}</span>
                </div>
                <div>
                  <strong>Service Description:</strong> <span>{req.service_desc}</span>
                </div>
                <div>
                  <strong>Service Date:</strong> <span>{formatDate(req.service_date)}</span>
                </div>
              </div>
              <div className="booking-actions">
                {req.status === 1 && (
                  <>
                    {userType === "tasker" && (
                      <button
                        className="accept-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmAction('accept', req.req_id);
                        }}
                      >
                        Accept
                      </button>
                    )}
                    {userType === "tasker" && (
                      <button
                        className="reject-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmAction('reject', req.req_id);
                        }}
                      >
                        Reject
                      </button>
                    )}
                  </>
                )}
                {(req.status === 1 || req.status === 2) && (
                  <button
                    className="cancel-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmAction('cancel', req.req_id);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No booking requests found.</p>
        )}
      </div>

      {selectedBooking && (
        <BookingPopup booking={selectedBooking} onClose={handleClosePopup} userType={userType} />
      )}

      {confirmation.show && (
        <ConfirmationPopup
          message={`Are you sure you want to ${confirmation.action} this request?`}
          onConfirm={performAction}
          onCancel={() => setConfirmation({ show: false, action: null, req_id: null })}
        />
      )}
    </div>
  );
};

export default BookingStatusPane;