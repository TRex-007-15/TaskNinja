import React from 'react';
import './BookingPopup.css'; // Import the CSS file for styling

const BookingPopup = ({ booking, onClose }) => {
  return (
    <div className="booking-popup">
      <div className="booking-popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className='popup-details'>
          <div>
            <strong>Request ID:</strong> <span>{booking.req_id}</span>
          </div>
          <div>
            <strong>Service Description:</strong> <span>{booking.service_desc}</span>
          </div>
          <div>
            <strong>Address:</strong> <span>{booking.address}</span>
          </div>
          <div>
            <strong>Status: <span>{booking.status}</span></strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
