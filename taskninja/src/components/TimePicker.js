import React, { useState } from 'react';

const TimePicker = ({ value, onChange,appointmentDate }) => {
  const [time, setTime] = useState(value);

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const selectedHour = parseInt(selectedTime.split(':')[0], 10);
    const selectedMinute = parseInt(selectedTime.split(':')[1], 10);

    const allowedStartHour = 9;
    const allowedEndHour = 22; // 10 PM in 24-hour format

    // Check if selected time is within allowed hours
    if (selectedHour < allowedStartHour || selectedHour >= allowedEndHour) {
      window.alert('Please select a time between 9 AM and 10 PM.');
      return;
    }

    // Get the current time
    const currentTime = new Date();
    console.log(currentTime);
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Check if the selected time is at least one hour ahead of the current time
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const selectedTotalMinutes = selectedHour * 60 + selectedMinute;
    const bufferMinutes = 60;

    if (selectedTotalMinutes < currentTotalMinutes + bufferMinutes && currentTime === appointmentDate) {
      window.alert('Please select a time at least one hour from the current time.');
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
