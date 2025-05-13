import React, { useEffect, useState } from 'react';
import { getBookingsForMovie } from '../services/BookingService';
import './CinemaHall.css';

const CinemaHall = ({ movieId, onSeatSelect, selectedSeats = [] }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const rows = 5;
  const seatsPerRow = 10;

  useEffect(() => {
    if (movieId) {
      const bookings = getBookingsForMovie(movieId);
      const allBookedSeats = bookings.flatMap(booking => booking.seats);
      setBookedSeats(allBookedSeats);
    }
  }, [movieId]);

  const handleSeatClick = (seatId) => {
    if (!bookedSeats.includes(seatId)) {
      onSeatSelect(seatId);
    }
  };

  return (
    <div className="cinema-hall-container">
      <div className="screen">ЕКРАН</div>
      <div className="seats-grid">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={`row-${rowNumber}`} className="seat-row">
              <div className="row-number">{rowNumber}</div>
              <div className="seats-in-row">
                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                  const seatNumber = seatIndex + 1;
                  const seatId = `r${rowNumber}s${seatNumber}`;
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={isBooked}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="seat-sample available"></div>
          <span>Вільні</span>
        </div>
        <div className="legend-item">
          <div className="seat-sample selected"></div>
          <span>Вибрані</span>
        </div>
        <div className="legend-item">
          <div className="seat-sample booked"></div>
          <span>Заброньовані</span>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;