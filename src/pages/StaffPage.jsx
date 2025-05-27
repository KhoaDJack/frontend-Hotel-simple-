import React, { useState, useEffect } from 'react';

const StaffPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    role: '',
    hireDate: '',
    avatar: ''
  });

  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/staff');
      const data = await response.json();
      setStaffList(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleAddStaff = async () => {
    try {
      const response = await fetch('http://localhost:5290/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStaff),
      });

      if (response.ok) {
        setNewStaff({
          firstName: '',
          lastName: '',
          role: '',
          hireDate: '',
          avatar: ''
        });
        fetchStaff();
      } else {
        console.error('Failed to add staff');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Staff</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="First Name"
          value={newStaff.firstName}
          onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Last Name"
          value={newStaff.lastName}
          onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Role"
          value={newStaff.role}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 mr-2"
          placeholder="Hire Date"
          value={newStaff.hireDate}
          onChange={(e) => setNewStaff({ ...newStaff, hireDate: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Avatar URL"
          value={newStaff.avatar}
          onChange={(e) => setNewStaff({ ...newStaff, avatar: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddStaff}>
          Add Staff
        </button>
      </div>

      <table style={{ borderCollapse: 'collapse', border: '1px solid gray', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Staff ID</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Role</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Hire Date</th>
            <th style={{ border: '1px solid gray', padding: '8px' }}>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.staffId}>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{staff.staffId}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{staff.firstName}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{staff.lastName}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{staff.role}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{new Date(staff.hireDate).toLocaleDateString()}</td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>
                <img src={staff.avatar} alt="Staff" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPage;