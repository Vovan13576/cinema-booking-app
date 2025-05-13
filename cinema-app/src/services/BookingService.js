const BOOKINGS_KEY = 'cinema_bookings_v2';

export const saveBooking = (bookingData) => {
  const bookings = getBookings();
  const newBooking = {
    id: Date.now().toString(),
    ...bookingData,
    bookedAt: new Date().toISOString()
  };
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...bookings, newBooking]));
  return Promise.resolve(newBooking); // Повертаємо Promise для асинхронності
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
};

export const getBookingsForMovie = (movieId) => {
  return getBookings().filter(booking => booking.movieId === movieId);
};