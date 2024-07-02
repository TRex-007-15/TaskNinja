import React, { useState } from 'react';
import BookingPopup from '../pages/BookingPopup';
import './BookingStatusPane.css'; // Import the CSS file for styling

const BookingStatusPane = ({ bookingRequests }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

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
      case 3:
        return 'green';
      default:
        return 'red';
    }
  };

  return (
    <div className="booking-status-pane profile-section">
      <h3>Requested Bookings</h3>
      {bookingRequests.length > 0 ? (
        bookingRequests.map((req) => (
          <div
            key={req.req_id}
            className='booking-card'
            onClick={() => handleCardClick(req)}
          >
            <div
              className='status-indicator'
              style={{ backgroundColor: getStatusColor(req.status) }}
            ></div>
            <div className='booking-details'>
              <div>
                <strong>Request ID:</strong> <span>{req.req_id}</span>
              </div>
              <div>
                <strong>Service Description:</strong> <span>{req.service_desc}</span>
              </div>
            </div>
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
