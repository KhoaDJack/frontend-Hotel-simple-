import React, { useState, useEffect } from 'react';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    bookingId: '',
    amount: '',
    paymentDate: '',
    paymentMethod: ''
  });

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/payment');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleAddPayment = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment),
      });

      if (response.ok) {
        setNewPayment({
          bookingId: '',
          amount: '',
          paymentDate: '',
          paymentMethod: ''
        });
        fetchPayments();
      } else {
        console.error('Failed to add payment');
      }
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      <div className="mb-4">
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Booking ID"
          value={newPayment.bookingId}
          onChange={(e) => setNewPayment({ ...newPayment, bookingId: parseInt(e.target.value) })}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Amount"
          value={newPayment.amount}
          onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
        />
        <input
          type="datetime-local"
          className="border p-2 mr-2"
          placeholder="Payment Date"
          value={newPayment.paymentDate}
          onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Payment Method"
          value={newPayment.paymentMethod}
          onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddPayment}>
          Add Payment
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Payment ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Booking ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Payment Date</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{payment.paymentId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{payment.bookingId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>${payment.amount.toFixed(2)}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{new Date(payment.paymentDate).toLocaleString()}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{payment.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;