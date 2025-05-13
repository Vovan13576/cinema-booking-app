const BOOKINGS_KEY = 'cinema_bookings_v5';

// Зберегти бронювання
export const saveBooking = (bookingData) => {
  const bookings = getBookings();
  const newBooking = {
    id: Date.now().toString(),
    ...bookingData,
    bookedAt: new Date().toISOString()
  };
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...bookings, newBooking]));
  return newBooking;
};

// Отримати всі бронювання
export const getBookings = () => {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
};

// Отримати бронювання для конкретного фільму
export const getBookingsForMovie = (movieId) => {
  return getBookings().filter(booking => booking.movieId === movieId);
};

// Видалити конкретне бронювання
export const deleteBooking = (bookingId) => {
  const bookings = getBookings();
  const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  return updatedBookings;
};

// Видалити конкретні місця з бронювання
export const deleteSeatsFromBooking = (bookingId, seatsToRemove) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking => {
    if (booking.id === bookingId) {
      return {
        ...booking,
        seats: booking.seats.filter(seat => !seatsToRemove.includes(seat))
      };
    }
    return booking;
  });
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  return updatedBookings;
};