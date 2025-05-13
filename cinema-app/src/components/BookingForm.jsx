import React, { useState } from 'react';
import { saveBooking } from '../services/BookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = ({ movieId, selectedSeats, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?\d{10,12}$/;
    return re.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Ім'я обов'язкове";
    if (!formData.email) {
      newErrors.email = "Email обов'язковий";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Введіть коректний email";
    }
    if (!formData.phone) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Введіть коректний телефон";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const bookingData = {
      movieId,
      seats: selectedSeats,
      customer: formData,
      bookingDate: new Date().toISOString()
    };

    saveBooking(bookingData);
    toast.success('Бронювання успішно завершено!');
    onBookingSuccess();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3>Форма бронювання</h3>
      
      <div className="form-group">
        <label>Ім'я:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Телефон:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Вибрані місця:</label>
        <div>{selectedSeats.join(', ')}</div>
      </div>

      <button type="submit" className="submit-button">Підтвердити бронювання</button>
    </form>
  );
};

export default BookingForm;