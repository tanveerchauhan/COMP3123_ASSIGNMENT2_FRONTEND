import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; // Ensure axios config is imported
import { TextField, Button, Typography, Paper, Alert, Grid } from '@mui/material';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const employeeData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        department: department,
        salary: salary,
        date_of_joining: dateOfJoining,
      };

      const response = await apiClient.post('/emp/employees', employeeData);
      console.log('Employee added response:', response);
      setSuccess('Employee added successfully!');
      setTimeout(() => {
        navigate('/employees'); // Redirect to employee list after success
      }, 2000);
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add employee. Please try again.');
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: 600,
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Employee
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Position"
          variant="outlined"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <TextField
          label="Department"
          variant="outlined"
          fullWidth
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <TextField
          label="Date of Joining"
          variant="outlined"
          fullWidth
          type="date"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Save
        </Button>
      </form>
      {error && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          {success}
        </Alert>
      )}
    </Paper>
  );
};

export default AddEmployee;
