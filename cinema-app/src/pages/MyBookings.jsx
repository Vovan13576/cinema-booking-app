import React, { useState } from 'react';
import { getBookings, deleteBooking, deleteSeatsFromBooking } from '../services/BookingService';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState(getBookings());
  const [seatsToDelete, setSeatsToDelete] = useState({});

  const handleDeleteBooking = (bookingId) => {
    deleteBooking(bookingId);
    setBookings(getBookings());
  };

  const handleDeleteSeats = (bookingId) => {
    deleteSeatsFromBooking(bookingId, seatsToDelete[bookingId] || []);
    setBookings(getBookings());
    setSeatsToDelete(prev => ({ ...prev, [bookingId]: [] }));
  };

  const toggleSeatForDeletion = (bookingId, seat) => {
    setSeatsToDelete(prev => {
      const currentSeats = prev[bookingId] || [];
      return {
        ...prev,
        [bookingId]: currentSeats.includes(seat)
          ? currentSeats.filter(s => s !== seat)
          : [...currentSeats, seat]
      };
    });
  };

  return (
    <div className="my-bookings">
      <h1>Керування бронюваннями</h1>
      
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-item">
              <h3>{booking.movieTitle} (ID: {booking.movieId})</h3>
              <p><strong>Користувач:</strong> {booking.userInfo.fullName}</p>
              <p><strong>Телефон:</strong> {booking.userInfo.phone}</p>
              <p><strong>Email:</strong> {booking.userInfo.email}</p>
              
              <div className="seats-section">
                <h4>Місця:</h4>
                <div className="seats-grid">
                  {booking.seats.map(seat => (
                    <div
                      key={seat}
                      className={`seat-badge ${(seatsToDelete[booking.id] || []).includes(seat) ? 'selected-for-delete' : ''}`}
                      onClick={() => toggleSeatForDeletion(booking.id, seat)}
                    >
                      {seat.replace('r', 'Ряд ').replace('s', ' Місце ')}
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-actions">
                {(seatsToDelete[booking.id] || []).length > 0 && (
                  <button
                    onClick={() => handleDeleteSeats(booking.id)}
                    className="delete-seats-btn"
                  >
                    Видалити вибрані місця
                  </button>
                )}
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="delete-booking-btn"
                >
                  Видалити все бронювання
                </button>
              </div>
              
              <p className="booking-date">
                <small>Заброньовано: {new Date(booking.bookedAt).toLocaleString()}</small>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Немає активних бронювань</p>
      )}
    </div>
  );
};

export default MyBookings;