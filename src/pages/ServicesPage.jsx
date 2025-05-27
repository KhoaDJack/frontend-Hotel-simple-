import React, { useState, useEffect } from 'react';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    serviceName: '',
    price: '',
  });

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/servicess');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddService = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/servicess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        setNewService({ serviceName: '', price: '' });
        fetchServices();
      } else {
        console.error('Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Service Name"
          value={newService.serviceName}
          onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddService}>
          Add Service
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr className="bg-gray-100">
            <th style={{ border: '1px solid gray', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.serviceId}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{service.serviceId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{service.serviceName}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>${service.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesPage;