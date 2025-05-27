import React, { useState } from 'react';

export default function IconMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {open ? '🔽 Close Menu' : '▶️ Open Menu'}
      </button>

      {open && (
        <ul>
          <li>📅 Bookings</li>
          <li>🛏️ Rooms</li>
          <li>👤 Guests</li>
          <li>🛎️ Guest Services</li>
          <li>💰 Payments</li>
          <li>🔧 Services</li>
          <li>👔 Staff</li>
        </ul>
      )}
    </div>
  );
}