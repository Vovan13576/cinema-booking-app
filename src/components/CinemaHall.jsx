import React, { useState } from 'react';

const CinemaHall = ({ rows = 5, seatsPerRow = 10 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
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
        rowSeats.push(
          <div 
            key={seatId}
            className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatId)}
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