import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { saveBooking } from '../services/BookingService';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    try {
      await saveBooking({
        movieId: id,
        seats: selectedSeats
      });
      navigate('/my-bookings');
    } catch (error) {
      console.error('Помилка бронювання:', error);
    }
  };

  return (
    <div className="booking-page">
      <h1>Бронювання місць</h1>
      <CinemaHall 
        movieId={id}
        selectedSeats={selectedSeats}
        onSeatSelect={handleSeatSelect}
      />
      <div className="selected-seats-info">
        <h3>Вибрані місця: {selectedSeats.length ? selectedSeats.join(', ') : 'немає'}</h3>
      </div>
      <button 
        onClick={handleBooking}
        disabled={!selectedSeats.length}
        className="book-button"
      >
        Підтвердити бронювання
      </button>
    </div>
  );
};

export default Booking;