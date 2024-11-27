import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();  // Get employee ID from URL

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in first.');
        return;
      }

      await apiClient.put(`/emp/employees/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Employee updated successfully!');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee.');
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={employee.first_name}
          onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={employee.last_name}
          onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={employee.position}
          onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
          placeholder="Position"
          required
        />
        <input
          type="text"
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          placeholder="Department"
          required
        />
        <button type="submit">Save</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default UpdateEmployee;
