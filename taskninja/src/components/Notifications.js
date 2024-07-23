import React, { useState, useEffect } from 'react';
import api from '../api';  // Adjust the import path as needed
import './notifications.css';  // Import the CSS file
import { verifyAndRefreshToken } from '../middleware/authmiddleware';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  const fetchNotifications = async () => {
    const access_token = await verifyAndRefreshToken();
    if (!access_token) {
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
                <li
                  key={notification.id}
                  className={`notification-item ${notification.status === 0 ? 'unread' : 'read'}`}
                >
                  <p>{notification.message}</p>
                  {notification.status === 0 && (
                    <button 
                      onClick={() => markAsRead(notification.notification_id)} 
                      disabled={loading}
                    >
                      {loading ? 'Marking as Read...' : 'Mark as Read'}
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
