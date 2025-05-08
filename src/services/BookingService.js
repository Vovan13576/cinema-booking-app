const BOOKINGS_KEY = 'cinema_bookings';

export const saveBooking = (bookingData) => {
  const bookings = getBookings();
  bookings.push(bookingData);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const getBookings = () => {
  const bookingsJson = localStorage.getItem(BOOKINGS_KEY);
  return bookingsJson ? JSON.parse(bookingsJson) : [];
};

export const getBookingsForMovie = (movieId) => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.movieId === movieId);
};