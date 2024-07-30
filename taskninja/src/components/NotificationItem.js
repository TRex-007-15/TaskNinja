import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
const NotificationItem = ({ notification, onClick, onDelete }) => {
  return (
    <li
      className={`notification-item ${notification.status === 0 ? 'unread' : 'read'}`}
    >
      <p onClick={() => onClick(notification.request)}>{notification.message}</p>
      <button onClick={() => onDelete(notification.notification_id)} className="delete-button"><DeleteIcon/></button>
    </li>
  );
};

export default NotificationItem;
