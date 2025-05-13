import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleSeatsChange = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBookingSuccess = () => {
    setSelectedSeats([]);
    setBookingComplete(true);
  };

  return (
    <div className="booking-page">
      <h1>Бронювання місць</h1>
      <p>Фільм ID: {id}</p>
      
      {!bookingComplete ? (
        <>
          <CinemaHall 
            movieId={id} 
            onSeatsChange={handleSeatsChange} 
          />
          {selectedSeats.length > 0 && (
            <BookingForm 
              movieId={id} 
              selectedSeats={selectedSeats} 
              onBookingSuccess={handleBookingSuccess}
            />
          )}
        </>
      ) : (
        <div className="success-message">
          <h3>Дякуємо за бронювання!</h3>
          <button onClick={() => setBookingComplete(false)}>
            Забронювати ще місця
          </button>
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default Booking;