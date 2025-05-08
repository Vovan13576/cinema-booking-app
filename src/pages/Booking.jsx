import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();

  return (
    <div className="booking-page">
      <h1>Бронювання місць</h1>
      <p>Фільм ID: {id}</p>
      <CinemaHall />
    </div>
  );
};

export default Booking;