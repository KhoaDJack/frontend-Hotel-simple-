import React, { useState, useEffect } from 'react';

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const fetchGuests = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/guest');
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const handleAddGuest = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuest),
      });

      if (response.ok) {
        setNewGuest({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: ''
        });
        fetchGuests();
      } else {
        console.error('Failed to add guest');
      }
    } catch (error) {
      console.error('Error adding guest:', error);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Guests</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="First Name"
          value={newGuest.firstName}
          onChange={(e) => setNewGuest({ ...newGuest, firstName: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Last Name"
          value={newGuest.lastName}
          onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
        />
        <input
          type="email"
          className="border p-2 mr-2"
          placeholder="Email"
          value={newGuest.email}
          onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Phone Number"
          value={newGuest.phoneNumber}
          onChange={(e) => setNewGuest({ ...newGuest, phoneNumber: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddGuest}>
          Add Guest
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Guest ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.guestId}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{guest.guestId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{guest.firstName}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{guest.lastName}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{guest.email}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{guest.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestsPage;