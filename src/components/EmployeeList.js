import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from '@mui/material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({ department: '', position: '' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await apiClient.get('/emp/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(response.data);
        setAllEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees.');
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = () => {
    const { department, position } = searchCriteria;

    if (!department && !position) {
      setEmployees(allEmployees);
      return;
    }

    const filteredEmployees = allEmployees.filter((employee) => {
      const matchesDepartment = department
        ? employee.department?.toLowerCase().includes(department.toLowerCase())
        : true;
      const matchesPosition = position
        ? employee.position?.toLowerCase().includes(position.toLowerCase())
        : true;
      return matchesDepartment && matchesPosition;
    });

    setEmployees(filteredEmployees);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear user session
    window.location.href = '/'; // Redirect to login page
  };

  const deleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first.');
        return;
      }

      // API call to delete the employee
      await apiClient.delete(`/emp/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      alert('Employee deleted successfully');
      // Update state to remove the deleted employee from the list
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Employee Management</h2>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Search by Department"
          variant="outlined"
          name="department"
          value={searchCriteria.department}
          onChange={handleInputChange}
        />
        <TextField
          label="Search by Position"
          variant="outlined"
          name="position"
          value={searchCriteria.position}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setEmployees(allEmployees)}>
          Clear Search
        </Button>
      </div>

      <Button
        variant="contained"
        color="success"
        onClick={() => (window.location.href = '/add-employee')}
        style={{ marginBottom: '20px' }}
      >
        Add Employee
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => (window.location.href = `/view-employee/${employee._id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => (window.location.href = `/update-employee/${employee._id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employees;
