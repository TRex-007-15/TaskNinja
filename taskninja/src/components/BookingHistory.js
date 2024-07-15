import React, { useState } from 'react';
import BookingPopup from './BookingPopup';
import './BookingHistory.css'; // Ensure correct import

const BookingHistory = ({ bookingHistory }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCardClick = (req) => {
    setSelectedBooking(req);
  };

  const handleClosePopup = () => {
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return 'yellow';
      case 5: return 'grey';
      case 2: return 'green';
      default: return 'red';
    }
  };

  return (
    <div>
      <h3>Booking History</h3>
      <div className="booking-history-container">
        {bookingHistory && bookingHistory.length > 0 ? (
          bookingHistory.map((req) => (
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
                  <strong>Service Description:</strong> <span>{req.service_desc}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No booking history found.</p>
        )}
      </div>

      {selectedBooking && (
        <BookingPopup booking={selectedBooking} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default BookingHistory;
