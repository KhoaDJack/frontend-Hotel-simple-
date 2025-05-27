import React, { useState, useEffect } from 'react';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    capacity: '',
    pricePerNight: '',
    avatar: ''
  });

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/room');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleAddRoom = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });

      if (response.ok) {
        setNewRoom({
          roomNumber: '',
          capacity: '',
          pricePerNight: '',
          avatar: ''
        });
        fetchRooms();
      } else {
        console.error('Failed to add room');
      }
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Room Number"
          value={newRoom.roomNumber}
          onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Price Per Night"
          value={newRoom.pricePerNight}
          onChange={(e) => setNewRoom({ ...newRoom, pricePerNight: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Avatar URL"
          value={newRoom.avatar}
          onChange={(e) => setNewRoom({ ...newRoom, avatar: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddRoom}>
          Add Room
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Room ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Room Number</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Capacity</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Price/Night</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{room.roomId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{room.roomNumber}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{room.capacity}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>${room.pricePerNight.toFixed(2)}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>
                <img src={room.avatar} alt="Room" style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsPage;