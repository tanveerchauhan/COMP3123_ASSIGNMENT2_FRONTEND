import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
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

  return (
    <div>
      <h2>View Employee Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {employee ? (
        <div>
          <p>First Name: {employee.first_name}</p>
          <p>Last Name: {employee.last_name}</p>
          <p>Email: {employee.email}</p>
          <p>Position: {employee.position}</p>
          <p>Department: {employee.department}</p>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default ViewEmployee;
