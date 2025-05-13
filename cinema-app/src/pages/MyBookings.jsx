import React from 'react';
import { getBookings } from '../services/BookingService';

const MyBookings = () => {
  const bookings = getBookings();

  return (
    <div className="my-bookings">
      <h1>Мої бронювання</h1>
      {bookings.map(booking => (
        <div key={booking.id} className="booking-item">
          <h3>Фільм ID: {booking.movieId}</h3>
          <p>Заброньовані місця:</p>
          <ul>
            {booking.seats.map(seat => (
              <li key={seat}>{seat.replace('r', 'Ряд ').replace('s', ' Місце ')}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;