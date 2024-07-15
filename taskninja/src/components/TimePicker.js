// TimePicker.js

import React, { useState } from 'react';

const TimePicker = ({ value, onChange }) => {
  const [time, setTime] = useState(value);

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    // Perform any validation or restrictions here
    const allowedStartHour = 9;
    const allowedEndHour = 22; // 10 PM in 24-hour format

    const selectedHour = parseInt(selectedTime.split(':')[0], 10);
    if (selectedHour < allowedStartHour || selectedHour > allowedEndHour) {
      window.alert('Please select a time between 9 AM and 10 PM.');
      return;
    }

    setTime(selectedTime);
    onChange(selectedTime);
  };

  return (
    <input
      type="time"
      value={time}
      onChange={handleTimeChange}
    />
  );
};

export default TimePicker;
