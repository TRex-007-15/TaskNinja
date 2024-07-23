import React, { useState, useEffect } from 'react';
import api from '../api';  // Adjust the import path as needed
import './notifications.css';  // Import the CSS file

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/user/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    setLoading(true);
    try {
      await api.put(`/notification/open/${notificationId}`);
      // Update the notification state in the UI immediately
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, status: 1 }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notifications-dropdown">
      <button className="close-btn" onClick={() => {/* Close dropdown logic */}}>×</button>
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
  );
};

export default Notifications;