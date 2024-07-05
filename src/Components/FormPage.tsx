import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

const FirstPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setErrorMessage('All fields are required.');
      return;
    }
    const userDetails = { name, phone, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    
    // Check if the data is stored correctly
    const savedUserDetails = localStorage.getItem('userDetails');
    if (savedUserDetails === JSON.stringify(userDetails)) {
      setSuccessMessage('User details saved successfully!');
      setTimeout(() => {
        navigate('/second-page');
      }, 1000);  // Redirect after 1 second
    } else {
      setErrorMessage('Failed to save user details.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Please fill the form
      </Typography>
      <TextField
        label="Your Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label=" Your Phone Number..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Your Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default FirstPage;
