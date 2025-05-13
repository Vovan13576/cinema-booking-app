import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './App.css';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;