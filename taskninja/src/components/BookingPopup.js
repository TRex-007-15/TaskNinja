import React from 'react';
import './BookingPopup.css'; // Import the CSS file for styling

const BookingPopup = ({ booking, onClose, userType }) => {

  const getStatus = (status) => {
    switch (status) {
      case 1:
        return 'Requested';
      case 2:
        return 'Booked';
      case 3:
        return 'Cancelled';
      case 5:
        return 'Completed';
      default:
        return 'Rejected';
    }
  };
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
    <div className="booking-popup">
      <div className="booking-popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="popup-details">
          <div>
            <strong>Request ID:</strong> <span>{booking.req_id}</span>
          </div>
          <div>
            <strong>Service Description:</strong> <span>{booking.service_desc}</span>
          </div>
          {booking.address && booking.address.full_address && (
            <div>
              <strong>Address:</strong> <span>{booking.address.full_address}</span>
            </div>
          )}
          <div>
            <strong>Date of Service:</strong> <span>{formatDate(booking.service_date)}</span>
          </div>
          {userType === "tasker" && (
            <div>
              <strong>Customer Contact Number:</strong> <span>{booking.user_contact_number}</span>
            </div>
          )}
          {userType === "user" && (
            <div>
              <strong>Tasker Contact Number:</strong> <span>{booking.tasker_contact_number}</span>
            </div>
          )}
          <div>
            <strong>Status:</strong> <span>{getStatus(booking.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
