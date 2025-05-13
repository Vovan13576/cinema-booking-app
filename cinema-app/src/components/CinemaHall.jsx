import React, { useState, useEffect } from 'react';
import { getBookingsForMovie } from '../services/BookingService';

const CinemaHall = ({ rows = 5, seatsPerRow = 10, movieId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (movieId) {
      const bookings = getBookingsForMovie(movieId);
      const allBookedSeats = bookings.flatMap(booking => booking.seats);
      setBookedSeats(allBookedSeats);
    }
  }, [movieId]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        const isBooked = bookedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);
        
        let seatClass = 'seat';
        if (isBooked) seatClass += ' booked';
        if (isSelected) seatClass += ' selected';

        rowSeats.push(
          <div 
            key={seatId}
            className={seatClass}
            onClick={() => !isBooked && handleSeatClick(seatId)}
          >
            {seat}
          </div>
        );
      }
      seats.push(
        <div key={`row-${row}`} className="seat-row">
          <div className="row-number">{row}</div>
          {rowSeats}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="cinema-hall">
      <div className="screen">Екран</div>
      <div className="seats-container">
        {renderSeats()}
      </div>
      <div className="selected-seats-info">
        <h3>Вибрані місця: {selectedSeats.join(', ')}</h3>
      </div>
    </div>
  );
};

export default CinemaHall;