import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ movieTitle, selectedSeats, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Будь ласка, введіть ПІБ";
    if (!formData.phone.trim()) newErrors.phone = "Будь ласка, введіть телефон";
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = "Будь ласка, введіть коректний email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Бронювання для: {movieTitle}</h2>
      
      <div className="booking-steps">
        <div className="step active">
          <span>1</span>
          <p>Виберіть місця</p>
        </div>
        <div className="step active">
          <span>2</span>
          <p>Вкажіть дані</p>
        </div>
      </div>

      <div className="selected-seats-display">
        <h4>Вибрані місця:</h4>
        <div className="seats-list">
          {selectedSeats.map(seat => (
            <span key={seat} className="seat-badge">
              {seat.replace('r', 'Ряд ').replace('s', ' Місце ')}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-data-form">
        <div className="form-group">
          <label>ПІБ:</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className={errors.fullName ? 'error' : ''}
            placeholder="Введіть ваше повне ім'я"
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className={errors.phone ? 'error' : ''}
            placeholder="+380XXXXXXXXX"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={errors.email ? 'error' : ''}
            placeholder="example@mail.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <button type="submit" className="submit-booking-btn">
          Забронювати квитки
        </button>
      </form>
    </div>
  );
};

export default BookingForm;