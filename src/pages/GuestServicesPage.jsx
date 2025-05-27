import React, { useState, useEffect } from 'react';

const GuestServicesPage = () => {
  const [guestServices, setGuestServices] = useState([]);
  const [newGuestService, setNewGuestService] = useState({
    bookingId: '',
    serviceId: '',
    quantity: ''
  });

  const fetchGuestServices = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/guestservice');
      const data = await response.json();
      setGuestServices(data);
    } catch (error) {
      console.error('Error fetching guest services:', error);
    }
  };

  const handleAddGuestService = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/guestservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuestService),
      });

      if (response.ok) {
        setNewGuestService({
          bookingId: '',
          serviceId: '',
          quantity: ''
        });
        fetchGuestServices();
      } else {
        console.error('Failed to add guest service');
      }
    } catch (error) {
      console.error('Error adding guest service:', error);
    }
  };

  useEffect(() => {
    fetchGuestServices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Guest Services</h1>

      <div className="mb-4">
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Booking ID"
          value={newGuestService.bookingId}
          onChange={(e) => setNewGuestService({ ...newGuestService, bookingId: parseInt(e.target.value) })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Service ID"
          value={newGuestService.serviceId}
          onChange={(e) => setNewGuestService({ ...newGuestService, serviceId: parseInt(e.target.value) })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Quantity"
          value={newGuestService.quantity}
          onChange={(e) => setNewGuestService({ ...newGuestService, quantity: parseInt(e.target.value) })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddGuestService}>
          Add Guest Service
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Guest Service ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Booking ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Service ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {guestServices.map((gs) => (
            <tr key={gs.guestServiceId}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{gs.guestServiceId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{gs.bookingId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{gs.serviceId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{gs.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestServicesPage;