import React, { useState, useEffect } from 'react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    guestID: '',
    roomID: '',
    checkInDate: '',
    checkOutDate: '',
    bookingStatus: ''
  });

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/booking');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAddBooking = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        setNewBooking({
          guestID: '',
          roomID: '',
          checkInDate: '',
          checkOutDate: '',
          bookingStatus: ''
        });
        fetchBookings();
      } else {
        console.error('Failed to add booking');
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <div className="mb-4">
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Guest ID"
          value={newBooking.guestID}
          onChange={(e) => setNewBooking({ ...newBooking, guestID: parseInt(e.target.value) })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Room ID"
          value={newBooking.roomID}
          onChange={(e) => setNewBooking({ ...newBooking, roomID: parseInt(e.target.value) })}
        />
        <input
          type="datetime-local"
          className="border p-2 mr-2"
          placeholder="Check-In Date"
          value={newBooking.checkInDate}
          onChange={(e) => setNewBooking({ ...newBooking, checkInDate: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 mr-2"
          placeholder="Check-Out Date"
          value={newBooking.checkOutDate}
          onChange={(e) => setNewBooking({ ...newBooking, checkOutDate: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Booking Status"
          value={newBooking.bookingStatus}
          onChange={(e) => setNewBooking({ ...newBooking, bookingStatus: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddBooking}>
          Add Booking
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-400">
            <th style={{ border: '1px solid gray', padding: '8px' }}>Booking ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Guest ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Room ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Check-In</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Check-Out</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingID}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{booking.bookingId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{booking.guestId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{booking.roomId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{new Date(booking.checkInDate).toLocaleString()}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{new Date(booking.checkOutDate).toLocaleString()}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{booking.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;