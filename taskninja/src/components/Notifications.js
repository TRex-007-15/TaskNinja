import React, { useState, useEffect } from 'react';
import api from '../api';  // Adjust the import path as needed
import './notifications.css';  // Import the CSS file
import { verifyAndRefreshToken } from '../middleware/authmiddleware';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookingPopup from './BookingPopup'; // Import the BookingPopup component
import NotificationItem from './NotificationItem'; // Import the NotificationItem component

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userType, setUserType] = useState(''); // Assuming you can get this from user data

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  const fetchNotifications = async () => {
    const accessToken = await verifyAndRefreshToken();
    if (!accessToken) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/user/notifications');
      setNotifications(response.data);
      const unread = response.data.filter(n => n.status === 0).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    setLoading(true);
    try {
      await api.put(`/notification/open/${notificationId}`);
      await fetchNotifications();  // Re-fetch notifications after marking as read
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingDetails = async (requestId) => {
    const accessToken = await verifyAndRefreshToken();
    if (!accessToken) {
      return;
    }
    try {
      const response = await api.get(`/request/detail/${requestId}`);
      setSelectedBooking(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleNotificationClick = async (requestId) => {
    await fetchBookingDetails(requestId);
    // Mark as read only if the notification is unread
    const notification = notifications.find(n => n.request === requestId);
    if (notification && notification.status === 0) {
      await markAsRead(notification.id); // Assuming notification.id is used to mark as read
    }
    setIsDropdownOpen(false); // Close the dropdown when a notification is clicked
  };

  const handleNotificationDelete = async (notificationId) => {
    setLoading(true);
    try {
      await api.delete(`/notification/delete/${notificationId}`);
      console.log('Notification deleted:', notificationId); // Debugging
      await fetchNotifications();  // Re-fetch notifications after deleting
    } catch (error) {
      console.error("Can't delete notification:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closePopup = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-icon" onClick={toggleDropdown}>
        <NotificationsIcon />
        {unreadCount > 0 && <span className="notification-alert">{unreadCount}</span>}
      </div>
      {isDropdownOpen && (
        <div className="notifications-dropdown">
          <ul>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={handleNotificationClick}
                  onDelete={handleNotificationDelete}
                />
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
        </div>
      )}
      {selectedBooking && (
        <BookingPopup booking={selectedBooking} onClose={closePopup} userType={userType} />
      )}
    </div>
  );
};

export default Notifications;
