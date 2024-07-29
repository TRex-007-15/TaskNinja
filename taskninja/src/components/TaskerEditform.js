import React, { useState } from 'react';
import './TaskerEditForm.css';

const TaskerEditForm = ({ tasker, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState(tasker.first_name);
  const [lastName, setLastName] = useState(tasker.last_name);
  const [email, setEmail] = useState(tasker.email);
  const [price, setPrice] = useState(tasker.price);
  const [pricePerDay, setPricePerDay] = useState(tasker.price_per_day);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTasker = { first_name: firstName, last_name: lastName, email, price, price_per_day: pricePerDay };
    onSubmit(updatedTasker);
  };

  return (
    <form onSubmit={handleSubmit} className="tasker-edit-form">
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price per day:</label>
        <input
          type="number"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskerEditForm;
