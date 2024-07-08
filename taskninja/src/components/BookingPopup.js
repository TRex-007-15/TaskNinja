import React from 'react';
import './BookingPopup.css'; // Import the CSS file for styling

const BookingPopup = ({ booking, onClose }) => {

  const getStatus = (status) => {
    switch (status) {
      case 1:
        return 'Requested';
      case 5:
        return 'Completed';
      case 2:
        return 'Booked';
      case 3:
        return 'Cancelled';
      default:
        return 'Rejected'
    }
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
          <strong>Date of Service :</strong> <span> {booking.service_date} </span>

          </div>
          <div>
            <strong>Status:</strong> <span>{getStatus(booking.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
