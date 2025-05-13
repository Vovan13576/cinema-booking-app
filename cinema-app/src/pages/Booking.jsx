import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import { saveBooking } from '../services/BookingService';
import { movies } from '../data/movies';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const movie = movies.find(m => m.id === parseInt(id));

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  const handleBookingSubmit = (userData) => {
    saveBooking({
      movieId: id,
      movieTitle: movie.title,
      seats: selectedSeats,
      userInfo: userData
    });
    navigate('/my-bookings');
  };

  if (!movie) {
    return <div>Фільм не знайдено</div>;
  }

  return (
    <div className="booking-page">
      {!showForm ? (
        <>
          <h1>Бронювання місць для: {movie.title}</h1>
          <CinemaHall 
            movieId={id}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
          {selectedSeats.length > 0 && (
            <button 
              onClick={() => setShowForm(true)}
              className="proceed-to-booking-btn"
            >
              Продовжити бронювання
            </button>
          )}
        </>
      ) : (
        <BookingForm 
          movieTitle={movie.title}
          selectedSeats={selectedSeats}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default Booking;